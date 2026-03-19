import Link from "next/link";

import ActionDropdown from "@/components/ActionDropdown";
import Card from "@/components/Card";
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
    <div className="dashboard-container md:grid-cols-1 lg:grid-cols-2">
      <section className="remove-scrollbar hidden lg:grid lg:min-h-0 lg:flex-1 lg:grid-rows-[auto_minmax(200px,1fr)_minmax(200px,1fr)] lg:gap-5">
        <div className="flex min-h-0 shrink-0 flex-col items-center justify-center rounded-[16px] bg-white px-4 py-3 text-center shadow-[var(--shadow-drop-1)]">
          <p className="text-[10px] font-normal leading-[14px] text-light-200 xl:text-[11px]">
            Storage summary
          </p>
          <p className="mt-0.5 text-[12px] font-semibold leading-[18px] text-light-100 xl:text-[14px]">
            {formatStorageDisplay(used)} / {formatStorageDisplay(all)} total
          </p>
        </div>
        <div className="flex min-h-0 flex-col overflow-hidden">
          <Chart totalSpace={totalSpace ?? null} />
        </div>
        <div className="flex min-h-0 flex-col overflow-hidden">
          <StorageUsageChart totalSpace={totalSpace ?? null} />
        </div>
      </section>

      <section className="dashboard-recent-files gap-4 md:gap-5 lg:gap-0">
        <div className="flex flex-col items-center justify-center rounded-[16px] bg-white px-4 py-3 text-center shadow-[var(--shadow-drop-1)] lg:hidden">
          <p className="text-[10px] font-normal leading-[14px] text-light-200 xl:text-[11px]">
            Storage summary
          </p>
          <p className="mt-0.5 text-[12px] font-semibold leading-[18px] text-light-100 xl:text-[14px]">
            {formatStorageDisplay(used)} / {formatStorageDisplay(all)} total
          </p>
        </div>

        <h2 className="h4 shrink-0 text-light-100 xl:h3">
          Recent files uploaded
        </h2>
        {files?.documents?.length > 0 ? (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:hidden">
              {files.documents.map((file: FileDocument) => (
                <Card key={file.$id} file={file} />
              ))}
            </div>

            <ul className="mt-3 hidden flex-col gap-3 xl:mt-4 xl:gap-4 lg:flex">
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
          </>
        ) : (
          <p className="empty-list">No files uploaded</p>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
