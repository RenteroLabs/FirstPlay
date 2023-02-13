import { Box, CircularProgress, Dialog, IconButton, Modal, TextField, Typography } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import styles from './styles.module.scss'
import CloseIcon from '@mui/icons-material/Close';
import { InputNumber, Checkbox, Form } from 'antd'
import Image from "next/image";
import { useRequest } from "ahooks";
import { depositTokenToTask } from "services/home";
import { useAccount, useSignMessage } from "wagmi";
import { unipassInstance } from "pages/_app";
import { useConnectedType } from "hooks/useConnectedType";
import classNames from "classnames/bind";

const cx = classNames.bind(styles)

interface TokenItemProps {
  tokenInfo: Record<string, any>
  selectToken: Record<string, any>
  setSelectToken: (arg: any) => any
}


const TokenSelectItem: React.FC<TokenItemProps> = (props) => {
  const { tokenInfo, selectToken, setSelectToken } = props

  const iconMap = (type: string) => {
    switch (type) {
      case 'USDT':
        return '/usdt_logo_circle.png'
      // TODO: 默认返回 NFT icon 图片地址
      default:
        return '/nft_logo.png'
    }
  }

  const isChecked = useMemo(() => {
    return selectToken?.token_symbol == tokenInfo?.token_symbol
  }, [selectToken, tokenInfo])

  return <Box className={styles.tokenItem}>
    <Box className={styles.iconBox}>
      <Image src={iconMap(tokenInfo?.token_symbol)} layout="fill" />
    </Box>
    <Typography>
      {tokenInfo?.token_symbol} ({tokenInfo?.balance} balance)
    </Typography>
    <Checkbox
      checked={isChecked}
      onClick={() => {
        setSelectToken(isChecked ? {} : tokenInfo)
      }}
    />
  </Box>
}


interface DepositTaskProps {
  showModal: boolean,
  setShowModal: (arg: boolean) => any
  balanceInfo: Record<string, any>
  taskId: string,
  reload: () => any
}


const DepositTaskModal: React.FC<DepositTaskProps> = (props) => {
  const { showModal, setShowModal, balanceInfo, taskId, reload } = props

  const { address } = useAccount()
  console.log(balanceInfo)
  const [maxAmount, setMaxAmount] = useState<number>(10)
  const [depositAmount, setDepositAmount] = useState<number>(0)
  const [selectedTokenType, setSelectedTokenType] = useState<string>('')
  const [selectToken, setSelectToken] = useState<Record<string, any>>({})

  const [depositLoading, setDepositLoading] = useState<boolean>(false)

  const [form] = Form.useForm()
  const connectedType = useConnectedType()

  const [formatMessage, timestamp] = useMemo(() => {
    if (showModal) {
      const timestamp = (new Date().getTime() / 1000).toFixed(0)

      const message = `${address?.toLocaleLowerCase().slice(2)}${taskId}${selectToken?.token_symbol?.toLocaleLowerCase()}${depositAmount}${timestamp}`
      // const message = '68b826b34afb960632a56d770ff89439c00b185eusdt1674895640'
      return [message, timestamp]
    }
    return []
  }, [showModal, depositAmount, selectToken, address])


  // wagmi 签名信息
  const { signMessage } = useSignMessage({
    message: formatMessage,
    onSuccess: (data) => {
      console.log(data)
      postDepositToken({
        address: address as string,
        task_id: taskId,
        token: selectToken?.token_symbol as string,
        amount: String(depositAmount),
        timestamp: Number(timestamp),
        signature: data as string,
        wallet: ""
      })
    },
    onSettled: () => {
      setDepositLoading(false)
    }
  })

  // unipass 签名信息
  const handleUnipassSign = async () => {
    try {
      const signdata = await unipassInstance.signMessage(formatMessage as string)
      console.log(signdata)
      postDepositToken({
        address: address as string,
        task_id: taskId as string,
        token: selectToken?.token_symbol as string,
        amount: String(depositAmount),
        timestamp: Number(timestamp),
        signature: signdata as string,
        wallet: 'unipass',
      })
    } catch (err) {
      console.error(err)
    }

    setDepositLoading(false)
  }


  const { run: postDepositToken, loading } = useRequest(depositTokenToTask, {
    manual: true,
    onSuccess: ({ data }) => {
      // 刷新列表接口
      reload()
      // 关闭弹窗
      setShowModal(false)
    }
  })

  const handleDeposit = async () => {
    if (depositLoading || !isValidFormData) return

    // 判断 amount 是否为有效数值
    await form.validateFields()
    if (!selectedTokenType) return

    setDepositLoading(true)

    if (connectedType === '"Unipass"') {
      handleUnipassSign()
    } else {
      signMessage()
    }
  }

  useEffect(() => {
    setSelectedTokenType(selectToken?.token_symbol)
  }, [selectToken])

  const isValidFormData = useMemo(() => {
    return depositAmount > 0 && selectedTokenType
  }, [depositAmount, selectedTokenType])

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
          {balanceInfo.map((item: Record<string, any>, index: number) =>
            <TokenSelectItem
              key={index}
              tokenInfo={item}
              selectToken={selectToken}
              setSelectToken={setSelectToken}
            />)}
        </Box>

        <Typography variant="h4" className={styles.amountTitle}>Amount</Typography>

        <Form.Item
          name="amount"
          rules={[{ required: true, message: 'Please input valid amount' }]}>
          <InputNumber
            className={styles.amountInput}
            min={0.01}
            max={selectToken?.balance}
            onChange={((val) => setDepositAmount(val as number))}
          />
        </Form.Item>

      </Form>
      <Typography className={styles.assetAmountTips}>
        The assets transfer in tasks do not support refunds now because task reward consume assets  in real time.
      </Typography>
      <Box className={cx({
        confirmBtn: true,
        disableBtn: !isValidFormData
      })} onClick={handleDeposit}>
        Confirm
        {(depositLoading || loading) && <CircularProgress />}
      </Box>
    </Box>
  </Dialog>
}

export default DepositTaskModal
