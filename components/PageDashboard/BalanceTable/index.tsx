import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { useIsMounted } from "hooks/useIsMounted";
import { isEmpty } from "lodash";
import React, { useMemo } from "react";
import styles from './styles.module.scss'
import Image from "next/image";

interface BalanceTableProps {
  balanceList: Record<string, any>[]
  isLoading?: boolean
}

const BalanceTable: React.FC<BalanceTableProps> = (props) => {
  const { balanceList, isLoading = false } = props
  const isMounted = useIsMounted()


  const iconMap = (type: string) => {
    switch (type) {
      case 'USDT':
        return '/usdt_logo_circle.png'
      // TODO: 默认返回 NFT icon 图片地址
      default:
        return '/nft_logo.png'
    }
  }

  const isEmptyContent = useMemo(() => {
    return isMounted && !isLoading && isEmpty(balanceList)
  }, [balanceList, isLoading])

  return <Box className={styles.balanceBox}>
    {
      isEmptyContent ?
        <Box className={styles.emptyList}>
          <Box className={styles.emptyIllustration}>
            <Image src="/empty_trialing.png" layout="fill" />
          </Box>
          <Typography>Oh, there is no any token balance yet.</Typography>
        </Box>
        :
        <Table>
          <TableHead>
            <TableRow className={styles.tableHeaderRow}>
              <TableCell className={styles.tableHeaderCell}>
                Token
              </TableCell>
              <TableCell className={styles.tableHeaderCell}>
                Balance
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              balanceList.map((item, key) => <TableRow key={key} className={styles.tableRow}>
                <TableCell className={styles.tableBodyCell}>
                  <Box className={styles.tokenInfo}>
                    <Box className={styles.iconBox}>
                      <Image src={iconMap(item?.token)} layout="fill" />
                    </Box>
                    {item?.token}
                  </Box>
                </TableCell>
                <TableCell className={styles.tableBodyCell}>{item?.balance}</TableCell>
              </TableRow>)
            }
          </TableBody>
        </Table>
    }
  </Box>
}

export default BalanceTable