
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
import styles from './styles.module.scss'

interface ProfileActivityTableProps {

}

const ProfileActivityTable: React.FC<ProfileActivityTableProps> = (props) => {

  const { address } = useAccount()

  const [activitiesList, setActivitiesList] = useState<UserActivityItem[]>([])
  const [taskRecordList, setTaskRecordList] = useState<Record<string, any>[]>([])

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
      console.log(data)
      setTaskRecordList(data || [])
    }
  })


  const handleTrialBtn = (gameId: string) => {
    // 跳转至游戏详情页
    window.open(`/game/${gameId}`, '__blank')
  }

  return <TableContainer component={Paper} className={styles.tableBox}>
    <Box>
      <Table >
        <TableHead>
          <TableRow>
            <TableCell className={styles.tableHeaderCell}>Action</TableCell>
            <TableCell className={styles.tableHeaderCell}>Game</TableCell>
            <TableCell className={styles.tableHeaderCell}>Task</TableCell>
            <TableCell className={styles.tableHeaderCell}>Time</TableCell>
            {/* <TableCell className={styles.tableHeaderCell}>Trial</TableCell> */}
            <TableCell className={styles.tableHeaderCell}>Reward</TableCell>
            <TableCell className={styles.tableHeaderCell} align="center">Operate</TableCell>
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
            taskRecordList.map((item, index) =>
              <TableRow key={index}>
                <TableCell className={styles.tableBodyCell}>
                  {item?.user_task_status === 'uncompleted' ? 'Start' : "Completed"}
                </TableCell>
                <TableCell className={styles.tableBodyCell} sx={{ minWidth: '10rem'}}>
                  {item?.name}
                </TableCell>
                <TableCell className={styles.tableBodyCell} sx={{ minWidth: '20rem'}}>
                  {item?.task}
                </TableCell>
                <TableCell className={styles.tableBodyCell} sx={{ minWidth: '13rem'}}>
                  {dateFormat("YYYY-mm-dd HH:MM", new Date(parseInt(item?.time) * 1000))}
                </TableCell>
                <TableCell className={styles.tableBodyCell} sx={{ minWidth: '15rem'}}>
                  {item?.rewards}
                </TableCell>
                <TableCell className={styles.tableBodyCell} align="center" >
                  {
                    <Box
                      className={styles.cellTrialBtn}
                      onClick={() => handleTrialBtn(item?.game_id)}>
                      {item?.user_task_status === 'uncompleted' ? 'Continue' : "Detail"}
                    </Box>
                  }
                </TableCell>
              </TableRow>
            )}
        </TableBody>
      </Table>
    </Box>

    {
      // loading && <Box className={styles.tableLoadingBox}>
      //   <CircularProgress />
      // </Box>
    }

    {!loading && (!isEmpty(taskRecordList) ?
      <Box className={styles.paginationBox}>
        {/* TODO: 目前直接展示全部数据，分页只有一页 */}
        {/* <Pagination count={1} variant="outlined" shape="rounded" className={styles.pagination} /> */}
      </Box> :
      <Box className={styles.empytTipBox}>
        <Typography>No Activity Record Yet!</Typography>
      </Box>)}

  </TableContainer>
}

export default ProfileActivityTable