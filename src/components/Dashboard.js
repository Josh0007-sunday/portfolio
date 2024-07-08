import React, { useState, useEffect } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { FaEye, FaEyeSlash, FaTachometerAlt } from "react-icons/fa";
import { WalletAdapter, Adapter } from "./web3/walletAdapter/adapter.js";
import {
  getSolBalance,
  getSolPriceInUSD,
  getNfts,
  getTokenAccounts,
  getStakeAccounts,
} from "./web3/portfolio/portfolio.js";
const Project = () => {
  const [showBalance, setShowBalance] = useState(true);
  const [walletAddress, setWalletAddress] = React.useState(null);
  const [solBalance, setSolBalance] = useState(0);
  const [solPrice, setSolPrice] = useState(0);
  const [nfts, setNfts] = useState([]);
  const [tokenAccounts, setTokenAccounts] = useState([]);
  const [stakeAccounts, setStakeAccounts] = useState([]);
  const [usdBalance, setUsdBalance] = useState(0);

  const toggleBalance = () => {
    setShowBalance((prevShowBalance) => !prevShowBalance);
  };

  const data = [
    { id: 0, value: 10, color: "#8cff05", label: "series A" },
    { id: 1, value: 15, color: "#4e9002", label: "series B" },
    { id: 2, value: 20, color: "#1f3a00", label: "series C" },
  ];

  const obfuscateValue = (value) => "*".repeat(value.length);

  useEffect(() => {
    if (walletAddress) {
      getSolBalance(walletAddress).then(setSolBalance).catch(console.error);
      getSolPriceInUSD().then(setSolPrice).catch(console.error);
      getNfts(walletAddress).then(setNfts).catch(console.error);
      getTokenAccounts(walletAddress)
        .then(setTokenAccounts)
        .catch(console.error);
      getStakeAccounts(walletAddress)
        .then(setStakeAccounts)
        .catch(console.error);
    }
  }, [walletAddress]);

  useEffect(() => {
    setUsdBalance(solBalance * solPrice);
  }, [solBalance, solPrice]);

  return (
    <Adapter>
      <WalletAdapter setWalletAddress={setWalletAddress} />
      <div className="project">
        <section className="section">
          <section className="titletext">
            <h1>Dashboard</h1>
            <span>
              <FaTachometerAlt />
            </span>
          </section>
          <div className="pcontainer">
            <div className="projectcard">
              <p className="titletxt">Net Worth:</p>
              <button onClick={toggleBalance} className="toggle-btn">
                {showBalance ? <FaEyeSlash /> : <FaEye />}{" "}
                {showBalance ? "Hide Balance" : "View Balance"}
              </button>
              <div className="balance">
                <div className="balance-card">
                  <h1>
                    {showBalance
                      ? usdBalance.toFixed(2)
                      : obfuscateValue("1000")}
                  </h1>
                  <p>
                    <span>
                      {showBalance ? solBalance : obfuscateValue("0.82456098")}
                    </span>{" "}
                    SOL
                  </p>
                </div>
                <div className="balance-card">
                  <h1>
                    {showBalance ? nfts.length : obfuscateValue("10 NFTs")}
                  </h1>
                  <p>
                    Husky NFT{" "}
                    <span>{showBalance ? "5" : obfuscateValue("5")}</span>
                  </p>
                </div>
                <div className="balance-card">
                  <h1>
                    {showBalance
                      ? tokenAccounts.length
                      : obfuscateValue("10 NFTs")}
                  </h1>
                  <p>
                    Husky NFT{" "}
                    <span>
                      {showBalance ? stakeAccounts.length : obfuscateValue("5")}
                    </span>
                  </p>
                </div>
              </div>
              <div>
                <button className="con-btn2">Connect Wallet</button>
                <p className="titletxt">Wallet Address</p>
                <div className="balance2">
                  <p>{walletAddress}</p>
                </div>
                <div className="profile-pic-frame">
                  <img src="https://via.placeholder.com/100" alt="Profile" />
                </div>
              </div>
            </div>
            <div className="projectcard">
              <p className="titletxt">
                Transactions <span></span>
              </p>
              <ul className="transaction-list">
                <li>Sent $500 to Solflarex.com</li>
                {/* Repeat transactions as necessary */}
              </ul>
            </div>
            <div className="projectcard">
              <div className="charts">
                <PieChart
                  series={[
                    {
                      data,
                      highlightScope: {
                        faded: "global",
                        highlighted: "item",
                      },
                      faded: {
                        innerRadius: 30,
                        additionalRadius: -30,
                        color: "gray",
                      },
                    },
                  ]}
                  slotProps={{
                    legend: {
                      labelStyle: {
                        fontSize: 14,
                        fill: "#8cff05",
                      },
                    },
                  }}
                  height={200}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </Adapter>
  );
};

export default Project;
