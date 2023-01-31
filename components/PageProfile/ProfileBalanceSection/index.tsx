import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography, useMediaQuery } from "@mui/material";
import { useRequest } from "ahooks";
import React, { useEffect, useState } from "react";
import { getProfileBalanceRecordList } from "services/home";
import { dateFormat } from "util/format";
import { useAccount } from "wagmi";
import styles from './styles.module.scss';
import Image from "next/image";
import { useIsMounted } from "hooks/useIsMounted";
import { isEmpty } from "lodash";


const MobileBalanceRecordItem: React.FC<{ recordItem: Record<string, any> }> = (props) => {
  const { recordItem } = props

  return <Box className={styles.mobileBalanceItem}>
    <Box className={styles.tokenLogo}>
      <Image src="/usdt_logo_circle.png" layout="fill" />
    </Box>
    <Box className={styles.tokenInfo}>
      <Typography className={styles.tokenSymbol}>{recordItem?.token_symbol}</Typography>
      <Typography className={styles.tokenName}>{recordItem?.token_name}</Typography>
    </Box>
    <Box className={styles.balanceInfo}>
      <Typography className={styles.balanceAction}>
        {
          Number(recordItem?.change) > 0 ?
            <>{`+${recordItem?.change} Reward (${recordItem?.game_name})`}</> :
            <>{`${recordItem?.change} Withdraw`}</>
        }
      </Typography>
      <Typography className={styles.timestamp}>{dateFormat("YYYY-mm-dd HH:MM", new Date(parseInt(recordItem?.timestamp) * 1000))}</Typography>
    </Box>
  </Box>
}


interface BalanceSectionProps {

}

const ProfileBalanceSection: React.FC<BalanceSectionProps> = (props) => {
  const { } = props

  const { address } = useAccount()
  const isMounted = useIsMounted()
  const is600Size = useMediaQuery("(max-width: 600px)")

  const [recordList, setRecordList] = useState<Record<string, any>[]>([])

  const { loading, run: queryProfileBalanceRecord } = useRequest(getProfileBalanceRecordList, {
    manual: true,
    onSuccess: ({ data }) => {
      console.log(data)
      setRecordList(data)
    }
  })

  useEffect(() => {
    if (address) {
      queryProfileBalanceRecord(address)
      // queryProfileBalanceRecord('0x68B826b34AFB960632a56d770ff89439C00b185e')
    }
  }, [address])

  return <Box className={styles.balanceBox}>
    {(loading || (!loading && !isEmpty(recordList))) &&
      <Table className={styles.tableBox}>
        <TableHead>
          <TableRow>
            <TableCell className={styles.tableHeaderCell}> Token </TableCell>
            <TableCell className={styles.tableHeaderCell}> Action </TableCell>
            <TableCell className={styles.tableHeaderCell}> Time </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            recordList.map((item, index) => {
              return <TableRow key={index}>
                <TableCell className={styles.tableBodyCell}>
                  <Box className={styles.tokenCell}>
                    <Box className={styles.iconBox}>
                      <Image src="/usdt_logo_circle.png" layout="fill" />
                    </Box>
                    <Box className={styles.tokenSymbol}>{item?.token_symbol}</Box>
                    <Box className={styles.tokenName}>{item?.token_name}</Box>
                  </Box>
                </TableCell>
                <TableCell className={styles.tableBodyCell}>
                  {/* {item?.change} */}
                  {
                    Number(item?.change) > 0 ?
                      <>{`+${item?.change} Reward (${item?.game_name})`}</> :
                      <>{`${item?.change} Withdraw`}</>
                  }
                </TableCell>
                <TableCell className={styles.tableBodyCell}>{dateFormat("YYYY-mm-dd HH:MM", new Date(parseInt(item?.timestamp) * 1000))}</TableCell>
              </TableRow>
            })
          }
        </TableBody>
      </Table>}

    {
      isMounted && is600Size &&
      recordList.map((item, index) =>
        <MobileBalanceRecordItem key={index} recordItem={item} />)
    }

    {/* 列表无数据 */}
    {
      !loading && isEmpty(recordList) &&
      <Box className={styles.emptyList}>
        <Box className={styles.emptyIllustration}>
          <Image src="/empty_trialing.png" layout="fill" />
        </Box>
        <Typography>Oh, there is no balance flow now.</Typography>
      </Box>
    }
  </Box>
}

export default ProfileBalanceSection