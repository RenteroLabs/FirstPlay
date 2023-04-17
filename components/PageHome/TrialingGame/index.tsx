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
import { getProfileTrialingTaskList, getTrialingTasks } from "services/home"
import classNames from "classnames/bind"
import { useTranslations } from "next-intl";
import { getBountiesByTaskIds } from "services/cms"

const cx = classNames.bind(styles)

interface TrialGameProps { }

const TrialGame: React.FC<TrialGameProps> = () => {
  const { address } = useAccount()
  const isMounted = useIsMounted()

  const t = useTranslations('Index.Section')

  const [trialingTasks, setTrialingTasks] = useState<Record<string, any>[]>([])
  const [bountyInfos, setBountyInfos] = useState<Record<string, any>>({})

  const { run: queryTrialingTask, loading } = useRequest(getProfileTrialingTaskList, {
    manual: true,
    onSuccess: ({ data }) => {
      console.log(data)
      // setTrialingTasks(data?.trialing_games || [])
      const homeTrialing = data?.slice(0, 2)
      setTrialingTasks(homeTrialing || [])
      const task_ids = ['2431f220-0729-4537-a8ba-8b44c1b61318', 'bbc0e19b-a48f-4971-96a8-08af1f8e45aa']

      queryBountyInfos({ taskIds: task_ids })
    }
  })

  const { run: queryBountyInfos } = useRequest(getBountiesByTaskIds, {
    manual: true,
    onSuccess: ({ data }) => {
      console.log(data)
      let bountyInfos: Record<string, any> = {}
      data.forEach((item: Record<string, any>) => {
        bountyInfos[item?.attributes?.task_id] = item?.attributes
      })
      console.log(bountyInfos)
      setBountyInfos(bountyInfos)
    }
  })

  useEffect(() => {
    if (address) {
      queryTrialingTask(address)
    }
  }, [address])

  return <Box className={styles.trialgame}>
    <Box className={styles.trialgameBox}>
      <SectionTitle emphasize={t('trialingTitle')} moreLink="/profile?tab=Trialing" />
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
        {/* TODO: 待添加 task_id 字段后处理 */}
        {
          trialingTasks.map((item, index: number) =>
            <TrialGameCard key={index} trialTask={bountyInfos['bbc0e19b-a48f-4971-96a8-08af1f8e45aa']} />)
        }
        {
          !loading && trialingTasks.length === 0 &&
          <Typography className={styles.emptyDesc}>{t('emptyTrialingTip')}</Typography>
        }
      </Box>
    </Box>
  </Box>
}

export default TrialGame