import "./styles/App.css";
import twitterLogo from "./assets/twitter-logo.svg";
import React, { useEffect, useState } from "react";
import { listenForEvent, tryToMintToken } from "./utils/mint.utils";
import { ConnectButton, MintButton, LogoutButton } from "./modules/buttons";

// Constants
const TWITTER_HANDLE = "_buildspace";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const OPENSEA_LINK = "";
const CONTRACT_ADDRESS = "0x157Dc71B95C2D1Ac5eD8F445ddCdc413fc86Db84";

const hasWallet = () => {
  const { ethereum } = window;
  return !!ethereum;
};

const logIn = () => window.ethereum.request({ method: "eth_requestAccounts" });

const getAccount = () => window.ethereum.request({ method: "eth_accounts" });

const App = () => {
  // Render Methods

  const [account, setAccount] = useState("");

  useEffect(async () => {}, []);

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">NFTang</p>
          <p className="sub-text">what's good y'all?</p>
          <p className="sub-text">
            currently{" "}
            {account ? `authenticated as ${account}` : "not authenticated"}
          </p>
          {account ? (
            <>
              <div>
                <MintButton
                  onClick={() => tryToMintToken({ CONTRACT_ADDRESS })}
                />
              </div>
              <div>
                <LogoutButton setAccount={setAccount} />
              </div>
            </>
          ) : (
            <ConnectButton
              onClick={async () => {
                await logIn();
                const availableAccounts = await getAccount();
                setAccount(availableAccounts[0]);
                listenForEvent({ CONTRACT_ADDRESS });
                console.log("authenticated with", availableAccounts[0]);
              }}
            />
          )}
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
