import { useTranslations } from "next-intl";
import React from "react";
import Slider from "react-slick";

const mockRewardList: string[] = [
  '0xED9….D1eA has obtained 1000 points 1 min ago',
  '0x987….bE3E has get $2 cash 3 min ago',
  '0x2A7….0c69 has invited 5 new friends 4 min ago',
  '0x368…ff0b has obtained 1200 points 6 min ago',
  '0xD84….8365 has obtained 800 points 6 min ago',
  '0xD5A….6719 has invited 3 new friends 7 min ago',
  '0x435….A6c7 has obtained 500 points 8 min ago',
  '0x2A7….0c69 has invited 4 new friends 8 min ago',
  '0x253….B4E5 has obtained 2000 points 8 min ago',
  '0xD203….57C4 has obtained 800 points 9 min ago',
  '0x5be….01a1 has invited 4 new friends 10 min ago',
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
