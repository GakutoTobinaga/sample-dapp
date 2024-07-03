"use client"
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

// スマートコントラクトのアドレスとABI
const CONTRACT_ADDRESS = '0x0308AE9F2048E7AFA2bc7348A5926FFB175e8Fa9';
const ABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "getMessage",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "message",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

export default function Home() {
  const [message, setMessage] = useState('');
  const [chainId, setChainId] = useState("");
  // スマートコントラクトからメッセージを取得する関数
  async function fetchMessage() {
    if (typeof window.ethereum !== 'undefined') {
      const account = await window.ethereum.request({ method: "eth_requestAccounts" });
      const claimedChainId = parseInt(await window.ethereum.request({ method: "eth_chainId" }));
      if (account.length > 0) {
        console.log(account[0], chainId)
        setChainId(claimedChainId)
      }
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
      try {
        const data = await contract.getMessage();
        setMessage(data);
      } catch (err) {
        console.error('Error:', err);
      }
    }
  }

  // ページロード時にメッセージを取得
  useEffect(() => {
    fetchMessage();
  }, []);

  return (
    <>
      <div className="container mx-auto p-4 flex items-center justify-center">
        <h1 className="text-2xl font-bold">Hello World DApp</h1>
        <p>{chainId}</p>
      </div>
      <div className='flex items-center justify-center'>
        <p className="mt-4">{message}</p>
      </div>
    </>
  );
}
