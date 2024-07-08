import React from "react";
import Header from "../Header.js";
import Navbar from "../Navbar.js";
import Project from "../Dashboard.js";
import { Buffer } from "buffer";
import process from "process";
import {
    ConnectionProvider,
    WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
    PhantomWalletAdapter,
    TorusWalletAdapter,
    LedgerWalletAdapter,
} from "@solana/wallet-adapter-wallets";

global.Buffer = Buffer;
global.process = process;

const SOLANA_MAINNET = "https://mainnet.helius-rpc.com/?api-key=4c4a4f43-145d-4406-b89c-36ad977bb738";


const wallets = [
    new PhantomWalletAdapter(),
    new TorusWalletAdapter(),
    new LedgerWalletAdapter(),
];
const Build = () => {
    return (
        <ConnectionProvider endpoint={SOLANA_MAINNET}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                        <Header />
                        <Navbar />
                        <Project />
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

export default Build;
