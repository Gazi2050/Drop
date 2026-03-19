import Link from "next/link";

import ActionDropdown from "@/components/ActionDropdown";
import { Chart } from "@/components/Chart";
import { FormattedDateTime } from "@/components/FormattedDateTime";
import { Thumbnail } from "@/components/Thumbnail";
import { getFiles, getTotalSpaceUsed } from "@/lib/actions/file.actions";
import { getCurrentUser } from "@/lib/actions/user.actions";
import { categoryIconsByName } from "@/constants";
import { convertFileSize, getFileOpenUrl, getUsageSummary } from "@/lib/utils";

const Dashboard = async () => {
  const [files, totalSpace, currentUser] = await Promise.all([
    getFiles({ types: [], limit: 10 }),
    getTotalSpaceUsed(),
    getCurrentUser(),
  ]);

  const ownerName =
    typeof currentUser?.fullName === "string" && currentUser.fullName.trim()
      ? currentUser.fullName.trim()
      : "—";

  const usageSummary = getUsageSummary(totalSpace ?? { document: { size: 0, latestDate: "" }, image: { size: 0, latestDate: "" }, video: { size: 0, latestDate: "" }, audio: { size: 0, latestDate: "" }, other: { size: 0, latestDate: "" }, used: 0, all: 0 });

  return (
    <div className="dashboard-container">
      <section className="remove-scrollbar flex min-h-0 flex-col gap-4 overflow-x-hidden overflow-y-auto md:gap-5">
        <Chart totalSpace={totalSpace ?? null} />

        <ul className="dashboard-summary-list min-h-0 flex-1">
          {usageSummary.map((summary) => {
            const CategoryIcon = categoryIconsByName[summary.title];
            return (
              <li key={summary.title} className="dashboard-summary-item">
                <Link
                  href={summary.url}
                  className="file-card dashboard-summary-card"
                >
                  <div className="summary-card-top">
                    <figure className="thumbnail dashboard-summary-thumb shrink-0">
                      {CategoryIcon ? (
                        <CategoryIcon
                          className="size-[52px] shrink-0 text-brand"
                          strokeWidth={1.75}
                          aria-hidden
                        />
                      ) : null}
                    </figure>

                    <div className="summary-card-size-col">
                      <span
                        className="inline-block size-[34px] shrink-0"
                        aria-hidden
                      />
                      <p className="body-1 text-right tabular-nums">
                        {convertFileSize(summary.size) || 0}
                      </p>
                    </div>
                  </div>

                  <div className="file-card-details summary-card-details">
                    <p className="subtitle-2 line-clamp-1">{summary.title}</p>
                    <FormattedDateTime
                      date={summary.latestDate}
                      className="body-2 text-light-100"
                    />
                    <p className="caption line-clamp-1 capitalize text-light-200">
                      By: {ownerName}
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
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
