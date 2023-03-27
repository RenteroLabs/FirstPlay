import { Box, Typography, useMediaQuery } from '@mui/material'
import { GetStaticProps, GetStaticPropsContext, NextPage } from 'next'
import React, { ReactElement, useEffect, useState } from 'react'
import Image from 'next/image'
import styles from '../styles/games.module.scss'
import Layout from '@/components/Layout'
import { NextPageWithLayout } from './_app'
import Head from 'next/head'
import HotGameCard from '@/components/HotGameCard'


const gameList = [
  {
    "game_id": "e123a78e-bd4b-4165-b815-1ea67c4cdd30",
    "name": "StepN",
    "image": "  https://rentero-resource.s3.ap-east-1.amazonaws.com/firstplay/image/StepN.jpg",
    "cover": "cover",
    "rewards": "Coming soon",
    "platforms": [
      "Android",
      "iOS"
    ],
    "game_types": [
      "M2E",
      "P2E"
    ],
    "game_status": [
      "Popular"
    ],
    "game_chains": [
      {
        "chain_id": 56,
        "contract": ""
      }
    ]
  },
  {
    "game_id": "e6fa7986-bcf7-4240-aefe-1df01704ac26",
    "name": "Axie Infinity",
    "image": "  https://rentero-resource.s3.ap-east-1.amazonaws.com/firstplay/image/Axie%20Infinity.jpg",
    "cover": "cover",
    "rewards": "Coming soon",
    "platforms": [
      "Android",
      "iOS",
      "Windows"
    ],
    "game_types": [
      "P2E"
    ],
    "game_status": [
      "Popular"
    ],
    "game_chains": [
      {
        "chain_id": 1,
        "contract": ""
      }
    ]
  },
  {
    "game_id": "d91bdf39-9849-4db6-84a1-9c6cc75cbde6",
    "name": "The Sandbox",
    "image": "https://rentero-resource.s3.ap-east-1.amazonaws.com/firstplay/image/The+Sandbox.jpg",
    "cover": "",
    "rewards": "",
    "platforms": [
      "Android",
      "iOS",
      "Windows"
    ],
    "game_types": [
      "RPG"
    ],
    "game_status": [
      "Popular"
    ],
    "game_chains": [
      {
        "chain_id": 1,
        "contract": ""
      }
    ]
  },
  {
    "game_id": "1ab600d9-a37e-408d-a0bc-8efd656ab304",
    "name": "Illuvium",
    "image": "https://rentero-resource.s3.ap-east-1.amazonaws.com/firstplay/image/Illuvium.jpg",
    "cover": "",
    "rewards": "",
    "platforms": [
      "Windows"
    ],
    "game_types": [
      "RPG"
    ],
    "game_status": [
      "Popular"
    ],
    "game_chains": [
      {
        "chain_id": 1,
        "contract": ""
      }
    ]
  },
  {
    "game_id": "59a7ab18-702c-46c0-855e-156b3736eb9c",
    "name": "Gods Unchained",
    "image": "  https://rentero-resource.s3.ap-east-1.amazonaws.com/firstplay/image/Gods-Unchained.jpg",
    "cover": "cover",
    "rewards": "Coming soon",
    "platforms": [
      "Web"
    ],
    "game_types": [
      "CARD"
    ],
    "game_status": [
      "Popular"
    ],
    "game_chains": [
      {
        "chain_id": 1,
        "contract": ""
      }
    ]
  },
  {
    "game_id": "1157fa8d-a5f0-4425-8ba9-eb2e23bb0694",
    "name": "League of Kingdoms",
    "image": "https://rentero-resource.s3.ap-east-1.amazonaws.com/firstplay/image/League+of+Kingdoms.jpg",
    "cover": "",
    "rewards": "",
    "platforms": [
      "Android",
      "iOS",
      "Windows"
    ],
    "game_types": [
      "MMO"
    ],
    "game_status": [
      "Popular"
    ],
    "game_chains": [
      {
        "chain_id": 1,
        "contract": ""
      }
    ]
  },
  {
    "game_id": "a6b7d4e4-4c4e-4d3c-bf84-d1e8c15d3f6a",
    "name": "Guild of Guardians",
    "image": "https://rentero-resource.s3.ap-east-1.amazonaws.com/firstplay/image/GuildOfGuardians.jpg",
    "cover": "",
    "rewards": "",
    "platforms": [
      "Android",
      "iOS"
    ],
    "game_types": [
      "RPG"
    ],
    "game_status": [
      "Popular"
    ],
    "game_chains": [
      {
        "chain_id": 1,
        "contract": ""
      }
    ]
  },
  {
    "game_id": "2bc3d3e6-8d38-4d08-9e9c-3aee3f2c2b1e",
    "name": "DeRace",
    "image": "https://rentero-resource.s3.ap-east-1.amazonaws.com/firstplay/image/DeRace.jpg",
    "cover": "",
    "rewards": "",
    "platforms": [
      "Web"
    ],
    "game_types": [
      "SPORTS",
      "RACING"
    ],
    "game_status": [
      "Popular"
    ],
    "game_chains": [
      {
        "chain_id": 137,
        "contract": ""
      }
    ]
  },
  {
    "game_id": "55211257-e93a-4439-9b4c-4e9b6f26167d",
    "name": "Splinterlands",
    "image": "  https://rentero-resource.s3.ap-east-1.amazonaws.com/firstplay/image/Splinterlands.jpg",
    "cover": "cover",
    "rewards": "Coming soon",
    "platforms": [
      "Web"
    ],
    "game_types": [
      "CARD"
    ],
    "game_status": [
      "Popular"
    ],
    "game_chains": [
      {
        "chain_id": 1,
        "contract": ""
      }
    ]
  },
  {
    "game_id": "e47c1d10-2b84-4f3e-8b23-0e40c4e4ab4c",
    "name": "Era7",
    "image": "https://rentero-resource.s3.ap-east-1.amazonaws.com/firstplay/image/Era7.jpg",
    "cover": "",
    "rewards": "",
    "platforms": [
      "Web"
    ],
    "game_types": [
      "TCG"
    ],
    "game_status": [
      "Popular"
    ],
    "game_chains": [
      {
        "chain_id": 56,
        "contract": ""
      }
    ]
  },
  {
    "game_id": "dc076399-122c-403b-8ad8-b3ef5d9d9d98",
    "name": "Aavegotchi",
    "image": "https://rentero-resource.s3.ap-east-1.amazonaws.com/firstplay/image/Aavegotchi.jpg",
    "cover": "",
    "rewards": "",
    "platforms": [
      "Windows"
    ],
    "game_types": [
      "M2E"
    ],
    "game_status": [
      "Popular"
    ],
    "game_chains": [
      {
        "chain_id": 137,
        "contract": ""
      }
    ]
  },
  {
    "game_id": "8c7a0a0a-27e7-4d2a-9e2f-9d9a7a93e23c",
    "name": "Rebel Bots",
    "image": "https://rentero-resource.s3.ap-east-1.amazonaws.com/firstplay/image/Rebel Bots.jpg",
    "cover": "",
    "rewards": "",
    "platforms": [
      "Android",
      "iOS",
      "Windows"
    ],
    "game_types": [
      "CARD",
      "MMO",
      "SOCIAL-FI"
    ],
    "game_status": [
      "Popular"
    ],
    "game_chains": [
      {
        "chain_id": 137,
        "contract": ""
      }
    ]
  },
  {
    "game_id": "82224e1c-4e4b-4d5c-ba5d-4f46f7cfb514",
    "name": "Aurory",
    "image": "https://rentero-resource.s3.ap-east-1.amazonaws.com/firstplay/image/Aurory.jpg",
    "cover": "",
    "rewards": "",
    "platforms": [
      "Android",
      "iOS",
      "Windows"
    ],
    "game_types": [
      "JRPG"
    ],
    "game_status": [
      "Popular"
    ],
    "game_chains": [
      {
        "chain_id": 1,
        "contract": ""
      }
    ]
  },
  {
    "game_id": "57e9e34f-342b-4227-a48f-cb9455534820",
    "name": "SidusHeroes",
    "image": "https://rentero-resource.s3.ap-east-1.amazonaws.com/firstplay/image/SIDUS.jpg",
    "cover": "",
    "rewards": "",
    "platforms": [
      "Android",
      "iOS",
      "Windows"
    ],
    "game_types": [
      "MMORPG"
    ],
    "game_status": [
      "Popular"
    ],
    "game_chains": [
      {
        "chain_id": 1,
        "contract": ""
      }
    ]
  },
  {
    "game_id": "9714e4fc-bd7e-434e-9f34-f421a3acd04c",
    "name": "Thetan Arena",
    "image": "https://rentero-resource.s3.ap-east-1.amazonaws.com/firstplay/image/Thetan Arena.jpg",
    "cover": "",
    "rewards": "",
    "platforms": [
      "Android",
      "iOS",
      "Windows"
    ],
    "game_types": [
      "MOBA"
    ],
    "game_status": [
      "Popular"
    ],
    "game_chains": [
      {
        "chain_id": 56,
        "contract": ""
      }
    ]
  }
]

// 游戏集合页
const Games: NextPageWithLayout = () => {
  const isMobileSize = useMediaQuery("(max-width: 600px)")


  // TODO: 请求数据逻辑

  // TODO: 分页逻辑

  // TODO: 移动端自动加载数据逻辑

  return <Box className={styles.games}>
    <Head>
      <title>Games | FirstPlay</title>
      <meta name="description" content="A blockchain game platform where you discover new games and try game NFTs for free" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Box className={styles.gamesBox}>
      <Typography variant='h2'>Hot Games {!isMobileSize && `> ALL`}</Typography>
      <Box className={styles.gameList}>
        {
          gameList.map((item, index) =>
            <HotGameCard gameInfo={item} key={index} />)
        }
      </Box>
      
    </Box>
  </Box>
}

Games.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Games


export const getStaticProps: GetStaticProps = async ({ locale }: GetStaticPropsContext) => {
  return {
    props: {
      // 获取国际化文案
      messages: (await import(`../i18n/${locale}.json`)).default
    }
  }
}