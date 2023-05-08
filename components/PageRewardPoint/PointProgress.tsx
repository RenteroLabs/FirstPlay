import React, { useMemo } from "react";
import classNames from "classnames";
import { TOTAL_REWARD_POINTS } from "constants/index";

interface PointProgressProps {
  points: number
}
const PointProgress: React.FC<PointProgressProps> = (props) => {
  const { points } = props

  const progress = useMemo(() => {
    return `${((points * 100) / TOTAL_REWARD_POINTS).toFixed(0)}%`
  }, [points])

  return <div className="h-4 rounded-[0.67rem] bg-[#FFBB2A]/20">
    <div className={`h-4 rounded-[0.67rem] bg-[#FFBB2A]`} style={{ width: progress }}></div>
  </div>
}

export default PointProgress