import qs from 'qs'

const CMS_BASE_URL = "https://cms.firstplay.app"
const CMS_TOKEN = process.env.NEXT_PUBLIC_CMS_TOKEN


interface CollectionParams {
  gameId: string
  user?: string,
}

// TODO: 当前暂时仅根据 GameUUID 搜索 攻略集合，不添加作者的分类搜索
export const getUserArticleCollection = async (params: CollectionParams) => {
  const { gameId } = params
  const query = qs.stringify({
    filters: {
      game_info: {
        GameUUID: {
          $eq: gameId
        }
      }
    },
    populate: {
      strategy_articles: {
        fields: ['ArticleTitle', 'ArticleName', 'id']
      }
    },
    pagination: {
      page: 1,
      pageSize: 1000, // 获取全量数据，理论上一个游戏返回一个 ArticleCollection 集合
    },
  }, {
    encodeValuesOnly: true
  })
  const data = await fetch(`${CMS_BASE_URL}/api/article-collections?${query}`, {
    headers: {
      "Authorization": `Bearer ${CMS_TOKEN}`
    }
  })

  return data.json()
}

// 根据 Collection Id 获取 Article Collection 数据信息
export const getArticleCollectionById = async (collectionId: string) => {
  const query = qs.stringify({
    filters: {
      CollectionId: {
        $eq: collectionId
      }
    },
    populate: {
      strategy_articles: {
        fields: ['ArticleTitle', 'ArticleName']
      },
      game_info: {
        fields: ['GameName']
      }
    },
  }, {
    encodeValuesOnly: true
  })

  const data = await fetch(`${CMS_BASE_URL}/api/article-collections?${query}`, {
    headers: {
      "Authorization": `Bearer ${CMS_TOKEN}`
    }
  })

  return data.json()
}

// 获取单篇文章攻略内容
export const getSingerStrategyArticle = async (articleId: string, localeType: string) => {
  const query = qs.stringify({
    filters: {
      id: {
        $eq: Number(articleId)
      },
    },
    populate: {
      StepList: true,
      localizations: {
        populate: ['StepList'],
        filters: {
          locale: localeType
        }
      }
    }
  }, {
    encodeValuesOnly: true
  })

  const data = await fetch(`${CMS_BASE_URL}/api/strategy-articles?${query}`, {
    headers: {
      "Authorization": `Bearer ${CMS_TOKEN}`
    }
  })
  return data.json()
}


// 获取首页配置参数数据
export const getHomeConfigData = async () => {
  const query = qs.stringify({
    populate: {
      article_collections: {
        populate: {
          strategy_articles: {
            fields: ['ArticleTitle', 'ArticleName']
          },
        }
      },
      WeekItems: {
        populate: '*'
      },
      BannerItems: {
        populate: '*'
      },
      activities: {
        populate: '*'
      },
      game_infos: {
        populate: '*'
      },
      tasks: {
        populate: [
          'game_info',
          'game_info.cover'
        ]
      }
    },
  }, {
    encodeValuesOnly: true
  })
  const data = await fetch(`${CMS_BASE_URL}/api/home-config?${query}`, {
    headers: {
      "Authorization": `Bearer ${CMS_TOKEN}`
    }
  })

  return data.json()
}


interface HotGameListParams {
  pageSize: number
  pageNum: number
}
// 获取 Hotgames 数据
export const getHotGameList = async (params: HotGameListParams) => {
  const { pageNum, pageSize } = params
  const query = qs.stringify({
    populate: '*',
    sort: ['id:desc'],
    pagination: {
      page: pageNum,
      pageSize: pageSize,
    }
  }, {
    encodeValuesOnly: true, // prettify URL
  })

  const data = await fetch(`${CMS_BASE_URL}/api/game-infos?${query}`, {
    headers: {
      "Authorization": `Bearer ${CMS_TOKEN}`
    }
  })

  return data.json()
}

interface GameBaseInfoParams {
  gameId: string,
  locale: string
}
// 获取单条游戏数据
export const getGameBaseInfo = async (params: GameBaseInfoParams) => {
  const { gameId, locale } = params

  const query = qs.stringify({
    publicationState: process.env.NEXT_PUBLIC_ENV === 'PRO' ? 'live' : 'preview',
    filters: {
      GameUUID: {
        $eq: gameId
      }
    },
    populate: {
      logo: true,
      background: true,
      pro_players: true,
      Videos: true,
      localizations: {
        filters: {
          locale: locale
        },
        populate: {
          logo: true,
          background: true,
          pro_players: true,
          Videos: true,
        }
      }
    },
  }, {
    encodeValuesOnly: true, // prettify URL
  })

  const data = await fetch(`${CMS_BASE_URL}/api/game-infos?${query}`, {
    headers: {
      "Authorization": `Bearer ${CMS_TOKEN}`
    }
  })

  const result: Record<string, any> = await data.json()
  const gameBase = result?.data[0]?.attributes

  let content
  if (locale === 'en-US') {
    content = gameBase
  } else {
    content = gameBase?.localizations?.data[0]?.attributes
  }

  return content
}







