
import { Box, Divider, Drawer, IconButton, Stack, Typography } from '@mui/material'
import React, { useMemo } from 'react'
import styles from './style.module.scss'
import Image from 'next/image'
import CloseIcon from '@mui/icons-material/Close';

interface GameNFTDetailProps {
  showDrawer: boolean
  setShowDrawer: (arg: boolean) => any
}

const GameNFTDetail: React.FC<GameNFTDetailProps> = (props) => {
  const { showDrawer, setShowDrawer } = props

  // 根据状态判断返回不同文案
  const trialBtnText = useMemo(() => {

    return 'Trial'
  }, [])

  return <Drawer
    anchor="bottom"
    open={showDrawer}
    onClose={() => setShowDrawer(false)}
  >
    <Box className={styles.drawerBox}>
      <Box className={styles.contentBox}>
        <Box className={styles.infoBox}>
          <Box className={styles.infoLeft}>
            <Box className={styles.nftCover}>
              {/* TODO: 判断当前试玩 package 包含 NFT 数量 */}
              <Box className={styles.nftCoverType1}>
                <Image src="https://tva1.sinaimg.cn/large/e6c9d24egy1h3yth290wij20690693yk.jpg" layout="fill" />
              </Box>
            </Box>
            <Box className={styles.nftDetail}>
              <Typography variant='h3'>Details</Typography>
              <Stack>
                <Box className={styles.detailItem}>
                  <Box className={styles.detailKey}>Blockchain</Box>
                  <Box className={styles.detailValue}>Polygon</Box>
                </Box>
                <Box className={styles.detailItem}>
                  <Box className={styles.detailKey}>Contract Address</Box>
                  <Box className={styles.detailValue}></Box>
                </Box>
                <Box className={styles.detailItem}>
                  <Box className={styles.detailKey}>Token ID</Box>
                  <Box className={styles.detailValue}>2049</Box>
                </Box>
                <Box className={styles.detailItem}>
                  <Box className={styles.detailKey}>Token Standard</Box>
                  <Box className={styles.detailValue}></Box>
                </Box>
              </Stack>
            </Box>
          </Box>
          <Box className={styles.infoRight}>
            <Box className={styles.nftInfo}>
              <Typography variant='h4'>CollectionName</Typography>
              <Typography variant='h3'>#2049</Typography>
              <Divider />
              <Box className={styles.trialInfo}>
                <Box className={styles.trialKey}>Trial Period</Box>
                <Box className={styles.trialValue}>7 Days</Box>
              </Box>
            </Box>
            <Box className={styles.metaList}>
              <Typography variant='h3'>Status</Typography>
              <Stack className={styles.statusList}>
                <Typography variant='h4'>#2049</Typography>
                <Box className={styles.statusItem}>
                  <Box className={styles.statusKey}>key1</Box>
                  <Box className={styles.statusValue}>value1</Box>
                </Box>
                <Box className={styles.statusItem}>
                  <Box className={styles.statusKey}>key1</Box>
                  <Box className={styles.statusValue}>value1</Box>
                </Box>
                <Box className={styles.statusItem}>
                  <Box className={styles.statusKey}>key1</Box>
                  <Box className={styles.statusValue}>value1</Box>
                </Box>
                <Box className={styles.statusItem}>
                  <Box className={styles.statusKey}>key1</Box>
                  <Box className={styles.statusValue}>value1</Box>
                </Box>
                <Box className={styles.statusItem}>
                  <Box className={styles.statusKey}>key1</Box>
                  <Box className={styles.statusValue}>value1</Box>
                </Box>
                <Box className={styles.statusItem}>
                  <Box className={styles.statusKey}>key1</Box>
                  <Box className={styles.statusValue}>value1</Box>
                </Box>
                <Box className={styles.statusItem}>
                  <Box className={styles.statusKey}>key1</Box>
                  <Box className={styles.statusValue}>value1</Box>
                </Box>
              </Stack>
            </Box>
          </Box>
        </Box>

      </Box>
      <IconButton className={styles.drawerCloseIcon} onClick={() => setShowDrawer(false)}>
        <CloseIcon />
      </IconButton>
      <Box className={styles.btnBox}>
        <Box className={styles.trialBtn}>{trialBtnText}</Box>
      </Box>
    </Box>
  </Drawer>
}

export default GameNFTDetail

