import LayoutWithoutFooter from '@/components/LayoutWithoutFooter'
import GameInfo from '@/components/GameInfo'
import { Box, Divider } from '@mui/material'
import { SUPPORT_LANGUAGE } from 'constants/index'
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import Image from 'next/image'
import { NextPageWithLayout } from 'pages/_app'
import React, { ReactElement } from 'react'
import { getGameInfo } from 'services/home'
import { getAllPosts, getPostBySlug, markdownToHtml } from 'util/markdown'
import styles from '../../styles/strategy.module.scss'
import Head from 'next/head'
import { queryCarnivalGamesInfo } from 'services/carnival'

const StrategyArticle: NextPageWithLayout<{ content: string, post: Record<string, any>, gameInfo: Record<string, any> }> = (props) => {
  const { content, post, gameInfo } = props

  const imageKitLoader = ({ src, width, quality = 100 }: any) => {
    const params = [`w-${width}`];
    if (quality) {
      params.push(`q-${quality}`);
    }
    const paramsString = params.join(",");
    var urlEndpoint = "https://ik.imagekit.io/jnznr24q9";
    const imagePaths = src.split('/')
    const imageHash = imagePaths[imagePaths.length - 1]
    return `${urlEndpoint}/${imageHash}?tr=${paramsString}`
  }

  return <Box>
    <Head>
      <title>Strategy | FirstPlay {gameInfo?.name && `| ${gameInfo?.name}`}</title>
      <meta name="description" content="A blockchain game platform where you discover new games and try game NFTs for free" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    {
      gameInfo && <>
        <Box className={styles.topCover}>
          <Image
            priority
            loader={({ src }) => src}
            src={gameInfo?.background || post.coverImage}
            layout='fill'
            objectFit='cover' />
        </Box>
        <Box className={styles.gameInfoBox}>
          <GameInfo gameInfo={gameInfo} />
        </Box>
      </>
    }

    <Divider />
    <Box className={styles.contentBox}>
      <div dangerouslySetInnerHTML={{ __html: content }} />
      {post?.comment && <div dangerouslySetInnerHTML={{ __html: post.comment }} />}
      <br/>
      <br/>
      <br/>
    </Box>
  </Box>
}

StrategyArticle.getLayout = function getLayout(page: ReactElement) {
  return <LayoutWithoutFooter>{page}</LayoutWithoutFooter>
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
    'comment',
    "gameId"
  ])
  const content = await markdownToHtml(post.content || '')
  let game
  if (post.gameId) {
    // game = await getGameInfo({ game_id: post.gameId })
    game = await queryCarnivalGamesInfo({ game_id: post.gameId, address: '0x00' })
  }

  return {
    props: {
      // 获取国际化文案
      messages: (await import(`../../i18n/${locale}.json`)).default,

      post,
      content,

      gameInfo: game?.data || null
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts(['slug'])

  let allArticlePath: { params: any }[] = []

  // SUPPORT_LANGUAGE.forEach((language) =>
  posts.forEach(item => {
    allArticlePath.push({
      params: { slug: item.slug },
      // locale: language
    })
  })
  // )

  return {
    paths: allArticlePath,
    fallback: false,
  }
}