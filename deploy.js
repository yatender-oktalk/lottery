const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
    'use paper air fiscal fashion sell dolphin enemy brief patch tag legend',
    'https://rinkeby.infura.io/v3/d981bbe3d90742a3bec0f15cba973e64'
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from Account', accounts[0]);

    let result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ['Hi there!'] })
        .send({ gas: '1000000', from: accounts[0] })

    console.log("contract deployed to: ", result.options.address);
};

deploy();