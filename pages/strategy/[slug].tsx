import ArticleLayout from '@/components/ArticleLayout'
import { Box } from '@mui/material'
import { SUPPORT_LANGUAGE } from 'constants/index'
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import { NextPageWithLayout } from 'pages/_app'
import React, { ReactElement } from 'react'
import { getAllPosts, getPostBySlug, markdownToHtml } from 'util/markdown'

const StrategyArticle: NextPageWithLayout<{ content: string, post: Record<string, any> }> = (props) => {
  const { content, post } = props

  return <Box>
    <div
      dangerouslySetInnerHTML={{ __html: content }}
    />
  </Box>
}

StrategyArticle.getLayout = function getLayout(page: ReactElement) {
  return <ArticleLayout>{page}</ArticleLayout>
}


export default StrategyArticle

export const getStaticProps = async ({ locale, params }: GetStaticPropsContext<{ slug: string }>) => {
  const post = getPostBySlug(params?.slug || '', [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'ogImage',
    'coverImage',
  ])
  const content = await markdownToHtml(post.content || '')

  return {
    props: {
      // 获取国际化文案
      messages: (await import(`../../i18n/${locale}.json`)).default,

      post,
      content
    }
  }
}


export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts(['slug'])

  let allArticlePath: { params: any, locale: any }[] = []

  SUPPORT_LANGUAGE.forEach((language) =>
    posts.forEach(item => {
      allArticlePath.push({
        params: { slug: item.slug },
        locale: language
      })
    })
  )
  
  return {
    paths: allArticlePath,
    fallback: false,
  }
}