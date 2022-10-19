---
title: '10 things that beginners must know before playing the game'
excerpt: ''
coverImage: '/assets/blog/hello-world/cover.jpg'
date: '2022-10-21'
author:
  name: Dawn
ogImage:
  url: '/assets/blog/hello-world/cover.jpg'
comment: '<iframe src="https://embed.0xecho.com.ipns.page?color-theme=light&desc=&has-h-padding=false&has-v-padding=false&modules=comment%2Clike%2Ctip&receiver=firstplay.bit&target_uri=https%3A%2F%2Ffirstplay.app%2Fstrategy%2FTen-Things-For-BigTime-Beginner" frameborder="0"></iframe>'
---

# 10 things that beginners must know before playing the game

<aside>
📌 本文档旨在说明游戏方如何接入 Rentero Protocol 租赁协议，以及必要的改造逻辑说明和指导
</aside>

Rentero Protocol 协议合约架构如下图所示，其包含了租借双方的租期管理、质押和赎回等核心功能。游戏接入方仅需要**识别、认可用户通过 Rentero Protocol 租赁的 NFT，可正常使用并获取收益**。

![RenteroProtocol.drawio.png](https://tva1.sinaimg.cn/large/008vxvgGly1h73njlzet6j316e0gq778.jpg)

## 一、 NFT 识别接入

### 1. 识别租赁 NFT

用户在登录游戏平台时，在识别展示用户正常持有的 NFTs 同时，需要通过 [Rentero SDK](https://www.npmjs.com/package/@rentero/sdk-js)，获取用户通过 Rentero Protocol 租赁的 NFTs 并加以识别展示。

`getRentNFTsByAddress`：支持获取用户租赁 NFTs，使用示例如下：

```tsx
import { RenteroNFT } from '@rentero/sdk-js'

const nftAddress = '0x80b4a4da97d676ee139bada2bf757b7f5afd0644'
const renterAddress = '0x431b4ca18e269fc7e1f5af49b9f4e2af683f6207'

// pass in the blockchain network and NFT contracts, instantiate the object
const renteroNFT = new RenteroNFT('ropsten', [nftAddress])

// query renter‘s NFTs
const result = await renteroNFT.getRentNFTsByAddress(renterAddress)

// result example
{
  leases: [
    {
      tokenId: '341',
      nftAddress: '0x80b4a4da97d676ee139bada2bf757b7f5afd0644',
      lender: '0x576687d59d191a9b20110fb3e126dbf27d8e42e0',
      expires: '1660638300'
    }
		...
  ]
}
```

_注：当前 SDK 仅返回用户租赁 NFT 的基本租约信息，展示所需的 NFT 元信息需由游戏方自行获取_

### 2. 获取租赁 NFT 过期时间

当用户在开始进行游戏前，需获取租赁 NFT 的过期时间，判断是否支持当前游戏回合以及即将到期提醒

`getRentInfoById`: 支持获取 NFT 租赁信息，使用示例如下：

```tsx
const nftAddress = '0x80b4a4da97d676ee139bada2bf757b7f5afd0644'
const tokenId = 132

// qurey rent info
const result = await renteroNFT.getRentInfoById(nftAddress, tokenId)

// result example
{
  lease: {
    renter: '0x431b4ca18e269fc7e1f5af49b9f4e2af683f6207',
    lender: '0x576687d59d191a9b20110fb3e126dbf27d8e42e0',
    expires: '1660638300'
  }
}
```

游戏平台需定期查询 NFT 租赁状态和过期时间

**特殊情况**

- 在极少数场景中，用户正在游戏回合中时，出租者提前违约赎回，会导致用户正在游戏中时失去 NFT 使用权限，游戏方需对此种情况进行处理

### 3. 租赁 NFT 收益获取结算

在产品功能层面，用户使用租赁 NFTs 产生收益需通正常持有 NFTs 产品收益的行为和结果保持一致。在计算和提现收益时，均需认可租户的钱包地址。不管是由游戏方定期结算打款还是由用户在游戏内主动提现收益，收益需要正常转至租户钱包地址。

★ 上述逻辑需由游戏方基于自身收益结算逻辑加以改造支持。

## 二、租赁协议接入

若 [Rentero Market](https://app.rentero.io) 的租赁市场不满足项目方的租赁需求，可通过 Rentero Protocol 的 SDK 自定义搭建项目方自己的租赁市场。此处项目方需前置完成第一部分：NFT 识别接入 工作。

### 1. 租赁 SDK 功能介绍

Rentero Protocol 的租赁能力集中在 `Rentero` 类，目前包含`lendNFT` 、`reLendNFT` 、`rentNFT`、`earlyReturn` 和 `redeemNFT` 等完备的租赁相关功能，项目方可按需使用，详细 API 见 [SDK 文档](https://www.npmjs.com/package/@rentero/sdk-js)。

**Rentero 类初始化**， 依赖两个参数配置

- singer： `ethers.Signer` 用于同合约的交互，签名交易
- config： 配置项，targetChain 指定链名称；renteroType 指定不同的 Rentero Market，代表不同的租赁模式，当前仅包含租金分期模式，后续会推出更多模式以支持多样租赁业务

```tsx
import { Rentero } from '@rentero/sdk-js'

const rentero = new Rentero(signer, {
  targetChain: 'bsctestnet', // current support chain 'mainnet' | 'rinkeby' | 'bsc' | 'bsctestnet'
  renteroType: 'installment',
})
```

### 2. 出租上架 NFT 流程

**2.1 上架 NFT**

```tsx
Rentero.lendNFT(
		nftAddress: string,
		tokenId: number,
		erc20Address: string,
		whitelist: string,
		deposit: BigNumber,
		dailyPrice: BigNumber,
		paymentCycle: number,
		minRentalDays: number,
		maxRentalDays: number) => Promise<any>
```

出借上架 NFT 接口包含较多参数配置，具体含义和使用推荐如下：

- whitelist：白名单地址，如果设置，将只有白名单地址用户才能租借当前 NFT。当前白名单只支持设置一个钱包地址，若无需设置白名单，需传入 Zero Address 地址：`0x0000000000000000000000000000000000000000`
- deposit：押金，当租约中，出借者违约时将押金赔偿给借用者。Rentero Market 当前押金金额设置为 1 天租金，项目方可根据自身业务需求自行设置押金金额
- minRentalDays：上架设置用户可租借的最小天数，出借者可设置的最小值：1（天）
- maxRentalDays：上架设置允许租户可租借的最大天数，出借者可设置的最大值：65535 （天）
- nftAddress：上架 NFT 的合约地址
- tokenId：上架 NFT 的编号 id
- erc20Address：支付租金代币的 ERC20 token 合约地址
- dailyPrice：租借 NFT 每天的单价
- paymentCycle：租金支付周期（天），每隔 x 天支付一次租金

![Lend NFT UI Example](https://tva1.sinaimg.cn/large/008vxvgGly1h73nqhqa47j30fk02qt8m.jpg)

Lend NFT UI Example

**2.2 更新 NFT 出租配置**

对于已上架且尚未被租赁的 NFT，可允许更新起出租配置信息。具体可使用 `Rentero.reLendNFT` 方法，参数同 lendNFT 方法一致。

**2.3 出租上架流程**

在调用 lend NFT 上架方法前，需判断当前出借的 NFT 是否已授权给 Market 合约，如果没有授权，需先让用户进行授权，否则将会因为没有转移 NFT 权限而中断回滚。

![](https://tva1.sinaimg.cn/large/008vxvgGly1h73o3gfrqqj30f80dpt99.jpg)

**2.4 使用示例**

```tsx
// lendNFT
const result = await rentero?.lendNFT(
  '0x317caEc5AFd5d43B205683318eC35ed8B063d131',
  573,
  '0x304af20ef7a8497aeed4a4a6ba4601988d5b11f6',
  '0x0000000000000000000000000000000000000000',
  ethers.utils.parseUnits('2.4', 18),
  ethers.utils.parseUnits('2.4', 18),
  5,
  1,
  365
)
console.log(result)
```

```tsx
// reLendNFT
const result = await rentero?.lendNFT(
  '0x317caEc5AFd5d43B205683318eC35ed8B063d131',
  573,
  '0x304af20ef7a8497aeed4a4a6ba4601988d5b11f6',
  '0x0000000000000000000000000000000000000000',
  ethers.utils.parseUnits('1.2', 18),
  ethers.utils.parseUnits('1.2', 18),
  3,
  1,
  365
)
console.log(result)
```

### 3. 租用 NFT 流程

租用者选择指定 NFT 后，填写租赁天数后，即可调用 `rentNFT` 方法进行租赁

**3.1 租用 NFT 方法**

```tsx
Rentero.rentNFT(contractAddress: string, tokenId: number, rentDays: number) => Promise<any>
```

**3.2 授权 ERC20 Token**

在进行租赁调用前，需判断当前用户是否已授权足额指定 ERC20 Token 租金给到 Market 合约，若无授权，将会在扣款租金动作因无权限而失败报错

![](https://tva1.sinaimg.cn/large/008vxvgGly1h73o0c3nbdj30eo02h3yd.jpg)

### 4. 违约操作流程

违约操作包括：

- 出租者违约提前赎回 NFT（若赎回 NFT 不是正在租借中，则是正常下架操作）；
- 租用者提前归还 NFT；

项目方可根据自身业务需求， 决定是否在自建租赁市场中提供相关违约操作能力。上述违约操作支持与否不影响主体的租赁业务流程。

租借双方有一方违约，违约方需向另一方支付违约金（即上述上架流程中的 deposit 押金），租赁协议提供方不会从违约金中抽取服务费。

**4.1** **租用者提前归还**

租用者提前归还 NFT ，协议会将租用者的押金转给出借者以作违约金，租赁关系终止，借用者结束 NFT 的使用权限， NFT 继续存在市场待租用

```tsx
Rentero.earlyReturn(contractAddress: string, tokenId: number) => Promise<any>
```

**4.2 出租者违约赎回**

出租者违约赎回 NFT，协议会先行扣除出租者对应数量的押金以转给租用者做违约金，租赁关系终止，借用者失去使用权限，NFT 下架市场，出租者赎回 NFT

```tsx
Rentero.redeemNFT(contractAddress: string, tokenId: number) => Promise<any>
```

如上所属，如果正常下架 NFT，执行 `redeemNFT` 方法即可，若是违约赎回，需让出租者先授权 ERC20 Token 给 Market 合约， Market 合约有权扣除押金金额给租用者，方可成功违约赎回。

![赎回](https://tva1.sinaimg.cn/large/008vxvgGly1h73o21akofj30ey01va9x.jpg)

### 5. 租赁订单数据获取

目前 RenteroNFT 类提供了基于钱包地址查询租赁 NFT 数据的相关接口，如果需要更为完整、丰富的搜索查询接口服务，可以调用的我们的 TheGraph 服务进行查询，详细使用文档见[Rentero TheGraph 服务介绍与使用](https://www.notion.so/Rentero-TheGraph-40f52a9bd8b4455d9ff8040b9192bba0)

### 6. 租赁协议佣金抽成

初期默认 Rentero Protocol 会从出租者的租金收益中收取 10% 收益，用来支付相关平台交易 gas 费用和后期租赁协议维护、迭代和升级成本。若部分项目方需从租赁协议中收取部分分成，同租赁协议方沟通协商确定后，可进行调整。

## 三、常见问题

### Q1: 项目方后端同学如何获取租赁 NFT 数据？

当前 SDK 主要服务于前端 DAPP 开发中的租赁数据获取，后端同学可通过我们的 TheGraph 服务来获取各链的所有租赁 NFT 数据信息，提供完备的搜索、查询功能，详细文档见[Rentero TheGraph 服务介绍与使用](https://www.notion.so/Rentero-TheGraph-40f52a9bd8b4455d9ff8040b9192bba0)。如果目前 SDK 中 RenteroNFT 类中包含的租赁数据查询方法不满足业务方需求，也可使用 TheGraph 方式查询

### Q2: 能否不使用 SDK 直接同租赁协议交互？

**可以但不推荐**，SDK 会始终保持各链的最新 Market 合约，后续也会添加更多的租赁业务逻辑。其中包含了租赁协议的全部方法，方便用户使用。

如果用户直接同租赁市场合约交互，需确保各环境对接交互的合约地址、ABI 一致。ABI 地址：[https://github.com/RenteroLabs/rentero-sdk/blob/main/src/constants.ts#L20](https://github.com/RenteroLabs/rentero-sdk/blob/main/src/constants.ts#L20)
