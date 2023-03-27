import { Box, Typography, useMediaQuery } from '@mui/material'
import { GetStaticProps, GetStaticPropsContext, NextPage } from 'next'
import React, { ReactElement, useEffect, useState } from 'react'
import Image from 'next/image'
import styles from '../styles/games.module.scss'
import Layout from '@/components/Layout'
import { NextPageWithLayout } from './_app'
import Head from 'next/head'
import HotGameCard from '@/components/HotGameCard'
import { Pagination } from 'antd';
import { useRequest } from 'ahooks'
import { getHotGameList } from 'services/home'

const pageSize = 12

// 游戏集合页
const Games: NextPageWithLayout = () => {
  const isMobileSize = useMediaQuery("(max-width: 600px)")

  const [gameList, setGameList] = useState<Record<string, any>[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(1)

  useEffect(() => {
    queryHotgameList({ limit: pageSize, offset: pageSize * (currentPage - 1) })
  }, [currentPage])

  // TODO: 请求数据逻辑
  const { run: queryHotgameList } = useRequest(getHotGameList, {
    manual: true,
    onSuccess: ({ data }) => {
      if (data) {
        const { games, total_count } = data
        console.log(data)
        setGameList(games)
        setTotalCount(total_count)
      }
    }
  })

  // TODO: 移动端自动加载数据逻辑

  return <Box className={styles.games}>
    <Head>
      <title>Games | FirstPlay</title>
      <meta name="description" content="A blockchain game platform where you discover new games and try game NFTs for free" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Box className={styles.gamesBox}>
      <Typography variant='h2'>Hot Games {!isMobileSize && `> ALL`}</Typography>
      <Box className={styles.gameList}>
        {
          gameList?.map((item, index) =>
            <HotGameCard gameInfo={item} key={index} />)
        }
      </Box>
      <Pagination
        className={styles.paginationBox}
        total={totalCount}
        current={currentPage}
        onChange={(page) => setCurrentPage(page)} />
    </Box>
  </Box>
}

Games.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Games


export const getStaticProps: GetStaticProps = async ({ locale }: GetStaticPropsContext) => {
  return {
    props: {
      // 获取国际化文案
      messages: (await import(`../i18n/${locale}.json`)).default
    }
  }
}