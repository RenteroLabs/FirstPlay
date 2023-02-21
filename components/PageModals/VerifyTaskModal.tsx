import { Dialog, Box, IconButton, Typography } from "@mui/material";
import React from "react";
import styles from './styles.module.scss'
import CloseIcon from '@mui/icons-material/Close';
import { Form, Input, Button } from "antd";

interface VerifyTaskProps {
  showModal: boolean;
  setShowModal: (arg0: boolean) => any;
}

const VerifyTaskFormModal: React.FC<VerifyTaskProps> = (props) => {
  const { showModal, setShowModal } = props

  const [form] = Form.useForm<any>()

  const handleSubmit = async (values: any) => {
    console.log(handleSubmit)

    // 向后端接口提交数据

    // 关闭弹窗

  }

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
        <Form.Item label="label1" name="name1" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="label2" name="name2" required>
          <Input />
        </Form.Item>
        <Form.Item label="label3" name="name3" required>
          <Input />
        </Form.Item>
        <Button className={styles.formSubmitBtn} htmlType="submit" >Submit</Button>
      </Form>
    </Box>
  </Dialog>
}

export default VerifyTaskFormModal