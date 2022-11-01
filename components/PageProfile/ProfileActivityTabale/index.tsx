
import { Box, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import styles from './styles.module.scss'

interface ProfileActivityTableProps {

}

const datasource: Record<string, any>[] = [{
  action: 'Trial',
  game: "Axe Game",
  item: "100",
  time: "2022-10-30 12:30",
  reward: "Buy NFT 10% discount",
  operate: ""
}, {
  action: 'Trial',
  game: "Axe Game",
  item: "100",
  time: "2022-10-30 12:30",
  reward: "Buy NFT 10% discount",
  operate: ""
}, {
  action: 'Trial',
  game: "Axe Game",
  item: "100",
  time: "2022-10-30 12:30",
  reward: "Buy NFT 10% discount",
  operate: ""
}, {
  action: 'Trial',
  game: "Axe Game",
  item: "100",
  time: "2022-10-30 12:30",
  reward: "Buy NFT 10% discount",
  operate: ""
}, {
  action: 'Trial',
  game: "Axe Game",
  item: "100",
  time: "2022-10-30 12:30",
  reward: "Buy NFT 10% discount",
  operate: ""
}, {
  action: 'Trial',
  game: "Axe Game",
  item: "100",
  time: "2022-10-30 12:30",
  reward: "Buy NFT 10% discount",
  operate: ""
},]

const ProfileActivityTable: React.FC<ProfileActivityTableProps> = (props) => {

  return <TableContainer component={Paper} className={styles.tableBox}>
    <Box>
      <Table >
        <TableHead>
          <TableRow>
            <TableCell className={styles.tableHeaderCell}>Action</TableCell>
            <TableCell className={styles.tableHeaderCell}>Game</TableCell>
            <TableCell className={styles.tableHeaderCell}>Item</TableCell>
            <TableCell className={styles.tableHeaderCell}>Time</TableCell>
            <TableCell className={styles.tableHeaderCell}>Reward</TableCell>
            <TableCell className={styles.tableHeaderCell}>Operate</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            datasource.map((item, index) => (
              <TableRow key={`${item.time}-${index}`}>
                <TableCell className={styles.tableBodyCell}>
                  {item.action}
                </TableCell>
                <TableCell className={styles.tableBodyCell}>
                  {item.game}
                </TableCell>
                <TableCell className={styles.tableBodyCell}>
                  {item.item}
                </TableCell>
                <TableCell className={styles.tableBodyCell}>
                  {item.time}
                </TableCell>
                <TableCell className={styles.tableBodyCell}>
                  {item.reward}
                </TableCell>
                <TableCell className={styles.tableBodyCell}>
                  {item.operate}
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </Box>

    <Box className={styles.paginationBox}>
      <Pagination count={3} variant="outlined" shape="rounded" />
    </Box>

  </TableContainer>
}

export default ProfileActivityTable