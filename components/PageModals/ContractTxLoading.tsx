import { Box, CircularProgress, Dialog, Typography, Link } from '@mui/material';
import React, { useMemo } from 'react';
import { useNetwork } from 'wagmi';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import styles from './styles.module.scss';

interface ContractLoadingProps {
  showModal: boolean;
  txHash: string;
}

const ContractTxLoading: React.FC<ContractLoadingProps> = (props) => {
  const { showModal, txHash } = props
  const { chain } = useNetwork()

  const blockscanUrl = useMemo(() => {
    return `${chain?.blockExplorers?.default.url}/tx/${txHash}`
  }, [txHash, chain])

  return <Dialog open={showModal}>
    <Box className={styles.txDialogBox}>
      <CircularProgress size={48} sx={{ mb: '2.67rem', mt: '1rem' }} />
      {
        txHash ?
          <Box>
            <Typography>Transaction is packaging in blockchain</Typography>
            <Link href={blockscanUrl} className={styles.txLink} target="__blank">
                See Detail In Blockscan <OpenInNewIcon />
            </Link>
          </Box> :
          <Typography>Confirm the transaction in your wallet.</Typography>
      }
    </Box>
  </Dialog>
}

export default ContractTxLoading