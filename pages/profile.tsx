import { NextPageWithLayout } from "./_app";
import React, { ReactElement } from 'react';
import { Box, Typography } from "@mui/material";
import Layout from "@/components/Layout";
import { GetStaticProps, GetStaticPropsContext } from "next";
import styles from '../styles/profile.module.scss'

const Profile: NextPageWithLayout = () => {

  return <Box className={styles.containerBox}>
    <Typography variant="h3">Profile Page</Typography>
  </Box>
}

Profile.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Profile


export const getStaticProps: GetStaticProps = async ({ locale }: GetStaticPropsContext) => {
  return {
    props: {
      // 获取国际化文案
      messages: (await import(`../i18n/${locale}.json`)).default
    }
  }
}