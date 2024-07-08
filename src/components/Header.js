
import React from "react";
import logo from "../images/logo.png";
import profilePicture from "../images/logo.png"; // Adjust the path relative to 'Header.js'
import { Adapter, WalletAdapter } from "./web3/walletAdapter/adapter.js";
const Header = () => {
     const [setWalletAddress] = React.useState(null);
    // Example profile picture URL or use props if passed down
    const profilePicUrl = profilePicture;

    return (
      <div className="header">
        <img className="logo" src={logo} alt="Logo" />
        <div className="profile">
          <img className="profile-pic" src={profilePicUrl} alt="Profile" />
        </div>
        <div>
          <Adapter>
            <WalletAdapter className='con-btn' setWalletAddress={setWalletAddress} />
          </Adapter>
        </div>
      </div>
    );
};

export default Header;
