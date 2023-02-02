import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { useIsMounted } from "hooks/useIsMounted";
import { isEmpty } from "lodash";
import React, { useEffect, useMemo, useState } from "react";
import styles from './styles.module.scss'
import Image from "next/image";
import { useAccount } from "wagmi";
import { dateFormat } from "util/format";
import DepositTaskModal from "../DepositTaskModal";

interface OngoingTableProps {
  // balanceList: Record<string, any>[]
}

const OngoingTaskTable: React.FC<OngoingTableProps> = (props) => {
  const isMounted = useIsMounted()
  const { address } = useAccount()

  const [showModal, setShowModal] = useState<boolean>(false)

  const [ongoingList, setOngoingList] = useState<Record<string, any>[]>([
    {
      task_id: '8489b4b1-ed82-451d-96b6-46fe199b2fe8',
      task_name: "Clear the first 10 stages with a new account",
      done_user: 8,
      balance: 20,
      total_balance: 100,
      launch_time: 1675242562
    }
  ])

  useEffect(() => {
    if (address) {
      // TODO: 请求 ongoing 列表数据

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
                <TableCell className={styles.tableBodyCell}>{item?.task_id.split('-')[0]}</TableCell>
                <TableCell className={styles.tableBodyCell} sx={{ maxWidth: "30rem", paddingRight: '1rem' }}>
                  {item?.task_name}
                </TableCell>
                <TableCell className={styles.tableBodyCell}>{item?.done_user}</TableCell>
                <TableCell className={styles.tableBodyCell}>{item?.balance}</TableCell>
                <TableCell className={styles.tableBodyCell}>{item?.total_balance}</TableCell>
                <TableCell className={styles.tableBodyCell}>
                  {dateFormat("YYYY-mm-dd HH:MM", new Date(parseInt(item?.launch_time) * 1000))}
                </TableCell>
                <TableCell
                  className={styles.tableBodyCell}
                  onClick={() => {
                    setShowModal(true)
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
            balanceInfo={{}}
          />
        </Table>
    }
  </Box>
}

export default OngoingTaskTable