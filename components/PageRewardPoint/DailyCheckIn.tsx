import React from "react";


const DailyCheckIn = () => {

  return <div className="bg-white rounded-2xl mx-4 my-[0.83rem] px-[0.83rem] pt-[0.92rem] pb-6">
    <div className="flex justify-between items-center mb-[0.42rem]">
      <h4 className="text-2xl font-Inter-SemiBold leading-6 text-primary font-semibold mb-0" >Daily check-in</h4>
      <div className="w-[7.5rem] h-[2.33rem] rounded-[1.33rem] shadow-[0rem_0.67rem_1.67rem_0rem_rgba(255,187,42,0.3)] bg-gradient-to-b from-[#FFBB2A] to-[#FF9A00] text-[1rem] font-Inter-SemiBold font-semibold text-white leading-4 inline-flex justify-center items-center cursor-pointer">Go check in</div>
    </div>
    <p className="text-[1rem] font-Inter-Medium font-medium leading-[1.33rem]">3-day streak! Check in for 4 more days to earn an additional 100 points.</p>
  </div>
}


export default DailyCheckIn