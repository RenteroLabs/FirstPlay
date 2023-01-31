import { Box } from "@mui/material"
import LayoutWithoutFooter from '@/components/LayoutWithoutFooter'
import { GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import React, { ReactElement, useEffect, useState } from 'react'
import { NextPageWithLayout } from './_app'
import GameDashboardHeader from "@/components/PageDashboard/GameDashboardHeader"

const Dashboard: NextPageWithLayout<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {
  return <Box>
    <GameDashboardHeader />
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