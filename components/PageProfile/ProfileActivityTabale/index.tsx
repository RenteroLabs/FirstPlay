
import { useLazyQuery } from '@apollo/client'
import { Box, CircularProgress, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material'
import { useRequest } from 'ahooks'
import { isEmpty } from 'lodash'
import { useEffect, useMemo, useState } from 'react'
import { GET_USER_ACTIVITYS } from 'services/documentNode'
import { goerliGraph } from 'services/graphql'
import { getGameInfo, getTrialTaskRecordList } from 'services/home'
import { UserActivityItem } from 'types/graph'
import { dateFormat } from 'util/format'
import { useAccount } from 'wagmi'
import Image from 'next/image'
import styles from './styles.module.scss'
import { useTranslations } from "next-intl";
import { getBountiesByTaskIds } from 'services/cms'

interface ProfileActivityTableProps { }

const ProfileActivityTable: React.FC<ProfileActivityTableProps> = (props) => {

  const { address } = useAccount()
  const t = useTranslations('Profile.Activity')

  const [activitiesList, setActivitiesList] = useState<UserActivityItem[]>([])
  const [taskRecordList, setTaskRecordList] = useState<Record<string, any>[]>([])
  const [bountyInfos, setBountyInfos] = useState<Record<string, any>>({})

  const [gameInfo, setGameInfo] = useState<Record<string, Record<string, any>>>({})

  const { run: queryGameInfo, loading: gameInfoLoading } = useRequest(getGameInfo, {
    manual: true,
    onSuccess: ({ data }, [params]) => {
      setGameInfo({ ...gameInfo, [params.game_id]: data })
    }
  })
  const [queryUserActivities, { loading: activityLoading }] = useLazyQuery(GET_USER_ACTIVITYS, {
    variables: { player: address },
    // TODO: 需查询多个链上的 graph 数据
    client: goerliGraph,
    onCompleted: ({ activities }) => {
      setActivitiesList(activities)

      activities.forEach((activity: UserActivityItem) => {
        // 如果未请求缓存
        if (!gameInfo[activity?.packages?.game?.id]) {
          queryGameInfo({ game_id: activity?.packages?.game?.id })
        }
      })
    }
  })

  const loading = useMemo(() => {
    return gameInfoLoading || activityLoading
  }, [gameInfoLoading, activityLoading])

  useEffect(() => {
    if (address) {
      queryUserActivities()


      queryTaskRecordList(address)
    }
  }, [address])


  /**
   * game task play history record
   */
  const { run: queryTaskRecordList, loading: taskRecordLoading } = useRequest(getTrialTaskRecordList, {
    manual: true,
    onSuccess: ({ data }) => {
      setTaskRecordList(data || [])

      const task_ids = data?.map((item: Record<string, any>) => item?.task_id) || []
      queryBountyInfos({ taskIds: task_ids })
    }
  })

  // 获取 tasks 信息
  const { run: queryBountyInfos } = useRequest(getBountiesByTaskIds, {
    manual: true,
    onSuccess: ({ data }) => {
      let bountyInfos: Record<string, any> = {}
      data.forEach((item: Record<string, any>) => {
        bountyInfos[item?.attributes?.task_id] = item?.attributes
      })
      setBountyInfos(bountyInfos)
    }
  })



  return <TableContainer component={Paper} className={styles.tableBox}>
    <Box>
      {(taskRecordLoading || (!taskRecordLoading && !isEmpty(taskRecordList))) && <Table >
        <TableHead>
          <TableRow className={styles.tableHeaderRow}>
            <TableCell className={styles.tableHeaderCell}>{t('gameColumn')}</TableCell>
            <TableCell className={styles.tableHeaderCell}>{t("actionColumn")}</TableCell>
            {/* <TableCell className={styles.tableHeaderCell}>Task</TableCell> */}
            {/* <TableCell className={styles.tableHeaderCell}>Trial</TableCell> */}
            <TableCell className={styles.tableHeaderCell}>{t("rewardColumn")}</TableCell>
            <TableCell className={styles.tableHeaderCell}>{t("timeColumn")}</TableCell>
            {/* <TableCell className={styles.tableHeaderCell} align="center">Operate</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {
            !loading && activitiesList?.map((item, index) => {
              const gameId = item?.packages?.game?.id
              return (
                <TableRow key={item.id}>
                  <TableCell className={styles.tableBodyCell}>
                    {item.type}
                  </TableCell>
                  <TableCell className={styles.tableBodyCell}>
                    {gameInfo[gameId]?.name}
                  </TableCell>
                  <TableCell className={styles.tableBodyCell}>
                    {item.packages.nfts.map((nft) => `#${nft.tokenId}`).join(',')}
                  </TableCell>
                  <TableCell className={styles.tableBodyCell}>
                    {dateFormat("YYYY-mm-dd HH:MM", new Date(parseInt(item.timestamp) * 1000))}
                  </TableCell>
                  <TableCell className={styles.tableBodyCell}>
                    {item?.packages?.playDays} Day
                  </TableCell>
                  <TableCell className={styles.tableBodyCell}>
                    {gameInfo[gameId]?.reward}
                  </TableCell>
                  <TableCell className={styles.tableBodyCell} align="center" >
                    {
                      item.type === 'play' &&
                      <Box className={styles.cellTrialBtn} onClick={() => handleTrialBtn(gameId)}>
                        Trial
                      </Box>
                    }
                  </TableCell>
                </TableRow>
              )
            })
          } */}
          {
            !taskRecordLoading &&
            taskRecordList.map((item, index) => {
              const bountyInfo = bountyInfos[item?.task_id]
              const gameInfo = bountyInfo?.game_info

              return <TableRow key={index} className={styles.tableRow}>
                <TableCell className={styles.tableBodyCell} sx={{ minWidth: '13rem' }}>
                  {gameInfo?.data?.attributes?.GameName}
                </TableCell>
                <TableCell className={styles.tableBodyCell} sx={{ minWidth: '20rem' }}>
                  {item?.type === 'start task' ? t('startText') : t('completeText')}: {bountyInfo?.description}
                </TableCell>

                <TableCell className={styles.tableBodyCell} sx={{ minWidth: '15rem' }}>
                  {bountyInfo?.reward}
                </TableCell>
                <TableCell className={styles.tableBodyCell} sx={{ minWidth: '15rem' }}>
                  {dateFormat("YYYY-mm-dd HH:MM", new Date(parseInt(item?.time) * 1000))}
                </TableCell>
              </TableRow>
            }
            )}
        </TableBody>
      </Table>}
    </Box>

    {
      // loading && <Box className={styles.tableLoadingBox}>
      //   <CircularProgress />
      // </Box>
    }

    {/* TODO: 目前直接展示全部数据，分页只有一页 */}
    {/* {!loading && (!isEmpty(taskRecordList) ?
      <Box className={styles.paginationBox}>
        <Pagination count={1} variant="outlined" shape="rounded" className={styles.pagination} />
      </Box> :
      <Box className={styles.empytTipBox}>
        <Typography>No Activity Record Yet!</Typography>
      </Box>)} */}


    {/* 列表无数据 */}
    {
      !loading && isEmpty(taskRecordList) &&
      <Box className={styles.emptyList}>
        <Box className={styles.emptyIllustration}>
          <Image src="/empty_trialing.png" layout="fill" />
        </Box>
        <Typography>{t('emptyTip')}</Typography>
      </Box>
    }

  </TableContainer>
}

export default ProfileActivityTable