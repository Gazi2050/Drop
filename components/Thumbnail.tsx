import Image from "next/image";
import { cn, getFileIcon } from "@/lib/utils";

interface Props {
  type: string;
  extension: string;
  url?: string;
  imageClassName?: string;
  className?: string;
}

export const Thumbnail = ({
  type,
  extension,
  url: _url = "",
  imageClassName,
  className,
}: Props) => {
  const isImage = type === "image" && extension !== "svg";
  const imageSrc = isImage ? "/assets/images/photo.png" : getFileIcon(extension, type);

  return (
    <figure
      className={cn(
        "flex size-[50px] min-w-[50px] items-center justify-center overflow-hidden rounded-full bg-brand/10",
        className,
      )}
    >
      <Image
        src={imageSrc}
        alt="thumbnail"
        width={100}
        height={100}
        className={cn(
          "size-8 object-contain",
          imageClassName,
        )}
      />
    </figure>
  );
};
export default Thumbnail;
