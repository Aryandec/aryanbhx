import Link from "next/link"
import { LuArrowLeft } from "react-icons/lu"; 
import { getArticleData } from "@/lib/article"

const Article = async ({ params }) => {
  const articleData = await getArticleData(params.slug)

  return (
    <section className="mx-auto w-10/12 md:w-1/2 mt-20 flex flex-col gap-5 mb-110">
      <div className="flex justify-between font-poppins">
        <Link href="/blog" className="flex flex-row gap-1 place-items-center">
          <LuArrowLeft width={20} />
          <p>Blog List</p>
        </Link>
        <p>{articleData.date.toString()}</p>
      </div>
      <article
        className="article"
        dangerouslySetInnerHTML={{ __html: articleData.contentHtml }}
      />
    </section>
  )
}

export default Article
