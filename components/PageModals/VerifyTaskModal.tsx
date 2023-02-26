import { Dialog, Box, IconButton, Typography } from "@mui/material";
import React from "react";
import styles from './styles.module.scss'
import CloseIcon from '@mui/icons-material/Close';
import { Form, Input, Button } from "antd";
import { useAccount } from "wagmi";
import { useRequest } from "ahooks";
import { submitGameTask } from "services/home";

interface VerifyTaskProps {
  showModal: boolean;
  setShowModal: (arg0: boolean) => any;
  verifyForm: Record<string, any>[]
  taskId: string
}

type FormItemType = "address" | "email" | "link" | "text"

const REG_MAP = {
  'email': '^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$',
  "address": "^[a-zA-Z0-9]+$",
  'link': "(https?|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]",
  "text": ""
}

/**
 * 
 * 任务表单目前支持 4 种类型：
 * + address
 * + email
 * + link
 * + text
 */
const VerifyTaskFormModal: React.FC<VerifyTaskProps> = (props) => {
  const { showModal, setShowModal, verifyForm, taskId } = props

  const { address } = useAccount()
  const [form] = Form.useForm<any>()

  const handleSubmit = async (values: any) => {
    // console.log(values)

    const rawFormData = Object.entries(values)

    let formParams: Record<string, any> = {}

    rawFormData.forEach(([key, val]) => {
      const keyType = key.split('-')[0]
      if (formParams[keyType]) {
        formParams[keyType] += `,${val}`
      } else {
        formParams[keyType] = val
      }
    })
    // console.log(formParams)

    const submitParams = {
      address: address as string,
      task_id: taskId,
      form: formParams
    }

    // 向后端接口提交数据
    await postSubmitForm(submitParams)
  }

  const { run: postSubmitForm, loading } = useRequest(submitGameTask, {
    manual: true,
    onSuccess: ({ data }) => {
      // console.log(data)
      setShowModal(false)
    }
  })



  return <Dialog
    open={showModal}
    className={styles.verifyTaskModal}
  >
    <Box className={styles.modalBox} >
      <IconButton
        className={styles.closeBtn}
        disableRipple
        onClick={() => { setShowModal(false) }}
      ><CloseIcon /></IconButton>
      <Box className={styles.modalHeader}>
        <Typography>Verify Task</Typography>
      </Box>

      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
      >
        {
          verifyForm.map((item: Record<string, any>, index: number) => {
            return <Form.Item
              key={index}
              label={item?.filed}
              name={`${item?.type}-${index}`}
              rules={[
                { required: true, message: `Please input ${item?.filed}` },
                // @ts-ignore
                { pattern: REG_MAP[item?.type || 'text'], message: "Please input valid format data" }
              ]}
            >
              <Input />
            </Form.Item>
          })
        }
        <Button className={styles.formSubmitBtn} htmlType="submit" loading={loading}>Submit</Button>
      </Form>
    </Box>
  </Dialog>
}

export default VerifyTaskFormModal