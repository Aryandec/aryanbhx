import React from 'react'
import ArticleItemList from '@/components/articleitems'
import { getSortedArticles } from "@/lib/article"

const myBlog = () => {
     const articles = getSortedArticles()

  return (
    <section className="mx-auto w-11/12 md:w-1/2 mt-20 flex flex-col gap-16 mb-20 ">
        <header className="text-neutra;-900 text-5xl text-center">
            <h1 className="font-semibold">My Blog</h1>
        </header>
         <section className="md:grid md:grid-cols-2 min-h-screen flex flex-col justify-center px-4">
             {Array.isArray(articles) && articles.length > 0 ? (
        <ArticleItemList articles={articles} />
      ) : (
        <p className="text-center text-gray-500">No articles found.</p>
      )}
      </section>
    </section>
  )
}

export default myBlog