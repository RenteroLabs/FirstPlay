import { Box, Typography } from "@mui/material"
import { formatAddress } from "util/format"
import { useAccount } from "wagmi"
import SectionTitle from "../components/SectionTitle"
import TrialGameCard from "../components/TrialGameCard"
import styles from './style.module.scss'
import PersonIcon from '@mui/icons-material/Person';
import { useIsMounted } from "hooks/useIsMounted"
import { useEffect, useState } from "react"
import { useRequest } from "ahooks"
import { getTrialingTasks } from "services/home"
import classNames from "classnames/bind"

const cx = classNames.bind(styles)

interface TrialGameProps {

}

const TrialGame: React.FC<TrialGameProps> = (props) => {
  const { address } = useAccount()
  const isMounted = useIsMounted()

  const [trialingTasks, setTrialingTasks] = useState<Record<string, any>[]>([])

  const { run: queryTrialingTask, loading } = useRequest(getTrialingTasks, {
    manual: true,
    onSuccess: ({ data }) => {
      console.log(data)
      setTrialingTasks(data?.trialing_games || [])
    }
  })

  useEffect(() => {
    if (address) {
      queryTrialingTask(address)
    }
  }, [address])

  return <Box className={styles.trialgame}>
    <Box className={styles.trialgameBox}>
      <SectionTitle normal="Trialing Games" sort="last" moreLink="/profile?tab=Activity" />
      <Box className={styles.addressInfo}>
        <Box className={styles.iconBox}>
          <PersonIcon />
        </Box>
        {isMounted && address && formatAddress(address, 4)}
      </Box>
      <Box className={cx({
        cardList: true,
        oneCard: trialingTasks.length === 1
      })}>
        {
          trialingTasks.map((item, index: number) =>
            <TrialGameCard key={index} trialTask={item} />)
        }
        {
          !loading && trialingTasks.length === 0 &&
          <Typography className={styles.emptyDesc}>No games currently trialing, start a game you like now!</Typography>
        }
      </Box>
    </Box>
  </Box>
}

export default TrialGame