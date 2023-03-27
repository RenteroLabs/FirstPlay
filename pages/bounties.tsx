import Layout from "@/components/Layout";
import { Box, Typography } from "@mui/material";
import { GetStaticProps, GetStaticPropsContext } from "next";
import Head from "next/head";
import React, { ReactElement } from "react";
import { NextPageWithLayout } from "./_app";
import styles from '../styles/bounties.module.scss'
import { Tabs } from 'antd';
import RewardGameCard from "@/components/RewardGameCard";

enum TabEnum {
  ONGOING,
  ENDED
}

interface BountiesListPorps {
  bountiesList: Record<string, any>[]
}
const BountiesList: React.FC<BountiesListPorps> = (props) => {
  const { bountiesList } = props

  return <Box className={styles.bountiesList}>
    {
      bountiesList.map((item, index) => <RewardGameCard key={index} gameInfo={item} />)
    }
  </Box>
}

const dataList = [
  {
    "game_id": "e0e78df0-3db0-45b0-8b51-a6826cde3935",
    "name": "HatchyPocket",
    "image": "",
    "cover": "https://rentero-resource.s3.ap-east-1.amazonaws.com/firstplay/cover/HatchyPocket.jpg",
    "rewards": "$8 worth of NFTs",
    "platforms": [
      "Windows"
    ],
    "game_types": [
      "TCG"
    ],
    "game_status": [
      "Popular"
    ],
    "game_chains": [
      {
        "chain_id": 43114,
        "contract": ""
      }
    ]
  },
  {
    "game_id": "5ed9c320-7554-46d6-8c3c-ccd2c599419d",
    "name": "Blast Royale",
    "image": "",
    "cover": "https://rentero-resource.s3.ap-east-1.amazonaws.com/firstplay/cover/Blast+Royale.jpg",
    "rewards": "$2",
    "platforms": [
      "Android",
      "iOS"
    ],
    "game_types": [
      "FPS"
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
    "game_id": "bee1495f-6129-444b-b6d4-5e01af6e8e83",
    "name": "Panzerdogs",
    "image": "",
    "cover": "https://rentero-resource.s3.ap-east-1.amazonaws.com/firstplay/cover/Panzerdogs.jpg",
    "rewards": "$2",
    "platforms": [
      "Android",
      "iOS"
    ],
    "game_types": [
      "PVE",
      "PVP"
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
    "game_id": "0e6bce87-3d3b-4a01-918f-2b109d002fdf",
    "name": "World War 0x",
    "image": "",
    "cover": "https://rentero-resource.s3.ap-east-1.amazonaws.com/firstplay/cover/World+War+0x.jpg",
    "rewards": "$2",
    "platforms": [
      "Web"
    ],
    "game_types": [
      "FPS"
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
    "game_id": "97340489-888a-496c-8507-6501b128d52c",
    "name": "Mechaverse",
    "image": "",
    "cover": "https://rentero-resource.s3.ap-east-1.amazonaws.com/firstplay/cover/Mechaverse.jpg",
    "rewards": "$1",
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
    "game_id": "727bd4f1-d96a-44fd-bb24-31e623b54abb",
    "name": "Oil War",
    "image": "",
    "cover": "https://rentero-resource.s3.ap-east-1.amazonaws.com/firstplay/cover/Oil+War.jpg",
    "rewards": "$1",
    "platforms": [
      "Web",
      "Android",
      "iOS"
    ],
    "game_types": [
      "SIMULATION"
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
    "game_id": "c8914083-9033-474c-b8dd-26fae767345a",
    "name": "Dragon Master",
    "image": "",
    "cover": "https://rentero-resource.s3.ap-east-1.amazonaws.com/firstplay/cover/DragonMaster.jpg",
    "rewards": "$1.5 worth of $DMT",
    "platforms": [
      "Android",
      "iOS"
    ],
    "game_types": [
      "RTS"
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
    "game_id": "e1e2a80e-3690-4e4b-84ad-6a821f9a4ce4",
    "name": "VoxNET",
    "image": "",
    "cover": "https://rentero-resource.s3.ap-east-1.amazonaws.com/firstplay/cover/VoxNET.jpg",
    "rewards": "$2 + $1 worth of $VXON",
    "platforms": [
      "Web",
      "Windows"
    ],
    "game_types": [
      "FPS"
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
    "game_id": "a44c7a37-cc69-427d-899f-785c2ef9989a",
    "name": "Summoners Arena",
    "image": "",
    "cover": "https://rentero-resource.s3.ap-east-1.amazonaws.com/firstplay/cover/Summoners+Arena.jpg",
    "rewards": "1 Scholarship for 1 season",
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
        "chain_id": 56,
        "contract": ""
      }
    ]
  }
]

// Bounty 集合页
const Bounties: NextPageWithLayout = () => {

  return <Box className={styles.bounties}>
    <Head>
      <title>Bounties | FirstPlay</title>
      <meta name="description" content="A blockchain game platform where you discover new games and try game NFTs for free" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Box className={styles.bountiesBox}>
      <Typography variant="h2">Bounties</Typography>
      <Tabs
        items={[
          {
            label: 'Ongoing()',
            key: TabEnum.ONGOING as unknown as string,
            children: <BountiesList bountiesList={dataList} key={TabEnum.ONGOING} />
          }, {
            label: 'Ended()',
            key: TabEnum.ENDED as unknown as string,
            children: <BountiesList bountiesList={[]} key={TabEnum.ENDED} />
          }
        ]}
      />
    </Box>
  </Box>
}

Bounties.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Bounties

export const getStaticProps: GetStaticProps = async ({ locale }: GetStaticPropsContext) => {
  return {
    props: {
      // 获取国际化文案
      messages: (await import(`../i18n/${locale}.json`)).default
    }
  }
}