// TODO: 添加筛选条件 Activity status = on
interface ActivityListParasm {
  pageSize: number
  pageNum: number
}
// 获取 ActivityList 数据
export const getActivitiesList = async (params: ActivityListParasm) => {
  const { pageNum, pageSize } = params

  const query = qs.stringify({
    populate: '*',
    sort: ['id:desc'],
    pagination: {
      page: pageNum,
      pageSize: pageSize,
    }
  }, {
    encodeValuesOnly: true, // prettify URL
  })
  const data = await fetch(`${CMS_BASE_URL}/api/activities?${query}`, {
    headers: {
      "Authorization": `Bearer ${CMS_TOKEN}`
    }
  })

  return data.json()
}

// 获取游戏活动数据
interface ActivitiesByGameParams {
  gameId: string
  status: boolean
}
export const getActivitiesByGame = async (params: ActivitiesByGameParams) => {
  const { gameId, status } = params

  const query = qs.stringify({
    filters: {
      status: status,
      game_info: {
        GameUUID: {
          $eq: gameId
        }
      }
    },
    populate: ['game_info', 'image']
  }, {
    encodeValuesOnly: true, // prettify URL
  })
  const data = await fetch(`${CMS_BASE_URL}/api/activities?${query}`, {
    headers: {
      "Authorization": `Bearer ${CMS_TOKEN}`
    }
  })

  return data.json()
}

interface BountiesListParams {
  pageSize: number
  pageNum: number
  status: boolean
}
// 获取 Bounties 列表数据
export const getBountiesList = async (params: BountiesListParams) => {
  const { pageNum, pageSize, status } = params

  const query = qs.stringify({
    filters: {
      task_status: status,
    },
    // populate: {
    //   game_info: {
    //     fields: ['cover'],
    //     populate: '*'
    //   }
    // },
    populate: [
      'game_info',
      'game_info.cover'
    ],
    sort: ['id:desc'],
    pagination: {
      page: pageNum,
      pageSize: pageSize,
    }
  }, {
    encodeValuesOnly: true, // prettify URL
  })

  const data = await fetch(`${CMS_BASE_URL}/api/tasks?${query}`, {
    headers: {
      "Authorization": `Bearer ${CMS_TOKEN}`
    }
  })
  return data.json()
}

// 获取游戏 Bounties 数据
interface BountiesByGameParams {
  gameId: string
  status: boolean
  locale: string
}
export const getBountiesByGame = async (params: BountiesByGameParams) => {
  const { gameId, status, locale } = params

  const query = qs.stringify({
    // 生产环境使用 live，测试环境使用 preview
    publicationState: process.env.NEXT_PUBLIC_ENV === 'PRO' ? 'live' : 'preview',
    filters: {
      task_status: status,
      game_info: {
        GameUUID: {
          $eq: gameId
        }
      }
    },
    populate: {
      game_info: true,
      steps: {
        populate: ['StepButtonList']
      },
      form: true,
      localizations: {
        filters: {
          locale: locale
        },
        populate: {
          game_info: true,
          steps: {
            populate: ['StepButtonList']
          },
          form: true,
        }
      }
    },
  }, {
    encodeValuesOnly: true, // prettify URL
  })

  const data = await fetch(`${CMS_BASE_URL}/api/tasks?${query}`, {
    headers: {
      "Authorization": `Bearer ${CMS_TOKEN}`
    }
  })
  return data.json()
}


// 根据 task_ids 获取任务详情
interface BountiesByTaskIdsParams {
  taskIds: string[]
}

export const getBountiesByTaskIds = async (params: BountiesByTaskIdsParams) => {
  const { taskIds } = params
  const query = qs.stringify({
    filters: {
      task_id: {
        $in: taskIds
      }
    },
    populate: [
      'game_info',
      'game_info.logo'
    ],
  }, {
    encodeValuesOnly: true, // prettify URL
  })

  const data = await fetch(`${CMS_BASE_URL}/api/tasks?${query}`, {
    headers: {
      "Authorization": `Bearer ${CMS_TOKEN}`
    }
  })
  return data.json()
}



interface AllHotGameListParams {
  gameCount?: number
}
// 获取全部或指定数量的游戏数据
export const getAllHotGameList = async (params: AllHotGameListParams) => {
  const { gameCount = 10000 } = params
  const query = qs.stringify({
    fields: ['GameUUID', 'GameName'],
    populate: [
      'logo'
    ],
    sort: ['id:desc'],
    pagination: {
      page: 1,
      pageSize: gameCount,
    }
  }, {
    encodeValuesOnly: true, // prettify URL
  })

  const data = await fetch(`${CMS_BASE_URL}/api/game-infos?${query}`, {
    headers: {
      "Authorization": `Bearer ${CMS_TOKEN}`
    }
  })
  return data.json()
}

