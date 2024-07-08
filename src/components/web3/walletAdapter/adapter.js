import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  ConnectionProvider,
  WalletProvider,
  useWallet,
} from "@solana/wallet-adapter-react";
import {
  TorusWalletAdapter,
  LedgerWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import {
  WalletMultiButton,
  WalletModalProvider,
} from "@solana/wallet-adapter-react-ui";

const SOLANA_MAINNET =
  "https://mainnet.helius-rpc.com/?api-key=4c4a4f43-145d-4406-b89c-36ad977bb738";

const WalletAdapter = ({ setWalletAddress }) => {
  const { publicKey } = useWallet();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (publicKey) {
      setWalletAddress(publicKey.toBase58());
    }
  }, [publicKey, setWalletAddress]);

  const buttonStyle = {
    padding: "10px 14px",
    borderRadius: "13px",
    margin: "8px 10px",
    border: "none",
    background: isHovered ? "#3a6c01" : "#8cff05",
    color: "white",
    fontWeight: "bolder",
    cursor: "pointer",
  };

  return (
    <WalletMultiButton
      style={buttonStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    />
  );
};

WalletAdapter.propTypes = {
  setWalletAddress: PropTypes.func.isRequired,
};

const Adapter = ({ children }) => {
  const wallets = [
    new TorusWalletAdapter(),
    new LedgerWalletAdapter(),
    new SolflareWalletAdapter({ network: "mainnet-beta" }),
  ];

  return (
    <ConnectionProvider endpoint={SOLANA_MAINNET}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

Adapter.propTypes = {
  children: PropTypes.node.isRequired,
};

export { WalletAdapter, Adapter };
