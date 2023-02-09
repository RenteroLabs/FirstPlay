import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { useIsMounted } from "hooks/useIsMounted";
import { isEmpty } from "lodash";
import React, { useEffect, useMemo, useState } from "react";
import styles from './styles.module.scss'
import Image from "next/image";
import { useAccount } from "wagmi";
import { dateFormat } from "util/format";
import { useRequest } from "ahooks";
import { businessTaskList } from "services/home";

interface HistoryTableProps {
  gameInfo: Record<string, any>
}

const HistoryTaskTable: React.FC<HistoryTableProps> = (props) => {
  const { gameInfo } = props
  const isMounted = useIsMounted()
  const { address } = useAccount()

  const [historyList, setHistoryList] = useState<Record<string, any>[]>([])

  const { run: queryBusinessTaskList } = useRequest(businessTaskList, {
    manual: true,
    onSuccess: ({ data }) => {
      console.log(data)
      setHistoryList(data)
    }
  })

  useEffect(() => {
    if (address) {
      // TODO: 请求 history 列表数据
      queryBusinessTaskList(address, 'off')
    }
  }, [address])

  const isEmptyContent = useMemo(() => {
    return isMounted && isEmpty(historyList)
  }, [historyList])

  return <Box className={styles.historyBox}>
    {
      isEmptyContent ?
        <Box className={styles.emptyList}>
          <Box className={styles.emptyIllustration}>
            <Image src="/empty_trialing.png" layout="fill" />
          </Box>
          <Typography>Oh, there is no any task history yet.</Typography>
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
                Total consumption
              </TableCell>
              <TableCell className={styles.tableHeaderCell}>
                Launch time
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              historyList.map((item, key) => <TableRow key={key} className={styles.tableRow}>
                {/* TODO: 跳转至游戏详情页 */}
                <TableCell className={styles.tableBodyCell}>
                  <a href={`/game/${gameInfo?.game_id}?task_id=${item?.task_id}`} target="_blank" rel="noreferrer">
                    {item?.task_id.split('-')[0]}
                  </a>
                </TableCell>
                <TableCell className={styles.tableBodyCell} sx={{ maxWidth: "30rem", paddingRight: '1rem' }}>
                  {item?.description}
                </TableCell>
                <TableCell className={styles.tableBodyCell}>{item?.total - item?.balance} {item?.token_symbol}</TableCell>
                <TableCell className={styles.tableBodyCell}>{item?.total} {item?.token_symbol}</TableCell>
                <TableCell className={styles.tableBodyCell}>
                  {dateFormat("YYYY-mm-dd HH:MM", new Date(parseInt(item?.time) * 1000))}
                </TableCell>
              </TableRow>)
            }
          </TableBody>
        </Table>
    }
  </Box>
}

export default HistoryTaskTable