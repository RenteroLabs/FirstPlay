import React from "react";
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import { Divider, SvgIcon } from "@mui/material";

const InviteFriend = () => {

  return <div className="bg-white rounded-2xl mx-4 mt-4 px-3 py-[1.33rem]">
    <h4 className="text-2xl text-primary font-semibold font-Inter-SemiBold leading-6 mb-[0.67rem]">Invite friends</h4>
    <p className="text-base text-primary font-Inter-Regular font-normal leading-[1.17rem] mb-[2.17rem]">Invite friends to earn combined rewards.</p>

    <div className="relative h-[19.5rem] bg-[rgba(142,80,228,0.08)] rounded-2xl px-[0.83rem] ">
      <div className="absolute inset-x-0 h-[45px]  top-[-0.5rem]">
        <div className="w-[23.34rem] h-[45px] bg-[url('/invite_info_bg_banner.png')] bg-cover bg-no-repeat bg-center mx-auto text-center text-base text-white font-Inter-Medium font-medium pt-[0.83rem]">
          Successfully invited someone
        </div>
      </div>

      <div className="flex justify-around items-center mb-[1.67rem]  pt-[4.25rem]">
        <div className="flex flex-col justify-center items-center ">
          <h3 className="text-4xl text-boldColor font-Inter-SemiBold font-semibold leading-[1.67rem] mb-[0.83rem]">+100</h3>
          <p className="text-[1rem] text-boldColor font-Inter-Medium font-medium mb-0">Complete registration</p>
        </div>
        <p className="text-4xl text-boldColor font-Inter-SemiBold font-semibold leading-[1.67rem] mb-0">&</p>
        <div className="flex flex-col justify-center items-center ">
          <h3 className="text-4xl text-boldColor font-Inter-SemiBold font-semibold leading-[1.67rem] mb-[0.83rem]">+200</h3>
          <p className="text-[1rem] text-boldColor font-Inter-Medium font-medium mb-0">Complete a bounty</p>
        </div>
      </div>
      <Divider className="text-base font-Inter-SemiBold font-semibold leading-[1.17rem]" >Invite</Divider>
      <div className="flex justify-around mt-[1.67rem]">
        <div className="flex flex-col items-center">
          <div className="h-[3.67rem] w-[3.67rem] rounded-full bg-primary inline-flex items-center justify-center">
            <img src="/Twitter-Logo-Carnival.png" className="scale-90" />
          </div>
          <span className="underline mt-[0.83rem] text-[1rem] font-Inter-Medium font-medium leading-4">Twitter</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="h-[3.67rem] w-[3.67rem] rounded-full bg-primary inline-flex items-center justify-center">
            <img src="/Telegram-Logo-Carnival.png" className="scale-90" />
          </div>
          <span className="underline mt-[0.83rem]  text-[1rem] font-Inter-Medium font-medium leading-4">Telegram</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="h-[3.67rem] w-[3.67rem] rounded-full bg-primary inline-flex items-center justify-center">
            <svg t="1683617425080" class="icon" viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2482" width="24" height="24"><path d="M320.032 704c17.6 17.6 47.264 16.736 65.952-1.952l316.128-316.128c18.656-18.656 19.552-48.352 1.952-65.952s-47.264-16.736-65.952 1.952l-316.128 316.128c-18.656 18.656-19.552 48.352-1.952 65.952zM476.928 675.104c4.576 9.056 6.976 19.168 6.976 29.696 0 17.6-6.752 34.048-19.008 46.304l-163.392 163.392c-12.256 12.256-28.704 18.976-46.304 18.976s-34.048-6.752-46.304-18.976l-99.392-99.392c-12.256-12.256-19.008-28.704-19.008-46.304s6.752-34.048 19.008-46.304l163.392-163.392c12.256-12.256 28.704-19.008 46.304-19.008 10.528 0 20.64 2.432 29.696 6.976l65.344-65.344c-27.872-21.408-61.44-32.16-95.04-32.16-40 0-79.968 15.168-110.304 45.504l-163.392 163.392c-60.672 60.672-60.672 159.936 0 220.608l99.392 99.392c30.336 30.336 70.304 45.504 110.304 45.504s79.968-15.168 110.304-45.504l163.392-163.392c55.808-55.808 60.224-144.288 13.344-205.344l-65.344 65.344zM978.528 144.896l-99.392-99.392c-30.336-30.336-70.304-45.504-110.304-45.504s-79.968 15.168-110.304 45.504l-163.392 163.392c-55.808 55.808-60.224 144.288-13.344 205.344l65.344-65.344c-4.544-9.056-6.976-19.168-6.976-29.696 0-17.6 6.752-34.048 18.976-46.304l163.392-163.392c12.256-12.256 28.704-19.008 46.304-19.008s34.048 6.752 46.304 19.008l99.392 99.392c12.256 12.256 18.976 28.704 18.976 46.304s-6.752 34.048-18.976 46.304l-163.392 163.392c-12.256 12.256-28.704 19.008-46.304 19.008-10.528 0-20.64-2.432-29.696-6.976l-65.344 65.344c27.872 21.408 61.44 32.16 95.04 32.16 40 0 79.968-15.168 110.304-45.504l163.392-163.392c60.672-60.672 60.672-159.936 0-220.608z" fill="#ffffff" p-id="2483"></path></svg>
          </div>
          <span className="underline mt-[0.83rem] text-[1rem] font-Inter-Medium font-medium leading-4">Copy Link</span>
        </div>
      </div>
    </div>


    <h5 className="flex justify-between items-center mb-[1.33rem] mt-[1.67rem]">
      <p className="text-primary text-base font-semibold font-Inter-SemiBold leading-[1.17rem] mb-0">Invitees</p>
      <span className="text-primary/50 text-[1rem] font-Inter-Medium font-medium leading-4 cursor-pointer underline">View all</span>
    </h5>
    <div className="flex items-center justify-between text-base text-primary font-Inter-Regular font-normal leading-[1.17rem]">
      <img src="/profile_avatar.png" className="w-8 h-8 rounded-full flex-none" />
      <p className="glow-1 mb-0 mx-[0.67rem]" style={{ flexGrow: 1 }}>0x173...3849 registartion</p>
      <span className="flex-none">+100</span>
    </div>
  </div>
}

export default InviteFriend