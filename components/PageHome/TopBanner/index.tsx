import { Box, useMediaQuery } from "@mui/material";
import React, { ReactElement, useEffect, useMemo, useRef, useState } from "react";
import styles from './styles.module.scss'
import Slider from 'react-slick'
import Image from "next/image";
import { Button, Carousel } from "antd";
import { useEventListener, useHover, useSize } from "ahooks";
import classNames from "classnames/bind";
import { useIsMounted } from "hooks/useIsMounted";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

const cx = classNames.bind(styles)

interface TopBannerProps {
  bannerList: Record<string, any>[]
}

const TopBanner: React.FC<TopBannerProps> = (props) => {
  const { bannerList } = props
  console.log(bannerList)

  const isMobileSize = useMediaQuery("(max-width: 600px)")

  const isMounted = useIsMounted()
  const [activeIndex, setActiveIndex] = useState<number>(1)

  const ref = useRef<Slider>()

  const bannerRef = useRef<Record<string, any>>({})

  const size = useSize(() => document.querySelector('body'));

  const activeBannerDom = useMemo(() => {
    return isMounted && document.getElementsByClassName('slick-current')[0]
  }, [activeIndex, size])

  useEffect(() => {
    setActiveIndex(0)
  }, [])

  const isHovering = useHover(() => activeBannerDom, {
    onChange: (isHover) => console.log(isHover)
  })

  const leftBtnHovering = useHover(() => document.getElementsByClassName("slick-prev")[0])
  const rightBtnHovering = useHover(() => document.getElementsByClassName("slick-next")[0])


  return <Box className={styles.topBanner}>
    {
      isMobileSize ?
        <Carousel className={styles.mobileCarousel} >
          {
            bannerList.map((item, index) => {
              const { coversamll } = item
              let imageUrl

              // 不同宽度用不同图片
              imageUrl = coversamll?.data?.attributes?.url
              return <Box className={styles.mobileBannerItem} key={index} >
                <img src={imageUrl} />
              </Box>
            })
          }
        </Carousel>
        :
        <Slider
          // @ts-ignore
          ref={ref}
          className={cx({
            carousel: true,
            carouselBtn: isHovering || leftBtnHovering || rightBtnHovering
          })}
          dots={false}
          speed={500}
          centerMode={true}
          autoplay={true}
          autoplaySpeed={7000}
          infinite={true}
          slidesToShow={1}
          variableWidth={true}
          slidesToScroll={1}
          prevArrow={<Box><NavigateBeforeIcon /></Box>}
          nextArrow={<Box><NavigateNextIcon /></Box>}
          afterChange={(current) => {
            setActiveIndex(current)
          }}
        >
          {
            bannerList.map((item, index) => {
              const { coverlarge } = item
              // console.log(coverlarge)
              let imageUrl

              // 不同宽度用不同图片
              imageUrl = coverlarge?.data?.attributes?.url
              return <Box
                className={styles.bannerItem}
                key={index}
                ref={(r) => bannerRef.current[String(index)] = r}>
                <img src={imageUrl} />
              </Box>
            })
          }
        </Slider>
    }

  </Box>
}

export default TopBanner