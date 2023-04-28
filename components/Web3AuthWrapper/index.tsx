import React, { useEffect } from "react";
import { useAccount, useConnect } from "wagmi";

export const Web3AuthWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {

  const { connect, connectors, pendingConnector } = useConnect();
  const { isDisconnected, address, isConnected, status, connector } = useAccount();
  const [
    MetaMaskConnector,
    WalletConnectConnector,
    UnipassConnector,
    GoogleConnector,
    FacebookConnector,
    TwitterConnector
  ] = connectors

  useEffect(() => {
    console.log(isDisconnected, address, isConnected, status, connector, pendingConnector)
    // if (status !== 'disconnected') return

    const wagmiConnected = localStorage.getItem("wagmi.connected");
    const walletType = localStorage.getItem("wagmi.wallet");
    const loginType = localStorage.getItem("openlogin_store") as string;

    console.log(wagmiConnected, walletType, JSON.parse(loginType).typeOfLogin)

    // 如果是 Web3AuthConnector 连接，页面刷新后，需要重新手动连接调用，wagmi 的 autoConnect 无效
    if (walletType === '"web3auth"') {
      if (wagmiConnected === 'true') {
        console.log("connect")
        switch (JSON.parse(loginType).typeOfLogin) {
          case 'google': connect({ connector: GoogleConnector }); break;
          case 'facebook': connect({ connector: FacebookConnector }); break;
          case 'twitter': connect({ connector: TwitterConnector }); break;
        }
      }
    }
  }, [])

  useEffect(() => {
    console.log(isDisconnected, address, isConnected, status, connector, pendingConnector)
  }, [isDisconnected, address, isConnected, status, connector, pendingConnector])

  return (
    <>{children}</>
  );
};