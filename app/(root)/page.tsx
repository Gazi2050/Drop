import Link from "next/link";

import ActionDropdown from "@/components/ActionDropdown";
import { Chart, StorageUsageChart } from "@/components/Chart";
import { FormattedDateTime } from "@/components/FormattedDateTime";
import { Thumbnail } from "@/components/Thumbnail";
import { getFiles, getTotalSpaceUsed } from "@/lib/actions/file.actions";
import { BYTES_PER_GB, formatStorageDisplay, getFileOpenUrl } from "@/lib/utils";

const Dashboard = async () => {
  const [files, totalSpace] = await Promise.all([
    getFiles({ types: [], limit: 10 }),
    getTotalSpaceUsed(),
  ]);

  const used = Number(totalSpace?.used ?? 0);
  const all = Number(totalSpace?.all ?? 2 * BYTES_PER_GB);

  return (
    <div className="dashboard-container">
      <section className="remove-scrollbar flex min-h-0 flex-1 flex-col gap-4 overflow-x-hidden overflow-y-auto md:gap-5">
        
        <div className="flex min-h-0 flex-[0.06] shrink-0 flex-col items-center justify-center rounded-[16px] bg-white px-4 py-3 text-center shadow-[var(--shadow-drop-1)]">
          <p className="text-[10px] font-normal leading-[14px] text-light-200 xl:text-[11px]">
            Storage summary
          </p>
          <p className="mt-0.5 text-[12px] font-semibold leading-[18px] text-light-100 xl:text-[14px]">
            {formatStorageDisplay(used)} / {formatStorageDisplay(all)} total
          </p>
        </div>
        <div className="flex min-h-0 flex-[0.47] flex-col overflow-hidden">
          <Chart totalSpace={totalSpace ?? null} />
        </div>
        <div className="flex min-h-0 flex-[0.47] flex-col overflow-hidden">
          <StorageUsageChart totalSpace={totalSpace ?? null} />
        </div>
      </section>

      <section className="dashboard-recent-files">
        <h2 className="h4 shrink-0 xl:h3 text-light-100">
          Recent files uploaded
        </h2>
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
