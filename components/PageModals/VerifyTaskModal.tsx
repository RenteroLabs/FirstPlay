import { Dialog, Box, IconButton, Typography } from "@mui/material";
import React from "react";
import styles from './styles.module.scss'
import CloseIcon from '@mui/icons-material/Close';
import { Form, Input, Button } from "antd";
import { useAccount } from "wagmi";
import { useRequest } from "ahooks";
import { submitGameTask } from "services/home";
import { toast } from 'react-toastify';

interface VerifyTaskProps {
  showModal: boolean;
  setShowModal: (arg0: boolean) => any;
  verifyForm: Record<string, any>[]
  taskId: string
}

type FormItemType = "address" | "email" | "link" | "text"

const REG_MAP: Record<string, RegExp> = {
  'email': new RegExp("^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"),
  "address": new RegExp('^0x[0-9a-fA-F]*$'),
  "link": /^(http|https):\/\/[a-zA-Z0-9\-.]+\.[a-z]{2,}(\/\S*)?$/,
  // @ts-ignore
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
    onSuccess: ({ code, message }) => {
      if (code == 0) {
        setShowModal(false)
        toast.success("Submit Success!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      } else {
        toast.error(message || "Api call error", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      }
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
            console.log(REG_MAP[item?.type || 'text'])
            return <Form.Item
              key={index}
              label={item?.label}
              name={`${item?.type}-${index}`}
              rules={[
                { required: true, message: `Please input ${item?.label}` },
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