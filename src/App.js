import './App.css';
import mintExampleAbi from './mintExampleAbi.json';
import { ethers, BigNumber } from 'ethers';
import { useState, useEffect } from 'react';

const mintExampleAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

function App() {
  const [accounts, setAccounts] = useState([]);
  const [mintAmount, setMintAmount] = useState(1);

  async function connectAccounts() {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      setAccounts(accounts);
    }
  }

  async function handleMint() {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        mintExampleAddress,
        mintExampleAbi.abi,
        signer
      );

      try {
        const response = await contract.mint(BigNumber.from(mintAmount));
        console.log('response', response);
      } catch (error) {
        console.log('error:', error);
      }
    }
  }

  useEffect(() => {
    connectAccounts();
  }, []);

  return (
    <div className='App'>
      This is how you create a mint button
      {accounts.length && (
        <div>
          <button onClick={() => setMintAmount(mintAmount - 1)}>-</button>
          {mintAmount}
          <button onClick={() => setMintAmount(mintAmount + 1)}>+</button>
          <button onClick={handleMint}>Mint</button>
        </div>
      )}
    </div>
  );
}

export default App;
