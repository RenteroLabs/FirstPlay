import { Modal } from "antd";
import { useTranslations } from "next-intl";
import React from "react";

interface InviteConnectModalProps {
  showModal: boolean
  setShowModal: (arg: boolean) => any
}
const InviteConnectModal: React.FC<InviteConnectModalProps> = (props) => {
  const { showModal, setShowModal } = props

  const t = useTranslations('RewardPoint')

  return <Modal
    open={showModal}
    onCancel={() => setShowModal(false)}
    centered
    title=""
    footer={null}
  >
    <div className="flex flex-col justify-center">
      <h3 className="text-[3rem] text-[#FFBB2A] font-Inter-SemiBold font-semibold leading-[2.67rem]">+100</h3>
      <h4>{t('ModalInviteSuccess')}</h4>
      <p>{t('ModalHelpedFriends')}</p>
    </div>
  </Modal>
}

export default InviteConnectModal