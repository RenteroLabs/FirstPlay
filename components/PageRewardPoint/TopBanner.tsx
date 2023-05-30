import { useIsMounted } from "hooks/useIsMounted";
import { useTranslations } from "next-intl";
import React from "react";
import { useAccount } from "wagmi";

const TopBanner = () => {
  const t = useTranslations('RewardPoint.Banner')
  const { address } = useAccount()
  const isMounted = useIsMounted()

  return <div className="h-[23.33rem]
  flex  flex-col items-center bg-[url('/rewardpoint_bg.png')] bg-cover">
    <img src="/rewardpoint_ill.png" className="w-[10rem] h-[10rem] mt-7 mb-[0.83rem]" />
    <h3 className="text-2xl text-white font-Inter-SemiBold font-semibold leading-7 mb-[0.83rem] ">
      {t('Title')}
    </h3>
    <p className="text-base text-white font-Inter-Medium font-medium leading-[1.67rem] max-w-[24rem] text-center">
      {
        (address && isMounted) ?
          t('ConnectedDesc') :
          t('NotConnectDesc')
      }
    </p>
  </div>
}

export default TopBanner