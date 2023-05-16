import { Modal } from "antd";
import React from "react";

interface MobileOnlyTipProps {
  showModal: boolean
  setShowModal: (show: boolean) => void
}
const MobileOnlyTip: React.FC<MobileOnlyTipProps> = (props) => {
  const { showModal, setShowModal } = props

  return <Modal
    open={showModal}
    onCancel={() => setShowModal(false)}
    title=""
    centered
    footer={null}
    className="rounded-[1.33rem] overflow-hidden"
  >
    <div className="text-center my-[40px]">
      <h3 className="text-[2.5rem] font-Inter-SemiBold font-semibold leading-[2.5rem]">Mobile only!</h3>
      <p className="text-2xl font-Inter-Medium font-medium leading-[2.33rem] mt-[1.58rem] max-w-[31.92rem] mx-auto">You can access <span className="text-boldColor">firstplay.app</span> on the mobile terminal to get this benefit !
      </p>
    </div>
  </Modal>
}

export default MobileOnlyTip