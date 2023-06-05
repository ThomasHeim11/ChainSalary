import { React, useState } from "react";
import { ethers } from "ethers";
import contractInfo from "./contract/SalaryAutomation.json";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Info from "./components/Info";
import NextSteps from "./components/NextSteps";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  // State variables
  const [account, setAccount] = useState([]);
  const [contract, setContract] = useState("");

  // Connect MetaMask account
  const connectAccount = async () => {
    try {
      if (window.ethereum) {
        const user = await window.ethereum.request({ method: "eth_requestAccounts" });
        setAccount(user);
      } else {
        window.alert("Need MetaMask Installed.")
      }
    } catch (error) {
      window.alert(error.message);
    }
  };

  // Deploys contract with relevant information provided by user
  const deployContract = async (event) => {
    event.preventDefault();
    let data = new FormData(event.target);
    let address = data.get("address");
    let salary = data.get("salary");
    let registry = data.get("registry");
  
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
  
      const network = await provider.getNetwork();
  
      // Check if the user is connected to the Sepolia Testnet
      if (network.chainId === 11155111) {
        try {
          const signer = provider.getSigner();
  
          address = ethers.utils.getAddress(address);
          registry = ethers.utils.getAddress(registry);
          salary = parseInt(salary);
  
          const factory = new ethers.ContractFactory(contractInfo.abi, contractInfo.bytecode, signer);
  
          const contract = await factory.deploy(registry, salary, address);
          const id = toast.loading("Deploying contract...", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            className: "ToastMessage"
          });
  
          await contract.deployed();
          toast.update(id, { render: "Contract deployed!", type: "success", isLoading: false, className: "ToastMessage" });
  
          setContract(contract.address);
        } catch (error) {
          window.alert(error.message);
        }
      } else {
        window.alert("Need to be on Sepolia Testnet");
      }
    } catch (error) {
      window.alert(error.message);
    }
  };
  

  return (
    <div className="App">
      {account.length ?
        (
          <div className="Input">
            <div>
              <label className="WalletLabel">Connected Wallet: {account[0]}</label>
              <label className="NetworkLabel">Ethereum Sepolia</label>
            </div>
            <div className="line"></div>
            <label className="InputInfo">~~~ Enter the following information ~~~</label>
            <form className="InputForm" onSubmit={deployContract}>
              <div className="InputLine">
                <label>Employee's Address : </label>
                <input name="address" type="text" className="InputDetail1" />
              </div>
              <div className="InputLine">
                <label className="tooltip">Employee's Salary<span className="tooltiptext">Salary amount will get rounded down if decimal added.</span></label>
                <label> (Biweekly) : </label>
                <input name="salary" type="text" className="InputDetail2" placeholder="in USD" />
              </div>
              <div className="InputLine">
                <label>Chainlink Keepers Registry Address : </label>
                <input name="registry" type="text" className="InputDetail1" />
              </div>
              <button type="submit" className="Deploy">Deploy</button>
              <div className="line"></div>
            </form>
            <div className="Deployed">
              <label className="DeployedContractInfo">Deployed Contract Address : {contract}</label>
              <label className="NextStepsInfo">Next Steps : </label>
              <NextSteps />
            </div>
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </div>
        ) :
        (
          <div className="App">
            <Header />
            <Info />
            <button className="ConnectWallet" onClick={connectAccount}>Connect Wallet</button>
            <Footer />
          </div>
        )
      }
    </div>
  );
}

export default App;
