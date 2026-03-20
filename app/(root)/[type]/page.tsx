import Sort from "@/components/Sort";
import { getFiles } from "@/lib/actions/file.actions";
import Card from "@/components/Card";
import { formatStorageDisplay, getFileTypesParams } from "@/lib/utils";

interface PageProps {
  params: Promise<{ type?: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const Page = async ({ searchParams, params }: PageProps) => {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const type = (resolvedParams?.type as string) || "";
  const searchText = (resolvedSearchParams?.query as string) || "";
  const sort = (resolvedSearchParams?.sort as string) || "";

  const types = getFileTypesParams(type) as FileType[];
  const files = await getFiles({ types, searchText, sort });
  const routeUsageBytes =
    files?.documents?.reduce(
      (total: number, file: FileDocument) => total + Number(file.size ?? 0),
      0,
    ) ?? 0;

  return (
    <div className="page-container">
      <section className="w-full">
        <h1 className="h1 capitalize">{type}</h1>

        <div className="total-size-section">
          <p className="body-1">
            Total: <span className="h5">{formatStorageDisplay(routeUsageBytes)}</span>
          </p>

          <div className="sort-container">
            <p className="body-1 hidden text-light-200 sm:block">Sort by:</p>

            <Sort />
          </div>
        </div>
      </section>

      {files?.total > 0 ? (
        <section className="file-list">
          {files.documents.map((file: FileDocument) => (
            <Card key={file.$id} file={file} />
          ))}
        </section>
      ) : (
        <p className="empty-list">No files uploaded</p>
      )}
    </div>
  );
};

export default Page;
