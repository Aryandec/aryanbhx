import Link from "next/link"

/**
 * @param {{ articles: { id: string, title: string, date: string }[] }} props
 */
const ArticleItemList = ({ articles }) => {
  return (
    <div className="flex flex-col gap-2.5 font-poppins text-lg">
      {articles.map((article, id) => (
        <Link
          href={`/${article.id}`}
          key={id}
          className="text-neutral-900 hover:text-amber-700 transition duration-150"
        >
          {article.title}
        </Link>
      ))}
    </div>
  )
}

export default ArticleItemList
