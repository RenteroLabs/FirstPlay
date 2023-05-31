import { useTranslations } from 'next-intl'
import React from 'react'
import { formatAddress } from 'util/format'

interface InviteeCardProps {
  invitor: string
}
const InviteeCard: React.FC<InviteeCardProps> = (props) => {
  const { invitor } = props
  const t = useTranslations('RewardPoint')

  return <div className='mx-4 pt-10 mb-[0.83rem]'>
    <div className='flex justify-center relative z-10'>
      <div className='h-24 w-24 rounded-full border-[3px] border-white box-content shadow-[0rem_0.83rem_1.67rem_0rem_rgba(0,0,0,0.2)]'>
        <img src="/profile_avatar.png" alt="profile logo" />
      </div>
    </div>
    <div className='mt-[-37px] h-[13rem] relative bg-white rounded-2xl before:block before:h-[5.33rem] before:bg-gradient-to-b before:from-[rgba(142,80,228,0.2)] before:to-[rgba(142,80,228,0)] before:rounded-t-2xl before:absolute before:top-0 before:inset-x-0'>
      <p className='text-base text-primary/50 font-Inter-Regular font-normal leading-[1.17rem] text-center mb-[1.67rem] pt-[4.33rem]'>{formatAddress(invitor, 4)}</p>
      <h3 className='text-2xl font-Inter-Medium font-medium leading-8 max-w-[25.33rem] md:max-w-max text-center mx-auto'>
        {/* Your friend <span className='text-boldColor'>{formatAddress(invitor, 4)}</span>  invites you to help get cash rewards. */}
        {t.rich("YourFriendInvite", {
          span: () => <span className='text-boldColor'>{formatAddress(invitor, 4)}</span>
        })}
      </h3>
    </div>
  </div>
}

export default InviteeCard