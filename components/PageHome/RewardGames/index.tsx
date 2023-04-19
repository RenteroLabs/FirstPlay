import RewardGameCard from "@/components/RewardGameCard"
import { Box, useMediaQuery } from "@mui/material"
import Link from "next/link"
import SectionTitle from "../components/SectionTitle"
import styles from './styles.module.scss'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState } from "react"
import { useTranslations } from "next-intl";
import { useRequest } from "ahooks"
import { getTaskStatus } from "services/home"

interface RewardGamesProps {
  rewardGames: Record<string, any>[]
  timestamp: number
}

const RewardGames: React.FC<RewardGamesProps> = (props) => {
  const { rewardGames, timestamp } = props
  const t = useTranslations('Index.Section')

  const is600Size = useMediaQuery("(max-width: 600px)")

  const [showMore, setShowMore] = useState<boolean>(true)

  const [taskStatusRecord, setTaskStatusRecord] = useState<Record<string, any>>({})

  useRequest(getTaskStatus, {
    defaultParams: [{ address: '', task_ids: rewardGames.map((item: Record<string, any>) => item?.attributes?.task_id) }],
    refreshDeps: [rewardGames],
    onSuccess: ({ data }) => {
      let statusList: Record<string, any> = {}
      data.forEach((item: Record<string, any>) => {
        statusList[item.task_id] = item.issued_rewards
      })
      setTaskStatusRecord({ ...taskStatusRecord, ...statusList })
    }
  })

  return <Box className={styles.rewardGames}>
    <Box className={styles.rewardGamesBox}>
      <SectionTitle
        emphasize={t('rewardedSectionTitle')}
        // subTitle={t('rewardedSectionSubTitle')}
        moreLink="/bounties"
      />
      <Box className={styles.cardList}>
        {
          ((is600Size && !showMore) ? rewardGames.slice(0, 3) : rewardGames).map((item, index) => <RewardGameCard
            gameInfo={item?.attributes || {}}
            taskStatus={taskStatusRecord}
            key={index}
            timestamp={timestamp} />)
        }
      </Box>
    </Box>

    {/* {is600Size && <Box className={styles.showMoreBtn} onClick={() => setShowMore(!showMore)}>
      {
        showMore ?
          <> {t('showLessBtn')} <KeyboardArrowUpIcon /> </> :
          <> {t('showMoreBtn')} <KeyboardArrowDownIcon /> </>
      }
    </Box>} */}
  </Box>
}

export default RewardGames