import React, { useEffect, useState } from "react";
import classNames from "classnames";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useRequest } from "ahooks";
import { getWeeklyCheckinPoint } from "services/invitepoint";
import { CircularProgress } from "@mui/material";
import { useAccount } from "wagmi";
import moment from "moment";

interface DailyCheckInItemProps {
  itemInfo: {
    date: string
    points: number
    isCheckIn: boolean
  }
}
const DailyCheckInItem: React.FC<DailyCheckInItemProps> = ({ itemInfo }) => {

  return <div className={classNames("w-[3.33rem] h-16 rounded-lg flex flex-col", {
    'default-checkin-item': !itemInfo?.isCheckIn,
    'active-checkin-item': itemInfo?.isCheckIn
  })}>
    <div className={`text-center text-sm font-Inter-Medium font-medium text-white leading-[1.33rem] rounded-t-lg h-[1.33rem] ${itemInfo?.isCheckIn ? 'bg-[#FFBB2A]' : 'bg-primary/20'}`}>
      {itemInfo?.date}
    </div>
    <div className="grow flex justify-center items-center text-[1rem] text-primary/30 font-Inter-SemiBold font-semibold leading-[0.83rem]">
      {
        itemInfo?.isCheckIn
          ? <CheckCircleIcon sx={{
            width: '1.5rem', height: '1.5rem', path: {
              color: '#FFBB2A'
            }
          }} />
          : <>+{itemInfo?.points}</>
      }
    </div>
  </div>
}


const currentWeek = [
  {
    date: '4.24',
    points: 100,
    isCheckIn: true,
  }, {
    date: '4.25',
    points: 100,
    isCheckIn: true,
  }, {
    date: '4.26',
    points: 100,
    isCheckIn: true,
  }, {
    date: '4.27',
    points: 100,
    isCheckIn: false,
  }, {
    date: '4.28',
    points: 100,
    isCheckIn: false,
  }, {
    date: '4.29',
    points: 100,
    isCheckIn: false,
  }, {
    date: '4.30',
    points: 600,
    isCheckIn: false,
  }
]

const DailyCheckIn = () => {

  const { address } = useAccount()
  const [weekDays, setWeekDays] = useState<string[]>([])

  useEffect(() => {
    const getCurrentWeekDays = () => {
      const dayList = [1, 2, 3, 4, 5, 6, 7]
      let weekDays: string[] = []

      dayList.forEach(item => weekDays.push(moment().day(item).format("M.DD")))

      return weekDays
    }
    setWeekDays(getCurrentWeekDays())
  }, [])


  // TODO: 请求每周签到数据

  const { run: queryCheckinPoint, loading } = useRequest(getWeeklyCheckinPoint, {
    manual: true,
    onSuccess: (data) => {
      console.log(data)

      // TODO: 重新请求本周签到数据
    }
  })

  const handleCheckIn = () => {
    queryCheckinPoint()
  }


  useEffect(() => {

  }, [address])

  return <div className="bg-white rounded-2xl mx-4 my-[0.83rem] px-[0.83rem] pt-[0.92rem] pb-6">
    <div className="flex justify-between items-center mb-[1.33rem]">
      <h4 className="text-2xl font-Inter-SemiBold leading-6 text-primary font-semibold mb-0" >Daily check-in</h4>
      {/* TODO: 如果当前已签到，则无法签到 */}
      <div className="w-[7.5rem] h-[2.33rem] rounded-[1.33rem] shadow-[0rem_0.67rem_1.67rem_0rem_rgba(255,187,42,0.3)] bg-gradient-to-b from-[#FFBB2A] to-[#FF9A00] text-[1rem] font-Inter-SemiBold font-semibold text-white leading-4 inline-flex justify-center items-center cursor-pointer"
        onClick={handleCheckIn}
      >
        Check in {loading && <CircularProgress sx={{ circle: { stroke: 'rgb(33, 150, 243)' } }} style={{ width: '20px !important', height: "20px !important" }} className="w-5 h-5 ml-2" />}
      </div>
    </div>

    <div className="flex justify-between">
      {
        currentWeek.map((item, index) => {
          return <DailyCheckInItem key={index} itemInfo={{ ...item, date: weekDays[index] }} />
        })
      }
    </div>

    <p className="text-[1rem] font-Inter-Medium font-medium leading-[1.33rem] mt-[1.33rem] mb-0">3-day streak! Check in for 4 more days to earn an additional 100 points.</p>
  </div>
}


export default DailyCheckIn