import { Box, Tabs, Tab, Typography } from "@mui/material"
import LayoutWithoutFooter from '@/components/LayoutWithoutFooter'
import { GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import React, { ReactElement, useEffect, useState } from 'react'
import { NextPageWithLayout } from '../_app'
import GameDashboardHeader from "@/components/PageDashboard/GameDashboardHeader"
import styles from './history.module.scss'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import BalanceTable from "@/components/PageDashboard/BalanceTable"
import { useAccount } from "wagmi"
import OngoingTaskTable from "@/components/PageDashboard/OngoingTaskTable"
import HistoryTaskTable from "@/components/PageDashboard/HistoryTaskTable"
import HistoryBalanceTable from "@/components/PageDashboard/HistoryBalance"

enum TabItem {
  Ongoing,
  History
}

const History: NextPageWithLayout<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {

  const { address } = useAccount()

  useEffect(() => {
    if (address) {
      // 判断地址是否符合权限

    }
  }, [address])

  return <Box className={styles.dashboardBox}>
    <GameDashboardHeader />
    <Box className={styles.mainBox}>
      <Box className={styles.balanceHeader}>
        <Typography variant="h3">History</Typography>
      </Box>
      <HistoryBalanceTable />
    </Box>
  </Box>
}

History.getLayout = function getLayout(page: ReactElement) {
  return <LayoutWithoutFooter>{page}</LayoutWithoutFooter>
}

export default History


export const getStaticProps: GetStaticProps = async ({ locale }: GetStaticPropsContext) => {

  return {
    props: {
      // 获取国际化文案
      messages: (await import(`../../i18n/${locale}.json`)).default
    }
  }
}