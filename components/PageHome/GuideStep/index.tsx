import { Box } from "@mui/material"
import { useMemo } from "react"
import { useAccount } from "wagmi"
import SectionTitle from "../components/SectionTitle"
import UserStep from "../components/UserStep"
import styles from './style.module.scss'

const GudeStep: React.FC = () => {
  const { address } = useAccount()
  const [firstStepStatus, secondeStepStatus] = useMemo(() => {
    let first = "Pendding", second = 'Waitting'
    if (address) {
      first = 'Done'
      second = "Pendding"
    }
    return [first, second]
  }, [address])

  return <Box className={styles.guidestep}>
    <Box className={styles.guidestepBox}>
      <SectionTitle emphasize="4 Steps" normal="Easy To Firstplay" />
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
          stepDesc={`Claim Pass-NFT first, nqualify for the trial`}
          stepStatus={secondeStepStatus}
        />
        <UserStep
          stepIndex={3}
          stepTitle="Try A Game"
          stepDesc="0 barriers to entry a game provide guide and walkthrough"
          stepStatus="Waitting"
        />
        <UserStep
          stepIndex={4}
          stepTitle="Get rewards"
          stepDesc="Get game rewards, welcome to experience more games"
          stepStatus="Waitting"
        />
      </Box>
    </Box>
  </Box>
}

export default GudeStep