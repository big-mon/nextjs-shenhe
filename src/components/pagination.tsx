import Link from "next/link";
import ArrowIcon from "components/icon/arrow";

export default function Pagination({
  type,
  currentPage,
  text,
}: {
  type: "all" | "category" | "tag";
  currentPage: number;
  text: string;
}) {
  const hasPrev = true;
  const hasNext = true;

  let path = "/";
  if (type == "category") {
    path = "/category/" + text + "/";
  } else if (type == "tag") {
    path = "/tag/" + text + "/";
  }

  return (
    <div className="flex justify-center mx-auto">
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
