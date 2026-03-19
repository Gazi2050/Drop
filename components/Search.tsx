"use client";

import { useEffect, useState } from "react";

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

  const handleClickItem = (file: FileDocument) => {
    setOpen(false);
    setResults([]);

    router.push(
      `/${file.type === "video" ? "video" : file.type === "audio" ? "audio" : file.type + "s"}?query=${query}`,
    );
  };

  return (
    <div className="relative w-full md:max-w-[480px] flex-1 min-w-0">
      <div className="flex h-[52px] flex-1 items-center gap-3 rounded-full px-4 shadow-[var(--shadow-drop-3)]">
        <Image
          src="/assets/icons/search.svg"
          alt="Search"
          width={24}
          height={24}
        />
        <Input
          value={query}
          placeholder="Search..."
          className="w-full border-none p-0 text-[14px] font-normal leading-[20px] shadow-none outline-none placeholder:text-light-200 focus:ring-0"
          onChange={(e) => setQuery(e.target.value)}
        />

        {open && (
          <ul className="absolute left-0 top-16 z-50 flex w-full flex-col gap-3 rounded-[20px] bg-white p-4 shadow-[var(--shadow-drop-3)]">
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
              <p className="text-center text-[14px] font-normal leading-[20px] text-light-100">
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
