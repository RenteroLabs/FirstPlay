import React, { useMemo } from "react";
import PointProgress from "./PointProgress";
import CampaignIcon from '@mui/icons-material/Campaign';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { TOTAL_REWARD_POINTS } from "constants/index";

interface ProgressInfoProps {
  userPoint: number
}
const ProgressInfo: React.FC<ProgressInfoProps> = (props) => {
  const { userPoint } = props

  const lessProgress = useMemo(() => {
    const less = TOTAL_REWARD_POINTS - userPoint
    return ((less * 100) / TOTAL_REWARD_POINTS).toFixed(0)
  }, [userPoint])

  return <div className="h-auto mx-4 bg-white rounded-2xl mt-[-3.16rem] px-[0.83rem] py-[1.33rem]">
    <h4 className="text-2xl font-Inter-SemiBold leading-6 mb-[1.33rem] text-primary font-semibold" >My progress</h4>

    <PointProgress points={userPoint} />

    <p className="text-[1rem] text-primary font-medium font-Inter-Medium mt-4 flex justify-between mb-[1.67rem]">
      <span>
        Initial:
        <span className="text-boldColor"> {userPoint}</span>/{TOTAL_REWARD_POINTS}
      </span>
      <span>Just {lessProgress}% less!</span>
    </p>

    <p className="text-base text-boldColor font-Inter-Regular font-normal inline-flex items-center mb-0">
      <VolumeUpIcon className="w-[1.33rem] h-[1.33rem] mr-[0.67rem] text-primary" /> Reach 10,000 points to withdraw
    </p>

  </div>
}


export default ProgressInfo