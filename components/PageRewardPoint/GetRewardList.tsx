import { useTranslations } from "next-intl";
import React from "react";
import Slider from "react-slick";

const mockRewardList: string[] = [
  '0xda824f****kd32 get 300 points 10 min ago',
  '0xda824f****kd32 get 300 points 10 min ago',
  '0xda824f****kd32 get 300 points 10 min ago',
  '0xda824f****kd33 get 300 points 10 min ago',
  '0xda824f****kd34 get 300 points 10 min ago',
  '0xda824f****kd35 get 300 points 10 min ago',
  '0xda824f****kd36 get 300 points 10 min ago',
  '0xda824f****kd37 get 300 points 10 min ago',
  '0xda824f****kd38 get 300 points 10 min ago',
  '0xda824f****kd39 get 300 points 10 min ago',
]

const GetRewardList = () => {

  const t = useTranslations('RewardPoint')
  
  return <div className="bg-white rounded-2xl px-[0.83rem] pt-[1.67rem] pb-5 mx-4 mt-[0.83rem] mb-4">
    <h4 className="text-[1rem] font-Inter-Medium font-medium text-primary mb-[0.83rem]">
      <span className="text-[#8E50E4]">107</span> {t('ShowGetRewardListTitle')}</h4>

    <div>
      {/* https://react-slick.neostack.com/docs/example/auto-play */}
      <Slider
        dots={false}
        infinite={true}
        slidesToShow={5}
        slidesToScroll={1}
        vertical={true}
        verticalSwiping={true}
        speed={1000}
        autoplaySpeed={1000}
        cssEase="linear"
        autoplay={true}
      >
        {
          mockRewardList.map((item: string, index: number) =>
            <p className="text-[1rem] text-primary/60 font-Inter-Regular font-normal leading-8 mb-0" key={index}>{item}</p>)
        }
      </Slider>
    </div>
  </div>
}

export default GetRewardList
