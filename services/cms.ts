import { CMS_TOKEN } from './../constants/index';
import qs from 'qs'

const CMS_BASE_URL = "https://cms.firstplay.app"


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