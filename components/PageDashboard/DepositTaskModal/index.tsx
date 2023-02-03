import { Box, CircularProgress, Dialog, IconButton, Modal, TextField, Typography } from "@mui/material";
import React, { useMemo, useState } from "react";
import styles from './styles.module.scss'
import CloseIcon from '@mui/icons-material/Close';
import { InputNumber, Checkbox, Form } from 'antd'
import Image from "next/image";
import { useRequest } from "ahooks";
import { depositTokenToTask } from "services/home";


interface TokenItemProps {

}


const TokenSelectItem: React.FC<TokenItemProps> = (props) => {
  const { } = props

  const iconMap = (type: string) => {
    switch (type) {
      case 'USDT':
        return '/usdt_logo_circle.png'
      // TODO: 默认返回 NFT icon 图片地址
      default:
        return '/nft_logo.png'
    }
  }

  return <Box className={styles.tokenItem}>
    <Box className={styles.iconBox}>
      <Image src={iconMap('USDT')} layout="fill" />
    </Box>
    <Typography>
      USDT (10 balance)
    </Typography>
    <Checkbox checked={true} />
  </Box>
}


interface DepositTaskProps {
  showModal: boolean,
  setShowModal: (arg: boolean) => any
  balanceInfo: Record<string, any>
}



const DepositTaskModal: React.FC<DepositTaskProps> = (props) => {
  const { showModal, setShowModal, balanceInfo } = props

  const [maxAmount, setMaxAmount] = useState<number>(10)
  const [depositAmount, setDepositAmount] = useState<number>(0)

  const [form] = Form.useForm()

  const handleDeposit = async () => {
    // 判断 amount 是否为有效数值
    await form.validateFields()

    // api
    await postDepositToken({})

  }


  const { run: postDepositToken, loading } = useRequest(depositTokenToTask, {
    manual: true,
    onSuccess: ({ data }) => {
      // 刷新列表接口

      // 关闭弹窗
      setShowModal(false)
    }
  })

  return <Dialog open={showModal}>
    <Box className={styles.modalBox}>
      <IconButton
        className={styles.closeBtn}
        disableRipple
        onClick={() => { setShowModal(false) }}
      ><CloseIcon /></IconButton>
      <Typography variant="h3">Deposit into TaskId</Typography>

      <Typography variant="h4" className={styles.tokenTitle}>Token</Typography>

      <Form form={form}>
        <Box>
          <TokenSelectItem />
          <TokenSelectItem />
        </Box>


        <Typography variant="h4" className={styles.amountTitle}>Amount</Typography>

        <Form.Item
          name="amount"
          rules={[{ required: true, message: 'Please input valid amount' }]}>
          <InputNumber
            className={styles.amountInput}
            min={1}
            max={maxAmount}
            onChange={((val) => setDepositAmount(val as number))}
          />
        </Form.Item>

      </Form>
      <Typography className={styles.assetAmountTips}>
        The assets transfer in tasks do not support refunds now because task reward consume assets  in real time.
      </Typography>
      <Box className={styles.confirmBtn} onClick={handleDeposit}>
        Confirm
        {loading && <CircularProgress />}
      </Box>
    </Box>
  </Dialog>
}

export default DepositTaskModal
