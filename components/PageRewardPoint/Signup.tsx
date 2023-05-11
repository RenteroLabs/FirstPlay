import React, { useState } from "react";
import PointProgress from "./PointProgress";
import ConnectWallet from "@/components/ConnectWallet"
import { TOTAL_REWARD_POINTS } from "constants/index";
import { useQueryParam } from "use-query-params";

interface SignupProps {
  signType: 'Default' | 'Invitee'
}
const Signup: React.FC<SignupProps> = (props) => {
  const { signType = 'Default' } = props

  const [showConnect, setShowConnect] = useState<boolean>(false)

  const [_, setInviteCode] = useQueryParam<string | undefined>('inviter')

  return <div className="min-h-[14.33rem] h-auto mx-4 bg-white rounded-2xl px-[0.83rem] py-[1.33rem] pb-8" style={{ marginTop: signType === 'Default' ? '-3.16rem' : '0' }}>
    <h4 className="text-2xl font-Inter-SemiBold leading-6 mb-[1.33rem] text-primary font-semibold" >Sign Up Bonus Points</h4>

    <PointProgress points={0} />

    <p className="text-[1rem] text-primary font-medium font-Inter-Medium mt-4 mb-[1.67rem]">
      Initial: <span className="text-boldColor">0</span>{signType === "Invitee" && `/${TOTAL_REWARD_POINTS}`}
    </p>

    {
      signType === 'Invitee' &&
      <p className="text-base font-Inter-Regular font-normal leading-[1.67rem]">After registration, you will help your friends get 100 points, and you will also get an extra 500 points, and you can get 2U red envelopes</p>
    }
    <div className="flex justify-center mt-[1.67rem]">
      <button className="h-[3.33rem] w-[13.33rem] rounded-full bg-gradient-to-b from-[#8E50E4] to-[#5A55FF] text-base text-white font-Inter-SemiBold font-semibold cursor-pointer"
        onClick={() => setShowConnect(true)}
      >
        {signType === 'Default' ? 'Sign up! +500' : 'Sign up and get $2!'}
      </button>
    </div>

    <ConnectWallet
      callback={() => setInviteCode(undefined)}
      showConnect={showConnect}
      setShowConnect={setShowConnect} />
  </div>
}


export default Signup