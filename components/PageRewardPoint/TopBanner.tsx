import { useIsMounted } from "hooks/useIsMounted";
import React from "react";
import { useAccount } from "wagmi";

const TopBanner = () => {

  const { address } = useAccount()
  const isMounted = useIsMounted()
  
  return <div className="h-[23.33rem]
  flex  flex-col items-center bg-[url('/rewardpoint_bg.png')] bg-cover">
    <img src="/rewardpoint_ill.png" className="w-[10rem] h-[10rem] mt-7 mb-[0.83rem]" />
    <h3 className="text-2xl text-white font-Inter-SemiBold font-semibold leading-7 mb-[0.83rem] ">
      $2 Cash Drops !
    </h3>
    <p className="text-base text-white font-Inter-Medium font-medium leading-[1.67rem] max-w-[24rem] text-center">
      {
        (address && isMounted) ?
          'Collect 10000 points and withdraw 2 USDT immediately!' :
          'Continuous check-in,invite friends to collect points, get $2 immediately!'
      }
    </p>
  </div>
}

export default TopBanner