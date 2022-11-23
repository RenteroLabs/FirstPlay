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

  const [firstStepStatus, secondeStepStatus, thirdStepStatus] = useMemo(() => {
    let first = "Pendding", second = 'Waitting', third = "Waitting"
    if (address) {
      first = 'Done'
      second = "Pendding"
      if (mintedNumber > 0) {
        second = 'Done'
        third = "Pendding"
      }
    }
    return [first, second, third]
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
          stepTitle="Get The Role"
          stepDesc="Go to Discord and get the Pass-NFT hold role，enjoy more rights"
          stepStatus={thirdStepStatus}
        />
        <UserStep
          stepIndex={4}
          stepTitle="Trial A Game"
          stepDesc="0 barriers to entry a game provide guide and walkthrough"
          stepStatus="Waitting"
        />
      </Box>
    </Box>
  </Box>
}

export default GudeStep