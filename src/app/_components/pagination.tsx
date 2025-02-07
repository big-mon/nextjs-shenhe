import Link from "next/link";
import ArrowIcon from "@components/icon/arrow";

export default function Pagination({
  type,
  currentPage,
  totalPage,
  prefix,
}: {
  type: "all" | "category" | "tag";
  currentPage: number;
  totalPage: number;
  prefix: string;
}) {
  const hasPrev = currentPage > 1;
  const hasNext = totalPage > currentPage;

  let path = "/";
  if (type == "category") {
    path = "/category/" + prefix + "/";
  } else if (type == "tag") {
    path = "/tag/" + prefix + "/";
  }

  return (
    <div className="flex justify-center mx-auto mt-6">
      {hasPrev && (
        <Link
          href={path + (Number(currentPage) - 1)}
          className="inline-flex items-center px-4 py-2 mr-3 text-sm font-medium border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700"
        >
          <span className="-scale-x-100 mr-2">
            <ArrowIcon />
          </span>
          Previous
        </Link>
      )}

      {hasNext && (
        <Link
          href={path + (Number(currentPage) + 1)}
          className="inline-flex items-center px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700"
        >
          Next
          <span className="ml-2">
            <ArrowIcon />
          </span>
        </Link>
      )}
    </div>
  );
}
