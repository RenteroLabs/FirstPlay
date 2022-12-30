import { Box, Typography } from "@mui/material"
import styles from './styles.module.scss'
import Image from 'next/image'


interface JoinCommunityProps {

}


const JoinCommunity: React.FC<JoinCommunityProps> = (props) => {
  const { } = props

  return <Box className={styles.communityBox}>
    <Typography variant="h2">Our Community</Typography>
    <Typography>Join the community and participate in community activities to build First Play together</Typography>
    <Box
      className={styles.discordBtn}
      onClick={() => {
        window.open('https://discord.com/invite/84mhbPXFUu')
      }}>
      <Box className={styles.iconBox}>
        <Image src="/Discord-Logo-Carnival.png" layout="fill" />
      </Box>
      Go and see
    </Box>
  </Box>
}

export default JoinCommunity