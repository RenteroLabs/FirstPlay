import ArticleLayout from '@/components/ArticleLayout'
import GameInfo from '@/components/GameInfo'
import { Box, Divider } from '@mui/material'
import { SUPPORT_LANGUAGE } from 'constants/index'
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import Image from 'next/image'
import { NextPageWithLayout } from 'pages/_app'
import React, { ReactElement } from 'react'
import { getAllPosts, getPostBySlug, markdownToHtml } from 'util/markdown'
import styles from '../../styles/strategy.module.scss'

const StrategyArticle: NextPageWithLayout<{ content: string, post: Record<string, any> }> = (props) => {

  const { content, post } = props

  const CommentComponet = '<iframe src="https://embed.0xecho.com.ipns.page?color-theme=light&desc=&has-h-padding=false&has-v-padding=true&modules=comment%2Clike%2Ctip&receiver=empty.bit&target_uri=https%3A%2F%2Ftest.firstplay.app" frameborder="0"></iframe>'

  return <Box>
    <Box className={styles.topCover}>
      <Image src="https://tva1.sinaimg.cn/large/e6c9d24egy1h3xhds6ikrj20zo0ibtcv.jpg" layout='fill' objectFit='cover' />
    </Box>
    <GameInfo />
    <Divider />
    <Box className={styles.contentBox}>
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <div dangerouslySetInnerHTML={{ __html: CommentComponet }} />
    </Box>
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