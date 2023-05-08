import React, { useState } from "react";
import PointProgress from "./PointProgress";
import ConnectWallet from "@/components/ConnectWallet"


const Signup = () => {
  const [showConnect, setShowConnect] = useState<boolean>(false)

  return <div className="h-[14.33rem] mx-4 bg-white rounded-2xl mt-[-3.16rem] px-[0.83rem] py-[1.33rem]">
    <h4 className="text-2xl font-Inter-SemiBold leading-6 mb-[1.33rem] text-primary font-semibold" >Sign Up Bonus Points</h4>

    <PointProgress points={0} />

    <p className="text-[1rem] text-primary font-medium font-Inter-Medium mt-4">
      Initial: <span className="text-boldColor">0</span>
    </p>

    <div className="flex justify-center mt-[1.67rem]">
      <button className="h-[3.33rem] w-[13.33rem] rounded-full bg-gradient-to-b from-[#8E50E4] to-[#5A55FF] text-base text-white font-Inter-SemiBold font-semibold cursor-pointer"
        onClick={() => setShowConnect(true)}
      >Sign up! +500</button>
    </div>

    <ConnectWallet showConnect={showConnect} setShowConnect={setShowConnect} />
  </div>
}


export default Signup