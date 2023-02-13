import { Box, Tabs, Tab, Typography } from "@mui/material"
import LayoutWithoutFooter from '@/components/LayoutWithoutFooter'
import { GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import React, { ReactElement, useEffect, useState } from 'react'
import { NextPageWithLayout } from './_app'
import GameDashboardHeader from "@/components/PageDashboard/GameDashboardHeader"
import styles from '../styles/dashboard.module.scss'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import BalanceTable from "@/components/PageDashboard/BalanceTable"
import { useAccount } from "wagmi"
import OngoingTaskTable from "@/components/PageDashboard/OngoingTaskTable"
import HistoryTaskTable from "@/components/PageDashboard/HistoryTaskTable"
import Image from "next/image"

import Link from "next/link"
import { useRequest } from "ahooks"
import { businessTokenBalanceList, checkAddressAuthority } from "services/home"

enum TabItem {
  Ongoing,
  History
}

const Dashboard: NextPageWithLayout<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {

  const { address } = useAccount()
  const [activeTab, setActiveTab] = useState<TabItem>(TabItem.Ongoing)

  const [gameInfo, setGameInfo] = useState<Record<string, any>>({})

  const [tokenBalanceList, setTokenBalanceList] = useState<Record<string, any>[]>([])

  const [isAuthority, setIsAuthority] = useState<boolean>(false)

  const { run: queryTokenBalance, refresh } = useRequest(businessTokenBalanceList, {
    manual: true,
    onSuccess: ({ data }) => {
      // console.log(data)
      setTokenBalanceList(data)
    }
  })

  const { run: queryCheckAddress, loading } = useRequest(checkAddressAuthority, {
    manual: true,
    onSuccess: ({ data }) => {
      if (data) {
        setIsAuthority(true)
        setGameInfo({ ...data })
      }
    }
  })
  useEffect(() => {
    if (address) {
      // 判断地址是否符合权限
      queryCheckAddress(address)

      queryTokenBalance(address as string)

    } else {
      setIsAuthority(false)
    }
  }, [address])

  return <Box className={styles.dashboardBox}>
    {
      (isAuthority || loading) ?
        <>
          <GameDashboardHeader gameInfo={gameInfo} />
          <Box className={styles.mainBox}>
            <Box className={styles.balanceHeader}>
              <Typography variant="h3">Available Balance</Typography>
              <Link href="/dashboard/history" target="_blank" >
                <Box className={styles.balanceHistoryBtn}>
                  History
                  <KeyboardDoubleArrowRightIcon />
                </Box>
              </Link>

            </Box>
            <BalanceTable balanceList={tokenBalanceList} />

            <Typography className={styles.taskSectionTitle}>Task Consumption</Typography>

            <Tabs
              className={styles.tabsHeader}
              value={activeTab}
              onChange={(_: any, newItem: number) => {
                setActiveTab(newItem)
              }} >
              <Tab label="Ongoing" value={TabItem.Ongoing} disableRipple />
              <Tab label="History" value={TabItem.History} disableRipple />
            </Tabs>

            {
              activeTab === TabItem.Ongoing &&
              <OngoingTaskTable
                balanceTokenInfo={tokenBalanceList}
                refreshBalance={refresh}
                gameInfo={gameInfo}
              />
            }

            {
              activeTab === TabItem.History &&
              <HistoryTaskTable
                gameInfo={gameInfo}
              />
            }
          </Box>
        </>
        :
        <Box className={styles.noAccessTip}>
          <Box className={styles.noAccessIllust}>
            <Image src="/no_access_right.png" layout="fill" />
          </Box>
          <Typography>
            Current address no access right now! <br />
            For game projects and other cooperation, please contact &nbsp;
            <a target="__blank" href="mailto:business@firstplay.app">business@firstplay.app</a>
          </Typography>
        </Box>
    }

    <Box className={styles.mobileTips}>
      Please go to the PC side to view for a better experience!
    </Box>
  </Box>
}

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <LayoutWithoutFooter>{page}</LayoutWithoutFooter>
}

export default Dashboard


export const getStaticProps: GetStaticProps = async ({ locale }: GetStaticPropsContext) => {

  return {
    props: {
      // 获取国际化文案
      messages: (await import(`../i18n/${locale}.json`)).default
    }
  }
}