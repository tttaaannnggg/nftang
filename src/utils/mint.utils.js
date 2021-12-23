import { ethers } from "ethers";
import nftang from "./NFTang.json";
export const listenForEvent = ({ CONTRACT_ADDRESS }) => {
  try {
    const { ethereum } = window;
    if (!ethereum) {
      return console.error("no ethereum window object found!");
    }
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const connectedContract = new ethers.Contract(
      CONTRACT_ADDRESS,
      nftang.abi,
      signer
    );
    connectedContract.on("MintSuccess", (from, tokenId) => {
      console.log(from, tokenId.toNumber());
      console.log(
        `minting may be done. find it at https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}/${tokenId.toNumber()}`
      );
    });
  } catch (e) {
    console.error(e);
  }
};

export const tryToMintToken = async ({ CONTRACT_ADDRESS }) => {
  try {
    const { ethereum } = window;
    if (!ethereum) {
      return console.error("no ethereum window object found!");
    }
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const connectedContract = new ethers.Contract(
      CONTRACT_ADDRESS,
      nftang.abi,
      signer
    );
    console.log("asking for gas for mint");
    let nftTxn = await connectedContract.makeNFTang();

    console.log("minting in process");
    await nftTxn.wait();
    console.log(`mined. see: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`);
  } catch (e) {
    console.error(e);
  }
};
