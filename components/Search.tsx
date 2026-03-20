"use client";

import { useEffect, useRef, useState } from "react";

import Image from "next/image";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getFiles } from "@/lib/actions/file.actions";
import Thumbnail from "@/components/Thumbnail";
import FormattedDateTime from "@/components/FormattedDateTime";
import { useDebounce } from "use-debounce";

const Search = () => {
  const [query, setQuery] = useState("");
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query") || "";
  const [results, setResults] = useState<FileDocument[]>([]);
  const [open, setOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const path = usePathname();
  const [debouncedQuery] = useDebounce(query, 300);

  useEffect(() => {
    const fetchFiles = async () => {
      if (debouncedQuery.length === 0) {
        setResults([]);
        setOpen(false);
        return router.push(path);
      }

      const files = await getFiles({ types: [], searchText: debouncedQuery });
      setResults(files.documents);
      setOpen(true);
    };

    fetchFiles();
  }, [debouncedQuery, path, router]);

  useEffect(() => {
    if (!searchQuery) {
      setQuery("");
    }
  }, [searchQuery]);

  useEffect(() => {
    const onDocumentMouseDown = (event: MouseEvent) => {
      if (!searchRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const onDocumentKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", onDocumentMouseDown);
    document.addEventListener("keydown", onDocumentKeyDown);

    return () => {
      document.removeEventListener("mousedown", onDocumentMouseDown);
      document.removeEventListener("keydown", onDocumentKeyDown);
    };
  }, []);

  const handleClickItem = (file: FileDocument) => {
    setOpen(false);
    setResults([]);

    router.push(
      `/${file.type === "video" ? "video" : file.type === "audio" ? "audio" : file.type + "s"}?query=${query}`,
    );
  };

  return (
    <div className="search" ref={searchRef}>
      <div className="search-input-wrapper">
        <Image
          src="/assets/icons/search.svg"
          alt="Search"
          width={24}
          height={24}
        />
        <Input
          value={query}
          placeholder="Search..."
          className="w-full border-none p-0 text-[14px] font-normal leading-[20px] shadow-none outline-none placeholder:text-light-200 focus:ring-0 focus:ring-transparent focus-visible:border-transparent focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
          onChange={(e) => setQuery(e.target.value)}
        />

        {open && (
          <ul className="search-result">
            {results.length > 0 ? (
              results.map((file) => (
                <li
                  className="flex items-center justify-between"
                  key={file.$id}
                  onClick={() => handleClickItem(file)}
                >
                  <div className="flex cursor-pointer items-center gap-4">
                    <Thumbnail
                      type={file.type}
                      extension={file.extension}
                      url={file.url}
                      className="size-9 min-w-9"
                    />
                    <p className="text-[14px] leading-[20px] font-semibold line-clamp-1 text-light-100">
                      {file.name}
                    </p>
                  </div>

                  <FormattedDateTime
                    date={file.$createdAt}
                    className="text-[12px] leading-[16px] font-normal line-clamp-1 text-light-200"
                  />
                </li>
              ))
            ) : (
              <p className="empty-result">
                No files found
              </p>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Search;
