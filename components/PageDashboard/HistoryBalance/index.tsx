import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { useIsMounted } from "hooks/useIsMounted";
import { isEmpty } from "lodash";
import React, { useEffect, useMemo, useState } from "react";
import styles from './styles.module.scss'
import Image from "next/image";
import { useAccount } from "wagmi";
import { dateFormat } from "util/format";
import { useRequest } from "ahooks";
import { balanceChangeRecordList } from '../../../services/home'

interface HistoryBalanceProps {
}

const HistoryBalanceTable: React.FC<HistoryBalanceProps> = (props) => {
  const isMounted = useIsMounted()
  const { address } = useAccount()

  const [historyList, setHistoryList] = useState<Record<string, any>[]>([ ])

  const { run: queryBalanceChangeRecord } = useRequest(balanceChangeRecordList, {
    manual: true,
    onSuccess: ({ data }) => {
      setHistoryList(data)
    }
  })

  useEffect(() => {
    if (address) {
      // TODO: 请求 history 列表数据
      queryBalanceChangeRecord(address)
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
                Token
              </TableCell>
              <TableCell className={styles.tableHeaderCell}>
                Amount
              </TableCell>
              <TableCell className={styles.tableHeaderCell}>
                Action
              </TableCell>
              <TableCell className={styles.tableHeaderCell}>
                Time
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              historyList.map((item, key) => <TableRow key={key} className={styles.tableRow}>
                <TableCell className={styles.tableBodyCell} >
                  {item?.token_symbol}
                </TableCell>
                <TableCell className={styles.tableBodyCell}>{item?.change}</TableCell>
                <TableCell className={styles.tableBodyCell}>
                  {
                    item?.task_id ?
                      <>Transfer in #{item?.task_id}</>
                      : "Deposit"
                  }
                </TableCell>
                <TableCell className={styles.tableBodyCell}>
                  {dateFormat("YYYY-mm-dd", new Date(parseInt(item?.timestamp) * 1000))}
                </TableCell>
              </TableRow>)
            }
          </TableBody>
        </Table>
    }
  </Box>
}

export default HistoryBalanceTable
