import { IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { CopyToClipboard } from 'react-copy-to-clipboard'
import DoneIcon from '@mui/icons-material/Done';
import { useIsMounted } from "hooks/useIsMounted";

interface CopyButtonProps {
  targetValue: string;
}

const CopyButton: React.FC<CopyButtonProps> = (props) => {
  const { targetValue } = props

  const [isCopyed, setIsCopyed] = useState<boolean>(false)
  const isMounted = useIsMounted()

  useEffect(() => {
    if (isCopyed) {
      setTimeout(() => {
        setIsCopyed(false)
      }, 1000)
    }
  }, [isCopyed])

  return <IconButton>
    {isCopyed && isMounted ?
      <DoneIcon color="success" /> :
      <CopyToClipboard
        text={targetValue}
        onCopy={() => setIsCopyed(true)}
      >
        <ContentCopyIcon  />
      </CopyToClipboard>
    }
  </IconButton>
}

export default CopyButton