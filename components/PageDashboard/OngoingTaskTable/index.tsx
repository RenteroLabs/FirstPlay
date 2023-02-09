import { Box, Link, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { useIsMounted } from "hooks/useIsMounted";
import { isEmpty } from "lodash";
import React, { useEffect, useMemo, useState } from "react";
import styles from './styles.module.scss'
import Image from "next/image";
import { useAccount, useSignMessage } from "wagmi";
import { dateFormat } from "util/format";
import DepositTaskModal from "../DepositTaskModal";
import { useRequest } from "ahooks";
import { businessTaskList } from '../../../services/home'

interface OngoingTableProps {
  balanceTokenInfo: Record<string, any>[]
  refreshBalance: () => any
  gameInfo: Record<string, any>
}

const OngoingTaskTable: React.FC<OngoingTableProps> = (props) => {
  const { balanceTokenInfo, refreshBalance, gameInfo } = props
  const isMounted = useIsMounted()
  const { address } = useAccount()

  const [showModal, setShowModal] = useState<boolean>(false)

  const [ongoingList, setOngoingList] = useState<Record<string, any>[]>([])
  const [selectedTaskId, setSelectedTaskId] = useState<string>("")

  const { run: queryBusinessTaskList, refresh } = useRequest(businessTaskList, {
    manual: true,
    onSuccess: ({ data }) => {
      // console.log(data)
      setOngoingList(data)
    }
  })

  useEffect(() => {
    if (address) {
      queryBusinessTaskList(address, 'on')
    }
  }, [address])

  const isEmptyContent = useMemo(() => {
    return isMounted && isEmpty(ongoingList)
  }, [ongoingList])

  return <Box className={styles.balanceBox}>
    {
      isEmptyContent ?
        <Box className={styles.emptyList}>
          <Box className={styles.emptyIllustration}>
            <Image src="/empty_trialing.png" layout="fill" />
          </Box>
          <Typography>Oh, there is no any ongoing task yet.</Typography>
        </Box>
        :
        <Table>
          <TableHead>
            <TableRow className={styles.tableHeaderRow}>
              <TableCell className={styles.tableHeaderCell}>
                TaskID
              </TableCell>
              <TableCell className={styles.tableHeaderCell}>
                Description
              </TableCell>
              <TableCell className={styles.tableHeaderCell}>
                Completed User
              </TableCell>
              <TableCell className={styles.tableHeaderCell}>
                Balance
              </TableCell>
              <TableCell className={styles.tableHeaderCell}>
                Total
              </TableCell>
              <TableCell className={styles.tableHeaderCell}>
                Launch time
              </TableCell>
              <TableCell className={styles.tableHeaderCell}>
              </TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {
              ongoingList.map((item, key) => <TableRow key={key} className={styles.tableRow}>
                {/* TODO: 跳转至游戏详情页 */}
                <TableCell className={styles.tableBodyCell}>
                  <a href={`/game/${gameInfo?.game_id}?task_id=${item?.task_id}`} target="_blank" rel="noreferrer">
                    {item?.task_id.split('-')[0]}
                  </a>
                </TableCell>
                <TableCell className={styles.tableBodyCell} sx={{ maxWidth: "30rem", paddingRight: '1rem' }}>
                  {item?.description}
                </TableCell>
                <TableCell className={styles.tableBodyCell}>{item?.completed}</TableCell>
                <TableCell className={styles.tableBodyCell}>{item?.balance} {item?.token_symbol}</TableCell>
                <TableCell className={styles.tableBodyCell}>{item?.total} {item?.token_symbol}</TableCell>
                <TableCell className={styles.tableBodyCell}>
                  {dateFormat("YYYY-mm-dd HH:MM", new Date(parseInt(item?.time) * 1000))}
                </TableCell>
                <TableCell
                  className={styles.tableBodyCell}
                  onClick={() => {
                    setShowModal(true)
                    setSelectedTaskId(item?.task_id)
                  }}
                >
                  <Box className={styles.transferBtn}>Transfer in</Box>
                </TableCell>
              </TableRow>)
            }
          </TableBody>

          <DepositTaskModal
            showModal={showModal}
            setShowModal={setShowModal}
            balanceInfo={balanceTokenInfo}
            taskId={selectedTaskId}
            reload={() => {
              refresh()
              refreshBalance()
            }}
          />
        </Table>
    }
  </Box>
}

export default OngoingTaskTable