import LayoutArticle from '@/components/LayoutArticle'
import { Box, useMediaQuery, Typography, IconButton } from '@mui/material'
import { Dropdown, MenuProps } from 'antd'
import { GetStaticPropsContext } from 'next'
import Head from 'next/head'
import { NextPageWithLayout } from 'pages/_app'
import { ReactElement, useEffect, useMemo, useRef, useState } from 'react'
import styles from '../../styles/strategy_article.module.scss'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import GameArticleItem from '@/components/PageGame/PageGameArticleItem'
import { useRouter } from 'next/router'
import { useRequest, useScroll } from 'ahooks'
import { getArticleCollectionById, getSingerStrategyArticle } from 'services/cms'
import ArticleStep from '@/components/PageArticle/ArticleStep'
import { useTranslations } from "next-intl";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { last, first } from 'lodash'
import Link from 'next/link'
import StickyBox from 'react-sticky-box';

import classNames from 'classnames/bind'
import SocialMediaShare from '@/components/SocialMediaShare'
import { useIsMounted } from 'hooks/useIsMounted'
import React from 'react'

const cx = classNames.bind(styles)

const ArticleDetailPage: NextPageWithLayout = (props) => {
  const isMobileSize = useMediaQuery("(max-width: 600px)")
  const isMounted = useIsMounted()

  const t = useTranslations('Article')

  const [articleId, setArticleId] = useState<string>()
  const [collectionId, setCollectionId] = useState<string>()

  const [articleContent, setArticleContent] = useState<Record<string, any>>()
  const [articleStepCount, setArticleStepCount] = useState<number>(0)

  const [collectionArticleList, setCollectionArticleList] = useState<Record<string, any>[]>([])
  const [collectionArticleCount, setCollectionArticleCount] = useState<number>(0)

  const [gameName, setGameName] = useState<string>('')

  const [activeStep, setActiveStep] = useState<number>(1)

  const [contentHeight, setContentHeight] = useState<boolean>(false)

  const ref = useRef(null)

  const scroll = useScroll()

  const router = useRouter()

  // console.log(collectionArticleList)
  useEffect(() => {
    // console.log(router.query)
    if (router.query?.articleId) {
      setArticleId(router.query?.articleId as string)
      queryArticleContent(router.query?.articleId as string, router.locale as string)

      setActiveStep(1)
    }
    if (router.query?.collectionId) {
      setCollectionId(router.query?.collectionId as string)
      queryCollectionList(router.query?.collectionId as string)
    }
  }, [router.query, router.locale])

  const { run: queryArticleContent } = useRequest(getSingerStrategyArticle, {
    onSuccess: ({ data }) => {
      console.log(data)

      // 此处逻辑需注意
      // 根据英文攻略文章 id 搜索内容，如果是其他语言，在 localizations 结构中获取内容
      let content
      if (router.locale === 'en-US') {
        content = data[0]?.attributes
      } else {
        content = data[0]?.attributes?.localizations?.data[0]?.attributes

        // 如果是其他语言，但其他语言尚未支持，仍然展示英文内容
        if (!content) {
          content = data[0]?.attributes
        }
      }

      if (content) {
        setArticleContent(content)
        setArticleStepCount(content?.StepList.length || 0)
      }
    }
  })

  const { run: queryCollectionList } = useRequest(getArticleCollectionById, {
    // defaultParams: [collectionId as string],
    // refreshDeps: [collectionId],
    // ready: Boolean(collectionId),
    onSuccess: ({ data }) => {
      console.log(data)
      const collectionInfo = data[0]?.attributes
      if (collectionInfo) {
        setCollectionArticleList(collectionInfo?.strategy_articles?.data)
        setCollectionArticleCount(collectionInfo?.strategy_articles?.data.length || 0)

        setGameName(collectionInfo?.game_info?.data?.attributes?.GameName)
      }
    }
  })

  const [menuItems, currentActiveIndex] = useMemo(() => {
    let currentActiveIndex = 0
    const menuItems = collectionArticleList.map((item, index) => {
      if (articleId == item?.id) {
        currentActiveIndex = index
      }

      return {
        key: index,
        label: <GameArticleItem
          sort={index + 1}
          article={item}
          activeItem={articleId == item?.id}
          activeColor={true}
          collectionId={collectionId as string} />
      }
    })
    return [menuItems, currentActiveIndex]
  }, [collectionArticleList])

  return <Box>
    <Head>
      <title>Strategy | FirstPlay </title>
      <meta name="description" content="A blockchain game platform where you discover new games and try game NFTs for free" />

      <meta
        property="og:title"
        content={`Reading ${gameName}\'walkthrough on FirstPlay`}
      />
      <meta
        property="og:description"
        content={articleContent?.ArticleTitle}
      />
      <meta
        property="og:image"
        content="https://firstplay-crm.s3.ap-east-1.amazonaws.com/3_17_2_6e7214ad47.jpg"
      />
      {isMounted && <meta
        property="og:url"
        content={window.location.href}
      />}
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />

      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Box className={styles.headerBox}>
      <Box className={styles.articleInfo}>
        <Box className={styles.leftBox}>
          <Box className={styles.userLogo}>
            <img src='/favicon.ico' />
          </Box>
          {/* TODO: 目前 官方 Firstplay 作者，后续支持其他作者，此处逻辑需修改 */}
          <Typography>FirstPlay</Typography>
        </Box>
        <Box className={styles.pcHeaderBtnBox}>
          <SocialMediaShare
            shareType="Article"
            articleName={articleContent?.ArticleTitle}
            trigger={
              <Box className={styles.shareBtn}>
                <svg t="1677486737514" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6523" width="16" height="16"><path d="M889.9 97.3H663.3c-10.4 0-19.3 3.7-26.7 11.1-7.4 7.4-11.1 16.3-11.1 26.8 0 10.4 3.6 19.3 11.1 26.7 7.3 7.4 16.3 11.1 26.7 11.1h135.4L485.3 486.2c-7.2 7-11.1 16.6-10.9 26.7 0 10.7 3.6 19.7 10.7 26.9 7.2 7.3 16.2 10.9 27 10.9 10.6 0 19.6-3.7 26.9-11l313.1-313.3v135.4c0 10.5 3.6 19.4 11.1 26.8 7.4 7.4 16.3 11.1 26.7 11.1 10.4 0 19.3-3.7 26.7-11.1 7.4-7.4 11.1-16.3 11.1-26.8V135.2c0-10.4-3.7-19.4-11.1-26.8-6.9-7.2-16.6-11.3-26.7-11.1z m-419.2 2.1c-50.5 5-99.7 19.3-145 42.3-91.2 45.9-162.3 123.7-199.9 218.6-19.2 48.6-29 100.3-28.9 152.5 0 56.4 10.9 110.3 32.7 161.7 20.3 48.6 49.9 92.7 88.8 132.1 39.5 39 83.6 68.5 132.2 88.8 51.1 21.8 106.1 32.9 161.7 32.8 52.7 0 103.6-9.7 152.6-29 46.8-18.5 89.9-45.4 127.2-79.3 37.6-34.3 68.6-75.1 91.5-120.6 22.9-45.3 37.2-94.5 42.2-145 1-11.3-2.2-21-9.6-29.3-7.1-8.1-17.4-12.6-28.2-12.3-9.6 0-18 3.2-25.2 9.7-7.3 6.5-11.3 14.6-12.3 24.2-4 41.4-15.6 81.7-34.4 118.8-18.7 37.3-44.2 70.7-75.2 98.6-30.2 28-65.5 50-103.8 65-39.8 15.6-82.1 23.6-124.8 23.6-45.4 0.1-90.4-8.9-132.2-26.6-39.7-16.7-75.8-41.1-108.3-72.9-31.9-32.4-56.2-68.4-72.9-108.2-17.7-41.8-26.7-86.7-26.5-132.1 0-43 7.9-84.7 23.6-124.9 14.9-38.4 36.9-73.6 64.9-103.9 56.2-62.4 133.8-101.4 217.4-109.4 9.7-1.1 17.7-5.1 24.2-12.4 6.5-7.2 9.8-15.6 9.8-25.2 0-7.5-1.4-13.9-4.3-19.2-2.9-5.3-6.7-9.2-11.3-11.9-4.2-2.3-8.8-4.1-13.5-5.3-4.1-1-8.3-1.5-12.5-1.5v0.3z" p-id="6524" fill="#222222"></path></svg>
                {t('shareText')}
              </Box>
            }
          />
          {/* PC component */}
          <Dropdown
            className={styles.collectionList}
            menu={{ items: menuItems }}
            trigger={['hover']}
            placement="bottomRight"
            dropdownRender={(menu) => (
              <Box className={styles.dropdownViewBox}>
                <Typography>{t('authorOtherArticles')}</Typography>
                {React.cloneElement(menu as React.ReactElement, { style: { boxShadow: 'none' } })}
              </Box>
            )}
          >
            <Box className={styles.viewArticleCollectionPC}>
              {t("viewAllArticleFor", { gameName: gameName })} (<span>{collectionArticleList.length}</span>)
              <KeyboardArrowDownIcon />
            </Box>
          </Dropdown>
        </Box>
      </Box>
      {/* mobile component */}
      <Box className={styles.viewArticleCollection} >
        <Typography>{t("viewAllArticleFor", { gameName: gameName })} (<span>{collectionArticleList.length}</span>)</Typography>
        <Dropdown
          className={styles.collectionList}
          menu={{ items: menuItems }}
          trigger={['click']}>
          <KeyboardArrowDownIcon />
        </Dropdown>
      </Box>
    </Box>

    {isMobileSize &&
      <Box className={cx({
        mobileStepAnchorBox: true,
        // @ts-ignore
        hiddenAnchorBox: scroll?.top < 70
      })}>
        <Box className={styles.innerListWrapper}>
          {
            articleContent?.StepList.map((_, index: number) =>
              <Box
                key={index}
                className={cx({
                  stepAnchorStep: true,
                  activeAnchor: activeStep === index + 1
                })}
                onClick={() => {
                  setActiveStep(index + 1)
                  // @ts-ignore
                  ref.current.scrollIntoView()
                }}
              >{t("articleStep", { index: index + 1 })}</Box>
            )
          }
        </Box>
      </Box>}

    <Box className={styles.contentBox} ref={ref}>
      <Typography variant='h1'>{articleContent?.ArticleTitle}</Typography>
      <Box className={styles.articleBaseInfo}>
        <Typography>{new Date(articleContent?.publishedAt).toString().split(' ').slice(1, 3).join(" ")} | By Firstplay</Typography>

        <SocialMediaShare
          shareType="Article"
          articleName={articleContent?.ArticleTitle}
          trigger={
            <Box className={styles.shareBtn} >
              <svg t="1677486737514" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6523" width="16" height="16"><path d="M889.9 97.3H663.3c-10.4 0-19.3 3.7-26.7 11.1-7.4 7.4-11.1 16.3-11.1 26.8 0 10.4 3.6 19.3 11.1 26.7 7.3 7.4 16.3 11.1 26.7 11.1h135.4L485.3 486.2c-7.2 7-11.1 16.6-10.9 26.7 0 10.7 3.6 19.7 10.7 26.9 7.2 7.3 16.2 10.9 27 10.9 10.6 0 19.6-3.7 26.9-11l313.1-313.3v135.4c0 10.5 3.6 19.4 11.1 26.8 7.4 7.4 16.3 11.1 26.7 11.1 10.4 0 19.3-3.7 26.7-11.1 7.4-7.4 11.1-16.3 11.1-26.8V135.2c0-10.4-3.7-19.4-11.1-26.8-6.9-7.2-16.6-11.3-26.7-11.1z m-419.2 2.1c-50.5 5-99.7 19.3-145 42.3-91.2 45.9-162.3 123.7-199.9 218.6-19.2 48.6-29 100.3-28.9 152.5 0 56.4 10.9 110.3 32.7 161.7 20.3 48.6 49.9 92.7 88.8 132.1 39.5 39 83.6 68.5 132.2 88.8 51.1 21.8 106.1 32.9 161.7 32.8 52.7 0 103.6-9.7 152.6-29 46.8-18.5 89.9-45.4 127.2-79.3 37.6-34.3 68.6-75.1 91.5-120.6 22.9-45.3 37.2-94.5 42.2-145 1-11.3-2.2-21-9.6-29.3-7.1-8.1-17.4-12.6-28.2-12.3-9.6 0-18 3.2-25.2 9.7-7.3 6.5-11.3 14.6-12.3 24.2-4 41.4-15.6 81.7-34.4 118.8-18.7 37.3-44.2 70.7-75.2 98.6-30.2 28-65.5 50-103.8 65-39.8 15.6-82.1 23.6-124.8 23.6-45.4 0.1-90.4-8.9-132.2-26.6-39.7-16.7-75.8-41.1-108.3-72.9-31.9-32.4-56.2-68.4-72.9-108.2-17.7-41.8-26.7-86.7-26.5-132.1 0-43 7.9-84.7 23.6-124.9 14.9-38.4 36.9-73.6 64.9-103.9 56.2-62.4 133.8-101.4 217.4-109.4 9.7-1.1 17.7-5.1 24.2-12.4 6.5-7.2 9.8-15.6 9.8-25.2 0-7.5-1.4-13.9-4.3-19.2-2.9-5.3-6.7-9.2-11.3-11.9-4.2-2.3-8.8-4.1-13.5-5.3-4.1-1-8.3-1.5-12.5-1.5v0.3z" p-id="6524" fill="#222222"></path></svg>
              {t('shareText')}
            </Box>
          } />
      </Box>

      <Box className={styles.stepBox}>
        {
          articleContent?.StepList.map((item: Record<string, any>, index: number) =>
            <ArticleStep
              key={index}
              activeStep={isMobileSize ? activeStep : index + 1}
              stepItem={item}
              stepIndex={index + 1}
            />)
        }
      </Box>

      {isMobileSize &&
        <Box className={styles.stepBtns}>
          {activeStep !== 1 ?
            <Box
              className={styles.backBtn}
              onClick={() => {
                if (activeStep > 1) {
                  setActiveStep(activeStep - 1)
                  // @ts-ignore
                  // taskBox?.current.scrollTo({ top: 0 })
                  ref.current.scrollIntoView()
                }
              }}>
              <KeyboardArrowLeftIcon /> {t("stepBack")}
            </Box> : <Box></Box>}

          {activeStep !== articleStepCount ? <Box
            className={styles.nextBtn}
            onClick={() => {
              if (activeStep < articleStepCount) {
                setActiveStep(activeStep + 1)
                // @ts-ignore
                // taskBox?.current.scrollTo({ top: 0 })
                ref.current.scrollIntoView()
              }
            }}
          >
            {t("stepNext")} <KeyboardArrowRightIcon />
          </Box> :
            (
              articleId != last(collectionArticleList)?.id &&
              <Box className={styles.nextArticleBtn}>
                <Link href={`/strategy/article?articleId=${collectionArticleList[currentActiveIndex + 1]?.id}&collectionId=${collectionId}`}>
                  {t("viewNextArticle")}
                </Link>
              </Box>
            )
          }
        </Box>}

      {!isMobileSize && <Box className={styles.articleSwitchPC}>
        <Box className={cx({
          preArticle: true,
          disabelBtn: articleId == first(collectionArticleList)?.id
        })}>{
            articleId == first(collectionArticleList)?.id ?
              <><KeyboardArrowLeftIcon /> {t('articlePrev')}</>
              :
              <a href={`/strategy/article?articleId=${collectionArticleList[currentActiveIndex - 1]?.id}&collectionId=${collectionId}`}>
                <KeyboardArrowLeftIcon /> {t('articlePrev')}
              </a>
          }</Box>

        <Box className={styles.viewAllArticlePCBottom}>
          <Dropdown
            className={styles.collectionList}
            menu={{ items: menuItems }}
            trigger={['hover']}
            placement="top"
            dropdownRender={(menu) => (
              <Box className={styles.dropdownViewBox}>
                <Typography>{t("authorOtherArticles")}</Typography>
                {React.cloneElement(menu as React.ReactElement, { style: { boxShadow: 'none' } })}
              </Box>
            )}
          >
            <Typography>{t("viewAllArticleFor", { gameName: gameName })} (<span>{collectionArticleList.length}</span>)</Typography>
          </Dropdown>
        </Box>

        <Box className={cx({
          nextArticle: true,
          disabelBtn: articleId == last(collectionArticleList)?.id
        })}>
          {
            articleId == last(collectionArticleList)?.id ?
              <>{t("articleNext")} <KeyboardArrowRightIcon /></>
              :
              <a href={`/strategy/article?articleId=${collectionArticleList[currentActiveIndex + 1]?.id}&collectionId=${collectionId}`}>
                {t("articleNext")} <KeyboardArrowRightIcon />
              </a>
          }
        </Box>
      </Box>}
    </Box>
  </Box>
}


ArticleDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <LayoutArticle>{page}</LayoutArticle>
}

export default ArticleDetailPage


export const getStaticProps = async ({ locale }: GetStaticPropsContext<{ slug: string }>) => {

  return {
    props: {
      // 获取国际化文案
      messages: (await import(`../../i18n/${locale}.json`)).default,
    }
  }
}