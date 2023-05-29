import React, { useEffect, useMemo, useState } from "react";
import classNames from "classnames";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useRequest } from "ahooks";
import { getWeeklyCheckinPoint, getWeeklyPointList, postDailyCheckIn } from "services/invitepoint";
import { CircularProgress } from "@mui/material";
import { useAccount } from "wagmi";
import moment from "moment";

interface DailyCheckInItemProps {
  itemInfo: {
    date: string
    point: number
    status: 'uncompleted' | 'unclaimed' | 'received'
  }
}
const DailyCheckInItem: React.FC<DailyCheckInItemProps> = ({ itemInfo }) => {

  return <div className={classNames("w-[3.33rem] h-16 rounded-lg flex flex-col", {
    'default-checkin-item': itemInfo?.status !== 'received',
    'active-checkin-item': itemInfo?.status === 'received'
  })}>
    <div className={`text-center text-sm font-Inter-Medium font-medium text-white leading-[1.33rem] rounded-t-lg h-[1.33rem] ${itemInfo?.status === 'received' ? 'bg-[#FFBB2A]' : 'bg-primary/20'}`}>
      {moment(itemInfo?.date).format("M.DD")}
    </div>
    <div className="grow flex justify-center items-center text-[1rem] text-primary/30 font-Inter-SemiBold font-semibold leading-[0.83rem]">
      {
        itemInfo?.status === 'received'
          ? <CheckCircleIcon sx={{
            width: '1.5rem', height: '1.5rem', path: {
              color: '#FFBB2A'
            }
          }} />
          : <>+{itemInfo?.point}</>
      }
    </div>
  </div>
}

interface DailyCheckInPorps {
  refreshUserPoint?: () => any
  type?: 'home'
}
const DailyCheckIn: React.FC<DailyCheckInPorps> = (props) => {
  const { refreshUserPoint = () => { }, type } = props

  const { address } = useAccount()
  // const [weekDays, setWeekDays] = useState<string[]>([])

  const [currentWeek, setCurrentWeek] = useState<Record<string, any>[]>([])

  useEffect(() => {
    // const getCurrentWeekDays = () => {
    //   const dayList = [1, 2, 3, 4, 5, 6, 7]
    //   let weekDays: string[] = []

    //   dayList.forEach(item => weekDays.push(moment().day(item).format("M.DD")))

    //   return weekDays
    // }
    // setWeekDays(getCurrentWeekDays())
  }, [])

  const { run: doDailyCheckin, loading } = useRequest(postDailyCheckIn, {
    manual: true,
    onSuccess: async ({ code }) => {
      // code 为 0, 获取本次签到积分
      if (!code) {
        await queryDailyCheckInPoint({
          address: address as string,
          type: 'check',
          date: moment().format('YYYY-MM-DD')
        })
      }
    }
  })

  const { run: queryDailyCheckInPoint, loading: pointLoading } = useRequest(getWeeklyCheckinPoint, {
    manual: true,
    onSuccess: (data) => {
      // 重新请求本周签到数据
      queryWeeklyPointList({ time: moment().format('YYYY-MM-DD hh:mm:ss'), address: address as string })

      // 刷新用户积分数值
      refreshUserPoint()
    }
  })

  const handleCheckIn = () => {
    doDailyCheckin({ address: address as string, time: moment().format('YYYY-MM-DD hh:mm:ss') })
  }

  // 请求每周签到数据
  const { run: queryWeeklyPointList, refresh } = useRequest(getWeeklyPointList, {
    manual: true,
    onSuccess: ({ data }) => {
      setCurrentWeek(data || [])
    }
  })

  useEffect(() => {
    queryWeeklyPointList({ time: moment().format('YYYY-MM-DD hh:mm:ss'), address: address as string })
  }, [address])


  const [isCheckIned, checkedNum] = useMemo(() => {
    const today = moment().format('YYYY-MM-DD')
    let isCheckIned: boolean = false
    let checkedNum: number = 0
    currentWeek.forEach(item => {
      if (item?.status === 'received') {
        checkedNum += 1

        if (item?.date === today) {
          isCheckIned = true
        }
      }
    })

    return [isCheckIned, checkedNum]
  }, [currentWeek])

  return <div className={`bg-white rounded-2xl mt-[0.83rem] px-[0.83rem] pt-[0.92rem] ${type !== 'home' && 'mx-4'} ${type === 'home' ? 'pb-3' : 'pb-6'} ${type !== 'home' && 'mb-[0.83]'}`}>
    <div className="flex justify-between items-center mb-[1.33rem]">
      <h4 className="text-2xl font-Inter-SemiBold leading-6 text-primary font-semibold mb-0" >Daily check-in</h4>
      <div className="w-[7.5rem] h-[2.33rem] rounded-[1.33rem] shadow-[0rem_0.67rem_1.67rem_0rem_rgba(255,187,42,0.3)] bg-gradient-to-b from-[#FFBB2A] to-[#FF9A00] text-[1rem] font-Inter-SemiBold font-semibold text-white leading-4 inline-flex justify-center items-center cursor-pointer"
        onClick={handleCheckIn}
      >
        {isCheckIned ? 'Checked in' : "Check in"}
        {(loading || pointLoading) && !isCheckIned && <CircularProgress sx={{ circle: { stroke: 'rgb(33, 150, 243)' } }} style={{ width: '20px !important', height: "20px !important" }} className="w-5 h-5 ml-2" />}
      </div>
    </div>

    <div className="flex justify-between">
      {
        currentWeek.map((item, index) => {
          return <DailyCheckInItem key={index} itemInfo={item} />
        })
      }
    </div>

    <p className="text-[1rem] font-Inter-Medium font-medium leading-[1.33rem] mt-[1.33rem] mb-0">{checkedNum}-day streak! Check in for {7 - checkedNum} more days to earn an additional 100 points.</p>
  </div>
}


export default DailyCheckIn