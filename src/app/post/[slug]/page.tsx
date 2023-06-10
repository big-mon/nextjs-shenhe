import { getPost, getAllPostSlugs } from "services/accessToPost";
import { parseISO, format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import ArticleBody from "components/post/articleBody";
import { GetExternalImageInfo } from "utils/image";
import Logo from "components/icon/logo";
import ArrowIcon from "components/icon/arrow";
export const dynamicParams = false;

export default async function Page({ params }: { params: { slug: string } }) {
  const postData = await getPost(params.slug);
  const image = await GetExternalImageInfo(postData.meta.coverImage, "hero");

  return (
    <>
      <article className="container mx-auto max-w-5xl my-2">
        <header className="mx-auto max-w-2xl px-5 md:px-0">
          {postData.meta.category && (
            // category exists
            <p className="text-sm text-gray-500 md:flex">
              <Link
                href={
                  "/category/" + postData.meta.category.toLowerCase() + "/1"
                }
                className="hover:text-teal-500"
              >
                {postData.meta.category}
              </Link>
            </p>
          )}

          <p className="text-xs text-gray-500 mt-2">
            <time dateTime={postData.meta.date}>
              {format(parseISO(postData.meta.date), "yyyy 年 M 月 d 日")}
            </time>
          </p>

          <h1 className="text-2xl mt-6 mb-4 md:mb-6 font-semibold break-keep break-words">
            {postData.meta.title}
          </h1>

          {postData.meta.tags.length > 0 && (
            // tag exists
            <p className="text-xs text-gray-500 text-right md:text-left mt-4 md:mt-6">
              {postData.meta.tags.map((tag) => (
                <>
                  <Link
                    href={"/tag/" + tag.toLowerCase() + "/1"}
                    className="ml-4 md:ml-0 md:mr-4 hover:text-teal-500"
                  >
                    #{tag}
                  </Link>
                </>
              ))}
            </p>
          )}
        </header>

        <Image
          className="mt-3 md:mt-4 object-cover lg:rounded-xl"
          src={image}
          alt={postData.meta.title}
          sizes="(max-width: 1024px) 100vw, 1024px"
        />

        <div className="mx-auto max-w-2xl mt-14 px-5 md:px-0 leading-relaxed tracking-wider">
          <ArticleBody content={postData.content} />
        </div>
      </article>

      <aside className="bg-gray-100 mt-14">
        <div className="container mx-auto max-w-5xl mt-6 px-5 py-5 md:py-6 text-center">
          <Link href="/" className="group text-sm">
            <Logo size={24} />
            <p className="inline-flex items-center content-center pt-2 text-base group-hover:text-teal-500">
              <span className="-scale-x-100 mr-2">
                <ArrowIcon />
              </span>
              <span>記事一覧へ戻る</span>
            </p>
          </Link>
        </div>
      </aside>
    </>
  );
}

export async function generateStaticParams() {
  return getAllPostSlugs();
}
