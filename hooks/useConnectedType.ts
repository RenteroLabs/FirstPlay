import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export function useConnectedType() {
  const [connectedType, setConnectedType] = useState<string>("")

  const { address } = useAccount()

  useEffect(() => {
    const type = window.localStorage.getItem('wagmi.wallet')
    console.log(type)
    setConnectedType(type)
  }, [address])

  return connectedType
}