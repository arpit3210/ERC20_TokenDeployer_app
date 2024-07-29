import React, { useState } from 'react';
import Web3 from 'web3';
import MyToken from "./constants/MyToken.json";
import './App.css';

const App = () => {
  const [name, setName] = useState('MyToken');
  const [symbol, setSymbol] = useState('MTK');
  const [supply, setSupply] = useState('1000000');
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState('');
  const [network, setNetwork] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [transactionHash, setTransactionHash] = useState('');
  const [isSuccessful, setIsSuccessful] = useState(null);

  const loadWeb3 = async () => {
    if (web3 && isConnected) {
      setWeb3(null);
      setAccount('');
      setNetwork('');
      setIsConnected(false);
      setTransactionHash('');
      setIsSuccessful(null);
      return;
    }

    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      await window.ethereum.enable();
      setWeb3(web3Instance);
      const accounts = await web3Instance.eth.getAccounts();
      setAccount(accounts[0]);
      setIsConnected(true);

      const networkId = await web3Instance.eth.net.getId();
      const networkName = getNetworkName(networkId);
      setNetwork(networkName);
    } else {
      alert('Please install MetaMask!');
    }
  };

  const getNetworkName = (networkId) => {
    switch (networkId) {
      case 1n:
        return 'Mainnet';
      case 11155111n:
        return 'Ethereum Sepolia';
      case 5n:
        return 'Goerli';
      case 42n:
        return 'Kovan';
      case 42161n:
        return 'Arbitrum One';
      case 10n:
        return 'Optimism Mainnet';
      default:
        return 'Unknown';
    }
  };

  const deployToken = async () => {
    if (!web3) return;
    if (!name || !symbol || !supply) {
      alert('Please provide valid token name, symbol, and total supply.');
      return;
    }
    const tokenABI = MyToken.abi;
    const tokenBytecode = MyToken.bytecode;
    const TokenContract = new web3.eth.Contract(tokenABI);
    TokenContract.deploy({
      data: tokenBytecode,
      arguments: [name, symbol, supply]
    })
      .send({ from: account })
      .on('receipt', receipt => {
        console.log('Contract deployed at address', receipt.contractAddress);
        setTransactionHash(receipt.transactionHash);
        setIsSuccessful(true);
      })
      .on('error', error => {
        console.error('Error deploying contract', error);
        setIsSuccessful(false);
      });
  };

  const trimAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
   <div>

<div className="absolute top-0 right-0 p-4">
          <button
            onClick={loadWeb3}
            className={`mb-2 py-2 px-4 rounded ${
              isConnected ? 'bg-green-500' : 'bg-red-500'
            } text-white`}
          >
            {isConnected ? 'Disconnect Wallet' : 'Connect Wallet'}
          </button>
          {isConnected && (
            <div className="text-right">
              <p className="text-gray-700">Network: {network}</p>
              <p className="text-gray-700">Wallet: {trimAddress(account)}</p>
            </div>
          )}
        </div>



        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <header className="relative bg-white shadow-lg rounded-lg p-8 w-full max-w-md">

        <h1 className="text-2xl font-bold mb-6 text-center">ERC20 Token Deployer</h1>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Token Name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
          <input
            type="text"
            placeholder="Token Symbol"
            value={symbol}
            onChange={e => setSymbol(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
          <input
            type="number"
            placeholder="Total Supply"
            value={supply}
            onChange={e => setSupply(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
          <button
            onClick={deployToken}
            className="w-full py-2 px-4 bg-blue-500 text-white rounded"
          >
            Deploy Token
          </button>
        </div>
        {isSuccessful !== null && (
          <div className="mt-6 text-center">
            {isSuccessful ? (
              <div className='flex flex-col'>
                <img src="https://media.giphy.com/media/2u11zpzwyMTy8/giphy.gif?cid=790b76119n2zxhtf2obn4wzgvuw40f8v6k0pk4e35hf0l8vt&ep=v1_gifs_search&rid=giphy.gif&ct=g" alt="Success" />
                <p className="text-green-500 mt-4">Token contract deployed successfully!</p>
                <p className="text-gray-700  test-sm">Transaction Hash:</p>
                <p className="text-gray-700  test-sm">{transactionHash}</p>
              </div>
            ) : (
              <div className='flex flex-col'>
                <img src="https://media.giphy.com/media/wIAzgC4sqiGaeKMhr2/giphy.gif?cid=790b7611wrlwv1nkd4lk2xr54r9v43k8kszspgtnm5wlgweh&ep=v1_gifs_search&rid=giphy.gif&ct=g" alt="Failure" />
                <p className="text-red-500 mt-4">Transaction failed. Please try again.</p>
              </div>
            )}
          </div>
        )}
      </header>
    </div>

   </div>
  );
};

export default App;
