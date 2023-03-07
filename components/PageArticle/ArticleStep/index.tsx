import { Box, Typography } from "@mui/material";
import React, { useMemo } from "react";
import styles from './styles.module.scss'
import ReactMarkdown from 'react-markdown'
import classNames from "classnames/bind";

const cx = classNames.bind(styles)

interface ArticleStepProps {
  stepItem: Record<string, any>
  stepIndex: number
  activeStep: number
}

const ArticleStep: React.FC<ArticleStepProps> = (props) => {
  const { stepItem, stepIndex, activeStep } = props

  const isCurrentStepActive = useMemo(() => {
    return stepIndex === activeStep
  }, [stepIndex, activeStep])

  return <Box className={cx({
    stepBox: true,
    notActiveStep: !isCurrentStepActive
  })}>
    <Typography variant="h2">Step{stepIndex}: {stepItem?.StepTitle}</Typography>
    <ReactMarkdown >{stepItem?.StepContent}</ReactMarkdown>
  </Box>
}

export default ArticleStep