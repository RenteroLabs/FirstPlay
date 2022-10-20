import { Box, useMediaQuery } from "@mui/material"
import SectionTitle from "../components/SectionTitle"
import styles from './style.module.scss'
import Image from "next/image"

const Support: React.FC = () => {
  const isMobileSize = useMediaQuery("(max-width: 600px)")

  return <Box className={styles.support}>
    <Box className={styles.supportBox}>
      <SectionTitle emphasize="Supported" normal="by" />
      <Box className={styles.cardList}>
        <Box className={styles.brandItem}>
          <Box>
            <Image priority src="/SHIMA CAPITAL_logo.png" layout="fill" objectFit="contain" />
          </Box>
        </Box>
        <Box className={styles.brandItem}>
          <Box>
            <Image priority src={`/YGG SEA_logo.png`} layout="fill" objectFit="contain" />
          </Box>
        </Box>
        <Box className={styles.brandItem}>
          <Box>
            <Image priority src="/Lancer-Capital_logo.png" layout="fill" objectFit="contain" />
          </Box>
        </Box>
        <Box className={styles.brandItem}>
          <Box>
            <Image priority src="/C2 Ventures_logo.png" layout="fill" objectFit="contain" />
          </Box>
        </Box>
        <Box className={styles.brandItem}>
          <Box>
            <Image priority src="/Lita_logo.png" layout="fill" objectFit="contain" />
          </Box>
        </Box>
      </Box>
    </Box>
  </Box>
}

export default Support