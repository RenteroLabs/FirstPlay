import RewardGameCard from "@/components/RewardGameCard"
import { Box, useMediaQuery } from "@mui/material"
import SectionTitle from "../components/SectionTitle"
import styles from './styles.module.scss'
import { useEffect, useState } from "react"
import { useTranslations } from "next-intl";
import { useRequest } from "ahooks"
import { getTaskStatus } from "services/home"
import { getAllTaskCount } from "services/cms"
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
interface RewardGamesProps {
  rewardGames: Record<string, any>[]
}

const RewardGames: React.FC<RewardGamesProps> = (props) => {
  const { rewardGames } = props
  const t = useTranslations('Index.Section')

  const is600Size = useMediaQuery("(max-width: 600px)")

  const [taskStatusRecord, setTaskStatusRecord] = useState<Record<string, any>>({})

  const [taskCount, setTaskCount] = useState<number>(0)

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

  const { run: queryTaskCount } = useRequest(getAllTaskCount, {
    manual: true,
    cacheKey: 'taskCount',
    staleTime: 1000 * 60 * 60 * 1, // 缓存 1 小时
    onSuccess: ({ meta }) => {
      setTaskCount(meta?.pagination?.total || 0)
    }
  })

  useEffect(() => {
    queryTaskCount()
  }, [])


  return <Box className={styles.rewardGames}>
    <Box className={styles.rewardGamesBox}>
      <SectionTitle
        emphasize={t('rewardedSectionTitle')}
        subTitle={<>View all <span>{(taskCount != 0) ? taskCount : ''}</span> bounties</>}
        moreLink="/bounties"
      />
      <Box className={styles.cardList}>
        {
          (is600Size ? rewardGames.slice(0, 6) : rewardGames).map((item, index) => <RewardGameCard
            gameInfo={item?.attributes || {}}
            taskStatus={taskStatusRecord}
            key={index}
          />)
        }
      </Box>
    </Box>

    {is600Size &&
      <Box className={styles.showMoreBtn} >
        <a href="/bounties" target="_blank" rel="noreferrer">
          View more bounties &nbsp;
          <ArrowForwardIcon />
        </a>
      </Box>
    }
  </Box>
}

export default RewardGames