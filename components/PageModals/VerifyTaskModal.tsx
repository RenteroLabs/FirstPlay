import { Dialog, Box, IconButton, Typography } from "@mui/material";
import React, { useMemo, useState } from "react";
import styles from './styles.module.scss'
import CloseIcon from '@mui/icons-material/Close';
import { Form, Input, Button, Upload } from "antd";
import { useAccount } from "wagmi";
import { useRequest } from "ahooks";
import { submitGameTask } from "services/home";
import { toast } from 'react-toastify';
import AddIcon from '@mui/icons-material/Add';
import { PutObjectCommand } from "@aws-sdk/client-s3"; // ES Modules import
import { s3Client } from "lib/S3Client";
import { isEmpty } from "lodash";
import CryptoJS from "crypto-js"
import SparkMD5 from "spark-md5";

interface VerifyTaskProps {
  showModal: boolean;
  setShowModal: (arg0: boolean) => any;
  verifyForm: Record<string, any>[]
  taskId: string
}

type FormItemType = "address" | "email" | "link" | "text" | "image"

const REG_MAP: Record<string, RegExp> = {
  'email': new RegExp("^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"),
  "address": new RegExp('^0x[0-9a-fA-F]*$'),
  "link": /^(http|https):\/\/[a-zA-Z0-9\-.]+\.[a-z]{2,}(\/\S*)?$/,
  // @ts-ignore
  "text": "",
  // @ts-ignore
  "image": ""
}

const bucketName = process.env.NEXT_PUBLIC_BUCKET

function sleep(delay: number) {
  return new Promise(reslove => {
    setTimeout(reslove, delay)
  })
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

  const [fileList, setFileList] = useState<Record<string, any>[]>([])

  const [currentFileMd5, setCurrentFileMD5] = useState<any>()

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

    if (formParams?.image) {
      let fileUrls: string[] = []
      fileList.forEach(async (file: any) => {
        if (file.status === 'done') {
          const filehash = SparkMD5.hash(`${file?.name}${file?.uid}`)
          fileUrls.push(`https://${bucketName}.s3.ap-east-1.amazonaws.com/${address}/${filehash}`)
        }
      })
      formParams.image = fileUrls.join(',')
    }

    const submitParams = {
      address: address as string,
      task_id: taskId,
      form: formParams
    }
    console.log(submitParams)
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

  const computeMD5 = async (file: any) => {
    let result: any

    var blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice,
      // file = this.files[0],
      chunkSize = 2097152,                             // Read in chunks of 2MB
      chunks = Math.ceil(file.size / chunkSize),
      currentChunk = 0,
      spark = new SparkMD5.ArrayBuffer(),
      fileReader = new FileReader();

    fileReader.onload = async function (e) {
      console.log('read chunk nr', currentChunk + 1, 'of', chunks);
      spark.append(e.target.result);                   // Append array buffer
      currentChunk++;

      if (currentChunk < chunks) {
        loadNext();
      } else {
        console.log('finished loading');
        // console.info('computed hash', spark.end());  // Compute hash
        const md5 = spark.end()
        result = new Buffer(md5, 'hex').toString('base64')

        console.log(result)
        setCurrentFileMD5(result)
      }
    };

    fileReader.onerror = function () {
      console.warn('oops, something went wrong.');
    };

    function loadNext() {
      var start = currentChunk * chunkSize,
        end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;

      fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
    }

    loadNext();
    return result
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
        {
          verifyForm.map((item: Record<string, any>, index: number) => {

            if (item?.type === 'image') {
              return <Form.Item
                key={index}
                label={item?.label}
                name={`${item?.type}-${index}`}
                rules={[
                  { required: true, message: `Please input ${item?.label}` },
                  {
                    validator(rule, value, callback) {
                      if (!isEmpty(fileList)) {
                        callback()
                      } else {
                        callback('Please upload image')
                      }
                    },
                  }
                ]}
              >
                <Upload
                  listType="picture-card"
                  onChange={({ fileList }) => {
                    setFileList(fileList)
                  }}
                  customRequest={async ({ file, onSuccess, onError }) => {
                    
                    const filehash = await SparkMD5.hash(`${file?.name}${file?.uid}`)
                    
                    const bucketParams = {
                      Bucket: bucketName,
                      Key: `${address}/${filehash}`,
                      ContentType: file?.type,
                      Body: file,
                      ACL: 'public-read',
                      // ContentMD5: currentFileMd5,
                      // ObjectLockMode: 'COMPLIANCE',
                      // ObjectLockRetainUntilDate: new Date("2030-01-01")
                    }
                    try {
                      const result = await s3Client.send(new PutObjectCommand(bucketParams));
                      // @ts-ignore
                      onSuccess(result)
                    } catch (err) {
                      // @ts-ignore
                      onError(err)
                      toast.error(err?.message || "Upload error", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: false,
                        progress: undefined,
                        theme: "colored",
                      });
                    }
                    setCurrentFileMD5(null)
                  }}
                >
                  <IconButton><AddIcon /></IconButton>
                </Upload>
              </Form.Item>
            }

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