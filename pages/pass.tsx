import { Box } from "@mui/material";
import { GetStaticProps, GetStaticPropsContext, NextPage } from "next";
import styles from '../styles/pass.module.scss'

const PassNFT: NextPage = () => {

  return <Box className={styles.containBox}>
    <Box className={styles.container}>
      <Box className={styles.nftInfo}>

      </Box>
      <Box className={styles.progress}>

      </Box>

      <Box className={styles.task}>

      </Box>
    </Box>
  </Box>
}

export default PassNFT



export const getStaticProps: GetStaticProps = async ({ locale }: GetStaticPropsContext) => {

  return {
    props: {
      // 获取国际化文案
      messages: (await import(`../i18n/${locale}.json`)).default
    }
  }
}