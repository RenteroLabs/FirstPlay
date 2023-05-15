import { Modal } from "antd";
import React from "react";

interface InviteConnectModalProps {
  showModal: boolean
  setShowModal: (arg: boolean) => any
}
const InviteConnectModal: React.FC<InviteConnectModalProps> = (props) => {
  const { showModal, setShowModal } = props


  return <Modal
    open={showModal}
    onCancel={() => setShowModal(false)}
    centered
    title=""
    footer={null}
  >
    <div className="flex flex-col justify-center">
      <h3 className="text-[3rem] text-[#FFBB2A] font-Inter-SemiBold font-semibold leading-[2.67rem]">+100</h3>
      <h4>Invite Successful</h4>
      <p>You have successfully helped your friend</p>
    </div>
  </Modal>
}

export default InviteConnectModal