import React, { useState, useLayoutEffect } from "react";
import "./App.css";
import Navbar from "./Navbar";
import { ethers } from "ethers";
import Tether from "../artifacts/contracts/Tether.sol/Tether.json";
import RWD from "../artifacts/contracts/RWD.sol/RWD.json";
import DecentralBank from "../artifacts/contracts/DecentralBank.sol/DecentralBank.json";
import ParticleSettings from "./Particles";
import Main from "./Main";

const App = () => {
  const [account, setAccount] = useState("0x0");
  const [tether, setTether] = useState({});
  const [rwd, setRwd] = useState({});
  const [decentralBank, setDecentralBank] = useState({});
  const [tetherBalance, setTetherBalance] = useState("0");
  const [rwdBalance, setRwdBalance] = useState("0");
  const [stakingBalance, setStakingBalance] = useState("0");
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    loadWeb3();
  }, []);

  const loadWeb3 = async () => {
    if (window.ethereum) {
      // connect wallet to site and get accounts
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      await loadBlockChainData(accounts[0], signer);
    } else {
      window.alert(
        "No ethereum browser detected!. You can check out metamask!"
      );
    }
  };

  const loadBlockChainData = async (account, signer) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setAccount(account);
    const { chainId } = await provider.getNetwork();

    // Load Tether Contract
    const tetherContractAddress = "0xc3e53F4d16Ae77Db1c982e75a937B9f60FE63690";
    const rwdContractAddress = "0x84eA74d481Ee0A5332c457a4d796187F6Ba67fEB";
    const decentralBankContractAddress =
      "0x9E545E3C0baAB3E08CdfD552C960A1050f373042";

    const tether = new ethers.Contract(
      tetherContractAddress,
      Tether.abi,
      signer
    );

    setTether(tether);
    const tetherBalance = await tether.balanceOf(account);
    setTetherBalance(tetherBalance.toString());

    // Load RWD Contract
    const rwd = new ethers.Contract(rwdContractAddress, RWD.abi, signer);
    setRwd(rwd);
    const rwdBalance = await rwd.balanceOf(account);
    setRwdBalance(rwdBalance.toString());

    // Load DecentralBank Contract
    const decentralBank = new ethers.Contract(
      decentralBankContractAddress,
      DecentralBank.abi,
      signer
    );
    setDecentralBank(decentralBank);
    let stakingBalance = await decentralBank.stakingBalance(account);
    setStakingBalance(stakingBalance.toString());
    setLoading(false);
  };

  const stakeTokens = async (amount) => {
    setLoading(false);
    tether.approve(decentralBank.address, amount);
    const tx = await decentralBank.depositTokens(amount);

    await tx.wait();

    setLoading(false);
  };

  const unstakeTokens = async () => {
    setLoading(false)
    const tx = await decentralBank
      .unstakeTokens()
      await tx.wait();

  };

  let content;

  content = loading
    ? (content = (
        <p
          id="loader"
          className="text-center"
          style={{ color: "white", margin: "30px" }}
        >
          LOADING PLEASE...
        </p>
      ))
    : (content = (
        <Main
          tetherBalance={tetherBalance}
          rwdBalance={rwdBalance}
          stakingBalance={stakingBalance}
          stakeTokens={stakeTokens}
          unstakeTokens={unstakeTokens}
          // decentralBankContract={this.decentralBank}
        />
      ));

  return (
    <>
      <div className="App" style={{ position: "relative" }}>
        <div style={{ position: "absolute" }}>
          <ParticleSettings />
        </div>
        <Navbar account={account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main
              role="main"
              className="col-lg-12 ml-auto mr-auto"
              style={{ maxWidth: "600px", minHeight: "100vm" }}
            >
              <div>{content}</div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
