import { Box } from "@mui/material"
import SectionTitle from "../components/SectionTitle"
import UserStep from "../components/UserStep"
import styles from './style.module.scss'

const GudeStep: React.FC = () => {



  return <Box className={styles.guidestep}>
    <Box className={styles.guidestepBox}>
      <SectionTitle emphasize="4 Steps" normal="Easy To Firstplay" />
      <Box className={styles.stepList}>
        <UserStep
          stepIndex={1}
          stepTitle="Connect Wallet"
          stepDesc="Support mainstream wallets, provide a secure connection"
          stepStatus="Done"
        />
        <UserStep
          stepIndex={2}
          stepTitle="Mint Our NFT"
          stepDesc={`Claim Pass-NFT first, nqualify for the trial`}
          stepStatus="Done"
        />
        <UserStep
          stepIndex={3}
          stepTitle="Try A Game"
          stepDesc="0 barriers to entry a game provide guide and walkthrough"
          stepStatus="Pendding"
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