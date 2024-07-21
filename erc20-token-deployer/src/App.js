import React, { useState } from 'react';
import Web3 from 'web3';
import './App.css';
// import abi from "../constants/abi_contracts.js"

const App = () => {
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [supply, setSupply] = useState('');
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState('');

  const loadWeb3 = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      setWeb3(web3);
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
    } else {
      alert('Please install MetaMask!');
    }
  };

  const deployToken = async () => {
    if (!web3) return;
    const tokenABI =  [
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "symbol",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "initialSupply",
            "type": "uint256"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "spender",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "allowance",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "needed",
            "type": "uint256"
          }
        ],
        "name": "ERC20InsufficientAllowance",
        "type": "error"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "sender",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "balance",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "needed",
            "type": "uint256"
          }
        ],
        "name": "ERC20InsufficientBalance",
        "type": "error"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "approver",
            "type": "address"
          }
        ],
        "name": "ERC20InvalidApprover",
        "type": "error"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "receiver",
            "type": "address"
          }
        ],
        "name": "ERC20InvalidReceiver",
        "type": "error"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "sender",
            "type": "address"
          }
        ],
        "name": "ERC20InvalidSender",
        "type": "error"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "spender",
            "type": "address"
          }
        ],
        "name": "ERC20InvalidSpender",
        "type": "error"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "spender",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "Approval",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "Transfer",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "spender",
            "type": "address"
          }
        ],
        "name": "allowance",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "spender",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "approve",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "account",
            "type": "address"
          }
        ],
        "name": "balanceOf",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "decimals",
        "outputs": [
          {
            "internalType": "uint8",
            "name": "",
            "type": "uint8"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "name",
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
        "name": "symbol",
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
        "name": "totalSupply",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "transfer",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "transferFrom",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ];
    const tokenBytecode = "0x608060405234801562000010575f80fd5b50604051620019e1380380620019e1833981810160405281019062000036919062000519565b82828160039081620000499190620007de565b5080600490816200005b9190620007de565b5050506200009d3362000073620000a660201b60201c565b60ff16600a62000084919062000a3f565b8362000091919062000a8f565b620000ae60201b60201c565b50505062000bd8565b5f6012905090565b5f73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff160362000121575f6040517fec442f0500000000000000000000000000000000000000000000000000000000815260040162000118919062000b1c565b60405180910390fd5b620001345f83836200013860201b60201c565b5050565b5f73ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16036200018c578060025f8282546200017f919062000b37565b925050819055506200025d565b5f805f8573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205490508181101562000218578381836040517fe450d38c0000000000000000000000000000000000000000000000000000000081526004016200020f9392919062000b82565b60405180910390fd5b8181035f808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f2081905550505b5f73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603620002a6578060025f8282540392505081905550620002f0565b805f808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f82825401925050819055505b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040516200034f919062000bbd565b60405180910390a3505050565b5f604051905090565b5f80fd5b5f80fd5b5f80fd5b5f80fd5b5f601f19601f8301169050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52604160045260245ffd5b620003bd8262000375565b810181811067ffffffffffffffff82111715620003df57620003de62000385565b5b80604052505050565b5f620003f36200035c565b9050620004018282620003b2565b919050565b5f67ffffffffffffffff82111562000423576200042262000385565b5b6200042e8262000375565b9050602081019050919050565b5f5b838110156200045a5780820151818401526020810190506200043d565b5f8484015250505050565b5f6200047b620004758462000406565b620003e8565b9050828152602081018484840111156200049a576200049962000371565b5b620004a78482856200043b565b509392505050565b5f82601f830112620004c657620004c56200036d565b5b8151620004d884826020860162000465565b91505092915050565b5f819050919050565b620004f581620004e1565b811462000500575f80fd5b50565b5f815190506200051381620004ea565b92915050565b5f805f6060848603121562000533576200053262000365565b5b5f84015167ffffffffffffffff81111562000553576200055262000369565b5b6200056186828701620004af565b935050602084015167ffffffffffffffff81111562000585576200058462000369565b5b6200059386828701620004af565b9250506040620005a68682870162000503565b9150509250925092565b5f81519050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52602260045260245ffd5b5f6002820490506001821680620005ff57607f821691505b602082108103620006155762000614620005ba565b5b50919050565b5f819050815f5260205f209050919050565b5f6020601f8301049050919050565b5f82821b905092915050565b5f60088302620006797fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff826200063c565b6200068586836200063c565b95508019841693508086168417925050509392505050565b5f819050919050565b5f620006c6620006c0620006ba84620004e1565b6200069d565b620004e1565b9050919050565b5f819050919050565b620006e183620006a6565b620006f9620006f082620006cd565b84845462000648565b825550505050565b5f90565b6200070f62000701565b6200071c818484620006d6565b505050565b5b818110156200074357620007375f8262000705565b60018101905062000722565b5050565b601f82111562000792576200075c816200061b565b62000767846200062d565b8101602085101562000777578190505b6200078f62000786856200062d565b83018262000721565b50505b505050565b5f82821c905092915050565b5f620007b45f198460080262000797565b1980831691505092915050565b5f620007ce8383620007a3565b9150826002028217905092915050565b620007e982620005b0565b67ffffffffffffffff81111562000805576200080462000385565b5b620008118254620005e7565b6200081e82828562000747565b5f60209050601f83116001811462000854575f84156200083f578287015190505b6200084b8582620007c1565b865550620008ba565b601f19841662000864866200061b565b5f5b828110156200088d5784890151825560018201915060208501945060208101905062000866565b86831015620008ad5784890151620008a9601f891682620007a3565b8355505b6001600288020188555050505b505050505050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b5f8160011c9050919050565b5f808291508390505b60018511156200094c57808604811115620009245762000923620008c2565b5b6001851615620009345780820291505b80810290506200094485620008ef565b945062000904565b94509492505050565b5f8262000966576001905062000a38565b8162000975575f905062000a38565b81600181146200098e57600281146200099957620009cf565b600191505062000a38565b60ff841115620009ae57620009ad620008c2565b5b8360020a915084821115620009c857620009c7620008c2565b5b5062000a38565b5060208310610133831016604e8410600b841016171562000a095782820a90508381111562000a035762000a02620008c2565b5b62000a38565b62000a188484846001620008fb565b9250905081840481111562000a325762000a31620008c2565b5b81810290505b9392505050565b5f62000a4b82620004e1565b915062000a5883620004e1565b925062000a877fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff848462000955565b905092915050565b5f62000a9b82620004e1565b915062000aa883620004e1565b925082820262000ab881620004e1565b9150828204841483151762000ad25762000ad1620008c2565b5b5092915050565b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f62000b048262000ad9565b9050919050565b62000b168162000af8565b82525050565b5f60208201905062000b315f83018462000b0b565b92915050565b5f62000b4382620004e1565b915062000b5083620004e1565b925082820190508082111562000b6b5762000b6a620008c2565b5b92915050565b62000b7c81620004e1565b82525050565b5f60608201905062000b975f83018662000b0b565b62000ba6602083018562000b71565b62000bb5604083018462000b71565b949350505050565b5f60208201905062000bd25f83018462000b71565b92915050565b610dfb8062000be65f395ff3fe608060405234801561000f575f80fd5b5060043610610091575f3560e01c8063313ce56711610064578063313ce5671461013157806370a082311461014f57806395d89b411461017f578063a9059cbb1461019d578063dd62ed3e146101cd57610091565b806306fdde0314610095578063095ea7b3146100b357806318160ddd146100e357806323b872dd14610101575b5f80fd5b61009d6101fd565b6040516100aa9190610a74565b60405180910390f35b6100cd60048036038101906100c89190610b25565b61028d565b6040516100da9190610b7d565b60405180910390f35b6100eb6102af565b6040516100f89190610ba5565b60405180910390f35b61011b60048036038101906101169190610bbe565b6102b8565b6040516101289190610b7d565b60405180910390f35b6101396102e6565b6040516101469190610c29565b60405180910390f35b61016960048036038101906101649190610c42565b6102ee565b6040516101769190610ba5565b60405180910390f35b610187610333565b6040516101949190610a74565b60405180910390f35b6101b760048036038101906101b29190610b25565b6103c3565b6040516101c49190610b7d565b60405180910390f35b6101e760048036038101906101e29190610c6d565b6103e5565b6040516101f49190610ba5565b60405180910390f35b60606003805461020c90610cd8565b80601f016020809104026020016040519081016040528092919081815260200182805461023890610cd8565b80156102835780601f1061025a57610100808354040283529160200191610283565b820191905f5260205f20905b81548152906001019060200180831161026657829003601f168201915b5050505050905090565b5f80610297610467565b90506102a481858561046e565b600191505092915050565b5f600254905090565b5f806102c2610467565b90506102cf858285610480565b6102da858585610512565b60019150509392505050565b5f6012905090565b5f805f8373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f20549050919050565b60606004805461034290610cd8565b80601f016020809104026020016040519081016040528092919081815260200182805461036e90610cd8565b80156103b95780601f10610390576101008083540402835291602001916103b9565b820191905f5260205f20905b81548152906001019060200180831161039c57829003601f168201915b5050505050905090565b5f806103cd610467565b90506103da818585610512565b600191505092915050565b5f60015f8473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f8373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f2054905092915050565b5f33905090565b61047b8383836001610602565b505050565b5f61048b84846103e5565b90507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff811461050c57818110156104fd578281836040517ffb8f41b20000000000000000000000000000000000000000000000000000000081526004016104f493929190610d17565b60405180910390fd5b61050b84848484035f610602565b5b50505050565b5f73ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610582575f6040517f96c6fd1e0000000000000000000000000000000000000000000000000000000081526004016105799190610d4c565b60405180910390fd5b5f73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036105f2575f6040517fec442f050000000000000000000000000000000000000000000000000000000081526004016105e99190610d4c565b60405180910390fd5b6105fd8383836107d1565b505050565b5f73ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1603610672575f6040517fe602df050000000000000000000000000000000000000000000000000000000081526004016106699190610d4c565b60405180910390fd5b5f73ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16036106e2575f6040517f94280d620000000000000000000000000000000000000000000000000000000081526004016106d99190610d4c565b60405180910390fd5b8160015f8673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f8573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f208190555080156107cb578273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040516107c29190610ba5565b60405180910390a35b50505050565b5f73ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610821578060025f8282546108159190610d92565b925050819055506108ef565b5f805f8573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f20549050818110156108aa578381836040517fe450d38c0000000000000000000000000000000000000000000000000000000081526004016108a193929190610d17565b60405180910390fd5b8181035f808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f2081905550505b5f73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610936578060025f8282540392505081905550610980565b805f808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f82825401925050819055505b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040516109dd9190610ba5565b60405180910390a3505050565b5f81519050919050565b5f82825260208201905092915050565b5f5b83811015610a21578082015181840152602081019050610a06565b5f8484015250505050565b5f601f19601f8301169050919050565b5f610a46826109ea565b610a5081856109f4565b9350610a60818560208601610a04565b610a6981610a2c565b840191505092915050565b5f6020820190508181035f830152610a8c8184610a3c565b905092915050565b5f80fd5b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f610ac182610a98565b9050919050565b610ad181610ab7565b8114610adb575f80fd5b50565b5f81359050610aec81610ac8565b92915050565b5f819050919050565b610b0481610af2565b8114610b0e575f80fd5b50565b5f81359050610b1f81610afb565b92915050565b5f8060408385031215610b3b57610b3a610a94565b5b5f610b4885828601610ade565b9250506020610b5985828601610b11565b9150509250929050565b5f8115159050919050565b610b7781610b63565b82525050565b5f602082019050610b905f830184610b6e565b92915050565b610b9f81610af2565b82525050565b5f602082019050610bb85f830184610b96565b92915050565b5f805f60608486031215610bd557610bd4610a94565b5b5f610be286828701610ade565b9350506020610bf386828701610ade565b9250506040610c0486828701610b11565b9150509250925092565b5f60ff82169050919050565b610c2381610c0e565b82525050565b5f602082019050610c3c5f830184610c1a565b92915050565b5f60208284031215610c5757610c56610a94565b5b5f610c6484828501610ade565b91505092915050565b5f8060408385031215610c8357610c82610a94565b5b5f610c9085828601610ade565b9250506020610ca185828601610ade565b9150509250929050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52602260045260245ffd5b5f6002820490506001821680610cef57607f821691505b602082108103610d0257610d01610cab565b5b50919050565b610d1181610ab7565b82525050565b5f606082019050610d2a5f830186610d08565b610d376020830185610b96565b610d446040830184610b96565b949350505050565b5f602082019050610d5f5f830184610d08565b92915050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b5f610d9c82610af2565b9150610da783610af2565b9250828201905080821115610dbf57610dbe610d65565b5b9291505056fea2646970667358221220444cabe6b4bd422d8b842b5abc0dfc48e0cea5896a9ecffef9323906256fe87a64736f6c63430008150033";
    const TokenContract = new web3.eth.Contract(tokenABI);
    TokenContract.deploy({
      data: tokenBytecode,
      arguments: [name, symbol, supply]
    })
      .send({ from: account })
      .on('receipt', receipt => {
        console.log('Contract deployed at address', receipt.contractAddress);
      })
      .on('error', error => {
        console.error('Error deploying contract', error);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>ERC20 Token Deployer</h1>
        <button onClick={loadWeb3}>Connect Wallet</button>
        <div>
          <input
            type="text"
            placeholder="Token Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Token Symbol"
            value={symbol}
            onChange={e => setSymbol(e.target.value)}
          />
          <input
            type="number"
            placeholder="Total Supply"
            value={supply}
            onChange={e => setSupply(e.target.value)}
          />
          <button onClick={deployToken}>Deploy Token</button>
        </div>
      </header>
    </div>
  );
};

export default App;
