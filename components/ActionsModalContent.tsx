import Thumbnail from "@/components/Thumbnail";
import FormattedDateTime from "@/components/FormattedDateTime";
import { convertFileSize, formatDateTime } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const ImageThumbnail = ({ file }: { file: FileDocument }) => (
  <div className="mb-1 flex items-center gap-3 rounded-xl border border-light-200/40 bg-light-400/50 p-3">
    <Thumbnail type={file.type} extension={file.extension} url={file.url} />
    <div className="flex flex-col">
      <p className="text-[14px] leading-[20px] font-semibold mb-1">
        {file.name}
      </p>
      <FormattedDateTime
        date={file.$createdAt}
        className="text-[12px] leading-[16px] font-normal"
      />
    </div>
  </div>
);

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex">
    <p className="w-[30%] text-[14px] font-normal leading-[20px] text-light-100 text-left">
      {label}
    </p>
    <p className="flex-1 text-[14px] font-semibold leading-[20px] text-left">
      {value}
    </p>
  </div>
);

export const FileDetails = ({ file }: { file: FileDocument }) => {
  const owner = file.owner as { fullName?: string } | string;
  const ownerName = typeof owner === "object" && owner?.fullName ? owner.fullName : "—";

  return (
    <>
      <ImageThumbnail file={file} />
      <div className="space-y-4 px-2 pt-2">
        <DetailRow label="Format:" value={file.extension} />
        <DetailRow label="Size:" value={convertFileSize(file.size)} />
        <DetailRow label="Owner:" value={ownerName} />
        <DetailRow label="Last edit:" value={formatDateTime(file.$updatedAt)} />
      </div>
    </>
  );
};

interface Props {
  file: FileDocument;
  onInputChange: React.Dispatch<React.SetStateAction<string[]>>;
  onRemove: (email: string) => void;
}

export const ShareInput = ({ file, onInputChange, onRemove }: Props) => {
  const users = (file.users ?? []) as string[];

  return (
    <>
      <ImageThumbnail file={file} />

      <div className="share-wrapper">
        <p className="text-[14px] leading-[20px] font-semibold pl-1 text-light-100">
          Share file with other users
        </p>
        <Input
          type="email"
          placeholder="Enter email address"
          onChange={(e) => onInputChange(e.target.value.trim().split(","))}
          className="h-[52px] w-full rounded-full border px-4 text-[14px] font-normal leading-[20px] shadow-[var(--shadow-drop-1)] outline-none focus:ring-0"
        />
        <div className="pt-4">
          <div className="flex justify-between">
            <p className="text-[14px] leading-[20px] font-semibold text-light-100">
              Shared with
            </p>
            <p className="text-[14px] leading-[20px] font-semibold text-light-200">
              {users.length} users
            </p>
          </div>

          <ul className="pt-2">
            {users.map((email: string) => (
              <li
                key={email}
                className="flex items-center justify-between gap-2"
              >
                <p className="text-[14px] leading-[20px] font-semibold">
                  {email}
                </p>
                <Button
                  onClick={() => onRemove(email)}
                  className="rounded-full bg-transparent text-light-100 shadow-none hover:bg-transparent"
                >
                  <Image
                    src="/assets/icons/remove.svg"
                    alt="Remove"
                    width={24}
                    height={24}
                    className="aspect-square rounded-full"
                  />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
