import { COIN_ICON, GAME_TASK_MONEY } from "constants/static";
import React from "react";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

interface TaskCardProps {
  taskInfo: Record<string, any>
}
const TaskCard: React.FC<TaskCardProps> = (props) => {
  const { taskInfo } = props

  return <div className="mt-4 rounded-2xl bg-white px-[0.83rem] py-[1.33rem]">
    <div className="flex justify-between items-center mb-[1.33rem]">
      <h4 className="text-xl font-Inter-SemiBold font-semibold leading-6 grow flex-nowrap overflow-ellipsis overflow-hidden whitespace-nowrap mb-0 pr-2">
        Sign up
      </h4>
      <div className="text-xl font-Inter-SemiBold font-semibold leading-6 flex items-center shrink-0">
        <img src={COIN_ICON} className="h-6 w-6 mr-[0.17rem]" /> +100
      </div>
    </div>

    {/* Type: Sign Up */}
    <p className="text-base font-Inter-Regular font-normal leading-[1.17rem]">Connect wallet to FirstPlay</p>

    {/* Type: Bounty task */}
    <div className="text-base font-Inter-Regular font-normal leading-[1.17rem] text-boldColor mb-[0.67rem]"># Dark Throne</div>
    <div className="flex justify-between items-center">
      <p className="text-base font-Inter-Regular font-normal mb-0 overflow-hidden overflow-ellipsis whitespace-nowrap">
        Clear 100 stages with a new account stages with a new account
      </p>
      <KeyboardArrowRightIcon className=" shrink-0" />
    </div>
    {/* Type: Share twitter */}
    <div className="flex items-center text-base font-Inter-Medium font-medium leading-[1.42rem] text-[#1D9BF0] cursor-pointer">
      <svg className="mr-[0.33rem]" t="1684380263143" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3865" width="18" height="18">
        <path d="M905.088 226.864v-0.512c8.928-3.488 15.968-10.88 23.056-16.352 32-24.656 52.816-57.12 68.16-98.624l-26.128 14.304c-26.896 13.648-72.528 33.264-107.648 36.272-41.376-37.696-84.672-67.344-166.048-65.92l-25.632 3.072c-16.592 3.632-32.4 8.128-46.656 14.304-59.584 25.856-100.208 74.096-118.896 141.024-7.44 26.624-10.464 71.12-1.024 98.624-33.616-0.048-66.16-5.344-94.304-12.272-110.928-27.28-180.016-64.144-256.72-124.144-22.528-17.616-44.624-37.584-62.528-59.776-5.776-7.152-14.88-13.424-18.96-21.984a20.352 20.352 0 0 1-1.024-0.512c-8.912 16.512-17.28 34.4-22.544 54.672-20.8 79.904 12.08 147.008 47.152 190.592 10.624 13.216 27.856 21.408 38.432 33.728h1.024c-7.952 2.944-21.776-1.136-28.704-2.56-16.384-3.376-30.352-6.48-44.08-12.256l-21.52-10.224c-0.336 88.272 44.256 145.648 98.912 179.856 17.824 11.152 42.752 26.176 68.672 27.584-13.872 11.712-73.2 6.336-93.792 4.096 25.744 66.272 65.296 110.4 133.248 134.368 17.536 6.192 38.928 11.664 62.528 11.248-12.528 14.88-39.264 27.008-56.896 37.296-36.352 21.264-78.56 35.056-126.08 45.488-19.056 4.16-39.312 3.312-59.968 6.624-22.832 3.68-46.72-1.936-67.136-2.56l18.448 11.248a493.248 493.248 0 0 0 59.456 30.656c38.064 16.656 78.624 29.216 123.52 40.368 90.528 22.464 218.24 12.368 297.264-12.256 220.064-68.592 359.072-228.688 411.552-464.48 9.024-40.56 10.336-86.624 9.744-134.896l32.8-26.064c27.088-21.696 52.48-51.936 71.232-81.76v-0.512c-35.712 11.2-73.312 31.76-118.912 32.24z" fill="#1D9BF0" p-id="3866"></path>
      </svg>
      Connect
    </div>

    {/* Button Area */}
    <div className="mt-[1.33rem] flex items-center">
      <div className="h-[2.33rem] rounded-[1.17rem] bg-gradient-to-b from-[#FFBB2A] to-[#FF9A00] shadow-[0rem_0.67rem_1.67rem_0rem_rgba(255,187,42,0.3)] leading-[2.33rem] px-4 text-[1rem] font-Inter-SemiBold font-semibold text-white cursor-pointer inline-flex items-center">
        <svg className="mr-[0.42rem]" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6561" width="16" height="16"><path d="M577.536 766.634667a68.266667 68.266667 0 0 1-95.573333 0L197.973333 483.328a68.266667 68.266667 0 0 1 95.573334-95.573333l236.202666 235.52 402.773334-402.773334A512 512 0 0 0 0 512a512 512 0 0 0 1024 0 510.634667 510.634667 0 0 0-27.306667-164.522667z" fill="#ffffff" p-id="6562"></path></svg>
        Receive! +100
      </div>

      <div className="h-[2.33rem] w-[7.5rem] rounded-[1.17rem] bg-[#8E50E4] inline-flex justify-center items-center text-[1rem] font-Inter-SemiBold font-semibold text-white cursor-pointer">
        Verify
      </div>
    </div>
  </div>
}

const PointTaskList = () => {

  return <div className="mx-4 mt-[1.67rem]">
    <h3 className="text-2xl font-Inter-SemiBold font-semibold leading-6">Integral Task List</h3>
    <div>
      <TaskCard taskInfo={{}} />
      <TaskCard taskInfo={{}} />
      <TaskCard taskInfo={{}} />
    </div>
  </div>
}

export default PointTaskList