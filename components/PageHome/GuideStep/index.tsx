import { Box } from "@mui/material"
import { useRequest } from "ahooks"
import { PASS_NFT_CONTRACT } from "constants/contract"
import { useEffect, useMemo, useState } from "react"
import { getPassNFTByAddress } from "services/web3"
import { useAccount } from "wagmi"
import SectionTitle from "../components/SectionTitle"
import UserStep from "../components/UserStep"
import styles from './style.module.scss'

const GudeStep: React.FC = () => {
  const { address } = useAccount()

  const [mintedNumber, setMintedNumber] = useState<number>(0)

  const { run: queryPassNFTByAddress } = useRequest(getPassNFTByAddress, {
    manual: true,
    onSuccess: (data) => {
      setMintedNumber(data?.totalCount || 0)
    }
  })

  useEffect(() => {
    if (address) {
      queryPassNFTByAddress({
        contractAddresses: [PASS_NFT_CONTRACT],
        withMetadata: false,
        owner: address
      })
    }
  }, [address])

  const [firstStepStatus, secondeStepStatus] = useMemo(() => {
    let first = "Pendding", second = 'Waitting'
    if (address) {
      first = 'Done'
      second = "Pendding"
      if (mintedNumber > 0) {
        second = 'Done'
      }
    }
    return [first, second]
  }, [address, mintedNumber])

  return <Box className={styles.guidestep}>
    <Box className={styles.guidestepBox}>
      <SectionTitle emphasize="4 Easy Steps" normal="To First Play" />
      <Box className={styles.stepList}>
        <UserStep
          stepIndex={1}
          stepTitle="Connect Wallet"
          stepDesc="Support mainstream wallets, provide a secure connection"
          stepStatus={firstStepStatus}
        />
        <UserStep
          stepIndex={2}
          stepTitle="Mint Our NFT"
          stepDesc={`Claim Pass-NFT first, qualify for the trial`}
          stepStatus={secondeStepStatus}
        />
        <UserStep
          stepIndex={3}
          stepTitle="Try A Game"
          stepDesc="0 barriers to entry a game, provide game guidance and walkthroughs"
          stepStatus="Waitting"
        />
        <UserStep
          stepIndex={4}
          stepTitle="Get Rewards"
          stepDesc="Get game rewards, welcome to experience more games"
          stepStatus="Waitting"
        />
      </Box>
    </Box>
  </Box>
}

export default GudeStep