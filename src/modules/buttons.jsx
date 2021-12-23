import React from "react";

export const ConnectButton = ({ onClick }) => (
  <button className="cta-button connect-wallet-button" onClick={onClick}>
    Connect to Wallet
  </button>
);

export const MintButton = ({ onClick }) => (
  <button className="cta-button mint-button" onClick={onClick}>
    mint!
  </button>
);

export const LogoutButton = ({ setAccount }) => (
  <>
    <button onClick={() => setAccount("")}>log out</button>
  </>
);
