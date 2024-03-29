import { Box, Typography, useMediaQuery } from "@mui/material";
import React, { useMemo, useState } from "react";
import styles from './styles.module.scss'
import Image from "next/image";
import WithdrawBalanceModal from "@/components/PageModals/WithdrawBalance";
import classNames from "classnames/bind";
import { useTranslations } from "next-intl";

const cx = classNames.bind(styles)

interface BalanceTokenItemProps {
  tokenInfo: Record<string, any>
  reload: (arg?: any) => any
}

const iconMap = (type: string) => {
  switch (type) {
    case 'USDT':
      return '/usdt_logo_circle.png'
    // TODO: 默认返回 NFT icon 图片地址
    default:
      return '/nft_logo.png'
  }
}

const BalanceTokenItem: React.FC<BalanceTokenItemProps> = (props) => {
  const { tokenInfo, reload } = props
  const t = useTranslations('Profile.RewardTokenItem')

  const is600Size = useMediaQuery("(max-width: 600px)")
  const [showModal, setShowModal] = useState<boolean>(false)

  const handleWithdrawBalance = () => {
    if (disableBtn) return
    setShowModal(true)
  }

  const disableBtn = useMemo(() => {
    if (tokenInfo?.balance == 0) {
      return true
    }
    if (tokenInfo?.status != 'withdrawable') {
      return true
    }

    return false
  }, [tokenInfo])

  return <Box className={styles.tokenItem}>
    <Box className={styles.tokenInfo}>
      <Box className={styles.tokenLogo}>
        <Image src={iconMap(tokenInfo?.token_symbol)} layout="fill" />
      </Box>
      <Typography variant="h4" className={styles.tokenSymbol}>{tokenInfo?.token_symbol}</Typography>
      <Typography variant="subtitle1" className={styles.tokenName}>{tokenInfo?.token_name}</Typography>
    </Box>
    <Box className={styles.balanceInfo}>
      {!is600Size && <Typography variant="subtitle1" className={styles.amountText}>{t('amountText')}</Typography>}
      <Typography variant="h4">{tokenInfo?.balance}</Typography>
    </Box>
    <Box
      className={cx({
        withdrawBtn: true,
        disableWithdrawBtn: disableBtn
      })}
      onClick={handleWithdrawBalance}>
      {tokenInfo?.status == 'withdrawing' ? t('withdrawingBtnText') : t('withdrawBtnText')}
    </Box>

    <WithdrawBalanceModal
      showModal={showModal}
      setShowModal={setShowModal}
      tokenInfo={tokenInfo}
      reload={reload}
    />
  </Box>
}


export default BalanceTokenItem