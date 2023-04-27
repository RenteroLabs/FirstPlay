// Web3Auth Libraries
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { CHAIN_NAMESPACES } from "@web3auth/base";
import { TorusWalletConnectorPlugin } from "@web3auth/torus-wallet-connector-plugin";
import { Chain } from "wagmi";

const iconUrl = "https://web3auth.io/docs/contents/logo-ethereum.png";

export default function Web3AuthConnectorInstance(chains: Chain[]) {
  // Create Web3Auth Instance
  const web3AuthInstance = new Web3AuthNoModal({
    clientId: "BC4DKpIKdjIc8ceOqBWFcxHtubDYPZ95A80JspWi_7TwxPyKhnjp3-vzz9cwzS4qmfM7iUjNGZNdl-ovEmXEDDA",
    web3AuthNetwork: "cyan",
    chainConfig: {
      chainNamespace: CHAIN_NAMESPACES.EIP155,
      chainId: "0x" + chains[0].id.toString(16),
      rpcTarget: chains[0].rpcUrls.default.http[0],
      displayName: chains[0].name,
      tickerName: chains[0].nativeCurrency?.name,
      ticker: chains[0].nativeCurrency?.symbol,
    },
  });

  // Add openlogin adapter for customisations
  const openloginAdapterInstance =  new OpenloginAdapter({
    adapterSettings: {
      network: "cyan",
      uxMode: "popup",
      whiteLabel: {
        name: "FirstPlay",
        logoLight: "https://firstplay-crm.s3.ap-east-1.amazonaws.com/favicon_b2dac3c54c.png",
        logoDark: "https://firstplay-crm.s3.ap-east-1.amazonaws.com/favicon_b2dac3c54c.png",
        defaultLanguage: "en",
        dark: true, // whether to enable dark mode. defaultValue: false
      },
    },
  });
  web3AuthInstance.configureAdapter(openloginAdapterInstance);

  // Add Torus Wallet Plugin (optional)
  const torusPlugin = new TorusWalletConnectorPlugin({
    torusWalletOpts: {
      buttonPosition: "bottom-left",
    },
    walletInitOptions: {
      whiteLabel: {
        theme: { isDark: false, colors: { primary: "#00a8ff" } },
        logoDark: iconUrl,
        logoLight: iconUrl,
      },
      useWalletConnect: true,
      enableLogging: true,
    },
  });
  web3AuthInstance.addPlugin(torusPlugin);

  return web3AuthInstance
  // return new Web3AuthConnector({
  //   chains: chains,
  //   options: {
  //     web3AuthInstance,
  //     loginParams: {
  //       loginProvider: "google",
  //     },
  //   },
  // });
}
