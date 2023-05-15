import { List, Modal } from "antd";
import React from "react";
import { dateFormat, formatAddress } from "util/format";

interface InviteeModalProps {
  inviteeList: Record<string, any>[]
  showModal: boolean
  setShowModal: (arg: boolean) => any
}
const InviteeModal: React.FC<InviteeModalProps> = (props) => {
  const { inviteeList, showModal, setShowModal } = props

  return <Modal
    open={showModal}
    onCancel={() => setShowModal(false)}
    title="Invitee List"
    centered
    footer={null}
  >
    <List
      className="my-4 mb-0"
      dataSource={inviteeList}
      renderItem={(item) => <List.Item style={{ padding: '0'}}>
        <div className="w-full flex items-center justify-between text-base text-primary font-Inter-Regular font-normal leading-[1.17rem] my-2">
          <img src="/profile_avatar.png" className="w-8 h-8 rounded-full flex-none" />
          <div className="glow-1 mb-0 mx-[0.67rem]" style={{ flexGrow: 1 }}>{formatAddress(item?.invitee, 4)} {item?.type}</div>
          <span className="flex-none">+{item?.change}</span>
          {/* <span>{dateFormat("YYYY-mm-dd HH:MM", new Date(item?.timestamp * 1000))}</span> */}
        </div>
      </List.Item>}
    />

  </Modal>
}

export default InviteeModal