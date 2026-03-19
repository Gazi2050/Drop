import Link from "next/link";
import Thumbnail from "@/components/Thumbnail";
import { convertFileSize, getFileOpenUrl } from "@/lib/utils";
import FormattedDateTime from "@/components/FormattedDateTime";
import ActionDropdown from "@/components/ActionDropdown";

const Card = ({ file }: { file: FileDocument }) => {
  const owner = file.owner as { fullName?: string } | string;
  const ownerName = typeof owner === "object" && owner?.fullName ? owner.fullName : "—";

  return (
    <Link
      href={getFileOpenUrl(file.bucketFileId, file.type, file.extension, file.name)}
      target="_blank"
      className="flex cursor-pointer flex-col gap-6 rounded-[18px] bg-white p-5 shadow-[var(--shadow-drop-1)] transition-all hover:shadow-[var(--shadow-drop-3)]"
    >
      <div className="flex justify-between">
        <Thumbnail
          type={file.type}
          extension={file.extension}
          url={file.url}
          className="!size-20"
          imageClassName="!size-11"
        />

        <div className="flex flex-col items-end justify-between">
          <ActionDropdown file={file} />
          <p className="text-[16px] leading-[24px] font-normal">
            {convertFileSize(file.size)}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2 text-light-100">
        <p className="text-[14px] leading-[20px] font-semibold line-clamp-1">
          {file.name}
        </p>
        <FormattedDateTime
          date={file.$createdAt}
          className="text-[14px] leading-[20px] font-normal text-light-100"
        />
        <p className="text-[12px] leading-[16px] font-normal line-clamp-1 text-light-200">
          By: {ownerName}
        </p>
      </div>
    </Link>
  );
};
export default Card;
