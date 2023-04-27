import React, { useEffect } from "react";
import { useAccount, useConnect } from "wagmi";

export const Web3AuthWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {

  const { connect, connectors, pendingConnector } = useConnect();
  const { isDisconnected, address, isConnected, status, connector } = useAccount();
  const [MetaMaskConnector, WalletConnectConnector, UnipassConnector, GoogleConnector] = connectors

  useEffect(() => {
    console.log(isDisconnected, address, isConnected, status, connector, pendingConnector)
    // if (status !== 'disconnected') return

    const wagmiConnected = localStorage.getItem("wagmi.connected");
    const walletType = localStorage.getItem("wagmi.wallet");
    console.log(wagmiConnected, walletType)

    // 如果是 Web3AuthConnector 连接，页面刷新后，需要重新手动连接调用，wagmi 的 autoConnect 无效
    if (walletType === '"web3auth"') {
      if (wagmiConnected === 'true') {
        console.log("connect")
        connect({ connector: GoogleConnector })
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