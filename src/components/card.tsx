import Link from "next/link";
import Image from "next/image";
import { PostMeta } from "models/Post";
import { GetExternalImageInfo } from "utils/image";
import ArrowIcon from "components/icon/arrow";

export default async function PostCard({
  data,
  size,
  isTitleH1 = true,
}: {
  data: PostMeta;
  size: "large" | "small";
  isTitleH1: boolean;
}) {
  const image = await GetExternalImageInfo(data.coverImage, "eyeCatch");

  return (
    <article className="group hover:bg-gray-200 rounded-xl p-5 transition-all">
      <Link href={"post/" + data.slug}>
        <Image
          className="w-full object-cover rounded-xl aspect-video"
          src={image}
          alt={data.title}
          sizes={
            size == "large"
              ? "(max-width: 1024px) 100vw, 460px"
              : "(max-width: 1024px) 100vw, 286px"
          }
          priority={size == "large"}
        />
      </Link>

      {data.category ? (
        isTitleH1 ? (
          <h2 className="mt-4 text-xs uppercase text-gray-600">
            <Link href={"/category/" + data.category.toLowerCase() + "/1"}>
              {data.category}
            </Link>
          </h2>
        ) : (
          <h3 className="mt-4 text-xs uppercase text-gray-600">
            <Link href={"/category/" + data.category.toLowerCase() + "/1"}>
              {data.category}
            </Link>
          </h3>
        )
      ) : (
        <></>
      )}

      {isTitleH1 ? (
        <h1 className="mt-4 text-lg text-gray-800 break-words">
          <Link href={"post/" + data.slug} className="">
            {data.title}
          </Link>
        </h1>
      ) : (
        <h2 className="mt-4 text-lg text-gray-800 break-words">
          <Link href={"post/" + data.slug} className="">
            {data.title}
          </Link>
        </h2>
      )}

      <p className="mt-3 text-sm font-semibold text-gray-800">
        <Link
          href={"post/" + data.slug}
          className="inline-flex items-center gap-x-2"
        >
          Read more
          <ArrowIcon />
        </Link>
      </p>
    </article>
  );
}
