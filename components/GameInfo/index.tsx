import { Box, IconButton, SvgIcon, Typography, useMediaQuery } from '@mui/material'
import { Stack } from '@mui/material'
import Image from 'next/image'
import React, { useState } from 'react'
import styles from './styles.module.scss'
import TwitterIcon from '@mui/icons-material/Twitter';
import TelegramIcon from '@mui/icons-material/Telegram';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { KeyboardDoubleArrowDown, SportsRugbySharp } from '@mui/icons-material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import classname from 'classnames/bind'

const cx = classname.bind(styles)

interface GameInfoProps {
  gameInfo: Record<string, any>,
  timestamp: number
}

const GameInfo: React.FC<GameInfoProps> = (props) => {
  const { gameInfo = {}, timestamp } = props
  const isMobileSize = useMediaQuery('(max-width: 750px)')
  const [showMoreDesc, setShowMoreDesc] = useState<boolean>(false)
  const [showMoreDescPC, setShowMoreDescPC] = useState<boolean>(false)

  const linkToStrategy = () => {
    window.open(gameInfo?.strategy)
  }

  return <Box className={styles.gameinfoBox}>
    {
      isMobileSize ?
        <Box className={styles.mobileBox}>
          <Box className={styles.mobileHeader}>
            <Box className={styles.imageCover}>
              {gameInfo.logo &&
                <Image
                  src={gameInfo.logo}
                  layout='fill'
                  // loader={({ src }) => src}
                  loader={({ src }) => `${src}?timestamp=${timestamp}`}
                />}
            </Box>
            <Stack direction="row" className={styles.socialList}>
              {
                gameInfo?.website && <a href={gameInfo.website} target="_blank" rel="noreferrer">
                  <IconButton disableRipple sx={{ backgroundColor: '#e8e8e8' }}>
                    <svg t="1665633274437" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3488" width="48" height="48"><path d="M946.5 505L534.6 93.4c-12.5-12.5-32.7-12.5-45.2 0L77.5 505c-12 12-18.8 28.3-18.8 45.3 0 35.3 28.7 64 64 64h43.4V908c0 17.7 14.3 32 32 32H448V716h112v224h265.9c17.7 0 32-14.3 32-32V614.3h43.4c17 0 33.3-6.7 45.3-18.8 24.9-25 24.9-65.5-0.1-90.5z" p-id="3489" fill="#222222"></path></svg>
                  </IconButton>
                </a>
              }
              {
                gameInfo?.twitter && <a href={gameInfo.twitter} target="_blank" rel="noreferrer">
                  <IconButton disableRipple>
                    <TwitterIcon sx={{ color: '#000', fontSize: '1.5rem' }} />
                  </IconButton>
                </a>
              }
              {
                gameInfo?.discord && <a href={gameInfo?.discord} target="_blank" rel="noreferrer">
                  <IconButton disableRipple>
                    <svg t="1665632564305" viewBox="0 0 1280 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2401" width="48" height="48">
                      <path d="M1049.062 139.672a3 3 0 0 0-1.528-1.4A970.13 970.13 0 0 0 808.162 64.06a3.632 3.632 0 0 0-3.846 1.82 674.922 674.922 0 0 0-29.8 61.2 895.696 895.696 0 0 0-268.852 0 619.082 619.082 0 0 0-30.27-61.2 3.78 3.78 0 0 0-3.848-1.82 967.378 967.378 0 0 0-239.376 74.214 3.424 3.424 0 0 0-1.576 1.352C78.136 367.302 36.372 589.38 56.86 808.708a4.032 4.032 0 0 0 1.53 2.75 975.332 975.332 0 0 0 293.65 148.378 3.8 3.8 0 0 0 4.126-1.352A696.4 696.4 0 0 0 416.24 860.8a3.72 3.72 0 0 0-2.038-5.176 642.346 642.346 0 0 1-91.736-43.706 3.77 3.77 0 0 1-0.37-6.252 502.094 502.094 0 0 0 18.218-14.274 3.638 3.638 0 0 1 3.8-0.512c192.458 87.834 400.82 87.834 591 0a3.624 3.624 0 0 1 3.848 0.466 469.066 469.066 0 0 0 18.264 14.32 3.768 3.768 0 0 1-0.324 6.252 602.814 602.814 0 0 1-91.78 43.66 3.75 3.75 0 0 0-2 5.222 782.11 782.11 0 0 0 60.028 97.63 3.728 3.728 0 0 0 4.126 1.4A972.096 972.096 0 0 0 1221.4 811.458a3.764 3.764 0 0 0 1.53-2.704c24.528-253.566-41.064-473.824-173.868-669.082zM444.982 675.16c-57.944 0-105.688-53.174-105.688-118.478s46.818-118.482 105.688-118.482c59.33 0 106.612 53.64 105.686 118.478 0 65.308-46.82 118.482-105.686 118.482z m390.76 0c-57.942 0-105.686-53.174-105.686-118.478s46.818-118.482 105.686-118.482c59.334 0 106.614 53.64 105.688 118.478 0 65.308-46.354 118.482-105.688 118.482z" p-id="2402" fill="#000"></path>
                    </svg>
                  </IconButton>
                </a>
              }
              {
                gameInfo?.telegram && <a href={gameInfo?.telegram} target="_blank" rel="noreferrer">
                  <IconButton disableRipple>
                    <TelegramIcon sx={{ color: '#000', fontSize: '1.7rem' }} />
                  </IconButton>
                </a>
              }
            </Stack>
          </Box>
          <Box className={styles.gameTitle}>
            <Typography variant='h3'>{gameInfo?.name}</Typography>
            <Box className={styles.tagList}>
              {
                gameInfo?.types?.map((item: string, index: number) => <Box key={index} className={styles.tagItem}>{item}</Box>)
              }
              {
                gameInfo?.platforms?.map((item: string, index: number) => <Box key={index} className={styles.platformTagItem}>{item}</Box>)
              }
            </Box>
          </Box>
          <Box className={styles.gameDescBox}>
            <Typography className={cx({
              gameDesc: true,
              gameDescTwoLine: !showMoreDesc
            })}>
              {gameInfo?.description}
              <Box className={styles.showMoreBtn} component="span" onClick={() => setShowMoreDesc(!showMoreDesc)}>
                {
                  showMoreDesc &&
                  <> &nbsp;&nbsp; less <KeyboardArrowUpIcon sx={{ cursor: 'pointer' }} /></>
                }
              </Box>
            </Typography>
            {
              !showMoreDesc && <KeyboardArrowDownIcon
                sx={{ cursor: 'pointer' }}
                onClick={() => setShowMoreDesc(!showMoreDesc)} />
            }
          </Box>
        </Box>
        :
        <>
          <Box className={styles.gameCover}>
            {gameInfo.logo &&
              <Image
                src={gameInfo.logo}
                layout='fill'
                loader={({ src }) => `${src}?timestamp=${timestamp}`}
              />}
          </Box>
          <Box className={styles.infoBox}>
            <Box className={styles.infoHeader}>
              <Typography variant='h3'>{gameInfo?.name}</Typography>
              <Stack direction="row" className={styles.socialList}>
                {
                  gameInfo?.website && <a href={gameInfo.website} target="_blank" rel="noreferrer">
                    <IconButton disableRipple sx={{ backgroundColor: '#e8e8e8' }}>
                      <svg t="1665633274437" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3488" width="48" height="48"><path d="M946.5 505L534.6 93.4c-12.5-12.5-32.7-12.5-45.2 0L77.5 505c-12 12-18.8 28.3-18.8 45.3 0 35.3 28.7 64 64 64h43.4V908c0 17.7 14.3 32 32 32H448V716h112v224h265.9c17.7 0 32-14.3 32-32V614.3h43.4c17 0 33.3-6.7 45.3-18.8 24.9-25 24.9-65.5-0.1-90.5z" p-id="3489" fill="#222222"></path></svg>
                    </IconButton>
                  </a>
                }
                {
                  gameInfo?.twitter && <a href={gameInfo.twitter} target="_blank" rel="noreferrer">
                    <IconButton disableRipple>
                      <TwitterIcon sx={{ color: '#4A99E9', fontSize: '1.6rem' }} />
                    </IconButton>
                  </a>
                }
                {
                  gameInfo?.discord && <a href={gameInfo?.discord} target="_blank" rel="noreferrer">
                    <IconButton disableRipple>
                      <svg t="1665632564305" viewBox="0 0 1280 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2401" width="48" height="48">
                        <path d="M1049.062 139.672a3 3 0 0 0-1.528-1.4A970.13 970.13 0 0 0 808.162 64.06a3.632 3.632 0 0 0-3.846 1.82 674.922 674.922 0 0 0-29.8 61.2 895.696 895.696 0 0 0-268.852 0 619.082 619.082 0 0 0-30.27-61.2 3.78 3.78 0 0 0-3.848-1.82 967.378 967.378 0 0 0-239.376 74.214 3.424 3.424 0 0 0-1.576 1.352C78.136 367.302 36.372 589.38 56.86 808.708a4.032 4.032 0 0 0 1.53 2.75 975.332 975.332 0 0 0 293.65 148.378 3.8 3.8 0 0 0 4.126-1.352A696.4 696.4 0 0 0 416.24 860.8a3.72 3.72 0 0 0-2.038-5.176 642.346 642.346 0 0 1-91.736-43.706 3.77 3.77 0 0 1-0.37-6.252 502.094 502.094 0 0 0 18.218-14.274 3.638 3.638 0 0 1 3.8-0.512c192.458 87.834 400.82 87.834 591 0a3.624 3.624 0 0 1 3.848 0.466 469.066 469.066 0 0 0 18.264 14.32 3.768 3.768 0 0 1-0.324 6.252 602.814 602.814 0 0 1-91.78 43.66 3.75 3.75 0 0 0-2 5.222 782.11 782.11 0 0 0 60.028 97.63 3.728 3.728 0 0 0 4.126 1.4A972.096 972.096 0 0 0 1221.4 811.458a3.764 3.764 0 0 0 1.53-2.704c24.528-253.566-41.064-473.824-173.868-669.082zM444.982 675.16c-57.944 0-105.688-53.174-105.688-118.478s46.818-118.482 105.688-118.482c59.33 0 106.612 53.64 105.686 118.478 0 65.308-46.82 118.482-105.686 118.482z m390.76 0c-57.942 0-105.686-53.174-105.686-118.478s46.818-118.482 105.686-118.482c59.334 0 106.614 53.64 105.688 118.478 0 65.308-46.354 118.482-105.688 118.482z" p-id="2402" fill="#8F9DF8"></path>
                      </svg>
                    </IconButton>
                  </a>
                }
                {
                  gameInfo?.telegram && <a href={gameInfo?.telegram} target="_blank" rel="noreferrer">
                    <IconButton disableRipple>
                      <TelegramIcon sx={{ color: '#54A3DB', fontSize: '1.6rem' }} />
                    </IconButton>
                  </a>
                }
              </Stack>
            </Box>
            <Box className={styles.tagList}>
              {
                gameInfo?.types?.map((item: string, index: number) => <Box key={index} className={styles.tagItem}>{item}</Box>)
              }
              {
                gameInfo?.platforms?.map((item: string, index: number) => <Box key={index} className={styles.platformTagItem}>{item}</Box>)
              }
            </Box>
            <Box className={styles.gameDescBox}>
              <Box className={styles.descBox}>
                <Typography className={cx({
                  gameDesc: true,
                  gameDescTwoLine: !showMoreDescPC
                })}>{gameInfo.description}</Typography>
                <Box className={styles.showMoreDescBtnPC} onClick={() => setShowMoreDescPC(!showMoreDescPC)}>
                  {
                    showMoreDescPC ?
                      <>less <KeyboardArrowUpIcon /></> :
                      <>more <KeyboardArrowDownIcon /></>
                  }
                </Box>
              </Box>
              {/* <Box className={styles.strategyBtn} onClick={linkToStrategy}>Workthrough</Box> */}
            </Box>
          </Box>
        </>
    }
  </Box>
}

export default GameInfo