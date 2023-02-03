import { Box, Tabs, Tab, Typography, Breadcrumbs } from "@mui/material"
import LayoutWithoutFooter from '@/components/LayoutWithoutFooter'
import { GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import React, { ReactElement, useEffect, useState } from 'react'
import { NextPageWithLayout } from '../_app'
import GameDashboardHeader from "@/components/PageDashboard/GameDashboardHeader"
import styles from './history.module.scss'
import { useAccount } from "wagmi"
import HistoryBalanceTable from "@/components/PageDashboard/HistoryBalance"
import Link from '@mui/material/Link';

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
        <Breadcrumbs separator=">" className={styles.navList}>
          <Link href="/dashboard" underline="hover">
            Available Balance
          </Link>
          <Typography>History</Typography>
        </Breadcrumbs>
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