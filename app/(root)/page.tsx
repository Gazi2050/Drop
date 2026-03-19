import Image from "next/image";
import Link from "next/link";

import ActionDropdown from "@/components/ActionDropdown";
import { Chart } from "@/components/Chart";
import { FormattedDateTime } from "@/components/FormattedDateTime";
import { Thumbnail } from "@/components/Thumbnail";
import { Separator } from "@/components/ui/separator";
import { getFiles, getTotalSpaceUsed } from "@/lib/actions/file.actions";
import { convertFileSize, getFileOpenUrl, getUsageSummary } from "@/lib/utils";

const Dashboard = async () => {
  const [files, totalSpace] = await Promise.all([
    getFiles({ types: [], limit: 10 }),
    getTotalSpaceUsed(),
  ]);

  const usageSummary = getUsageSummary(totalSpace ?? { document: { size: 0, latestDate: "" }, image: { size: 0, latestDate: "" }, video: { size: 0, latestDate: "" }, audio: { size: 0, latestDate: "" }, other: { size: 0, latestDate: "" }, used: 0, all: 0 });

  return (
    <div className="dashboard-container">
      <section className="flex min-h-0 flex-col gap-3 overflow-hidden">
        <Chart totalSpace={totalSpace ?? null} />

        <ul className="dashboard-summary-list min-h-0 flex-1">
          {usageSummary.map((summary) => (
            <Link
              href={summary.url}
              key={summary.title}
              className="dashboard-summary-card"
            >
              <div className="space-y-2">
                <div className="flex justify-between gap-2">
                  <Image
                    src={summary.icon}
                    width={140}
                    height={70}
                    alt={summary.title}
                    className="summary-type-icon"
                  />
                  <h4 className="summary-type-size">
                    {convertFileSize(summary.size) || 0}
                  </h4>
                </div>

                <h5 className="summary-type-title">{summary.title}</h5>
                <Separator className="bg-light-400" />
                <FormattedDateTime
                  date={summary.latestDate}
                  className="text-center text-[14px] xl:text-[16px]"
                />
              </div>
            </Link>
          ))}
        </ul>
      </section>

      <section className="dashboard-recent-files">
        <h2 className="h4 shrink-0 xl:h3 text-light-100">Recent files uploaded</h2>
        {files?.documents?.length > 0 ? (
          <ul className="mt-3 flex flex-col gap-3 xl:mt-4 xl:gap-4">
            {files.documents.map((file: FileDocument) => (
              <Link
                href={getFileOpenUrl(file.bucketFileId, file.type, file.extension, file.name)}
                target="_blank"
                className="flex items-center gap-3"
                key={file.$id}
              >
                <Thumbnail
                  type={file.type}
                  extension={file.extension}
                  url={file.url}
                />

                <div className="recent-file-details">
                  <div className="flex flex-col gap-1">
                    <p className="recent-file-name">{file.name}</p>
                    <FormattedDateTime
                      date={file.$createdAt}
                      className="caption"
                    />
                  </div>
                  <ActionDropdown file={file} />
                </div>
              </Link>
            ))}
          </ul>
        ) : (
          <p className="empty-list">No files uploaded</p>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
