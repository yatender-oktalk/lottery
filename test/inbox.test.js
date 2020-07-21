const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const { interface, bytecode } = require('../compile');

const web3 = new Web3(ganache.provider());

let accounts;
let inbox;
const initialString = "hi there";

beforeEach(async () => {
  // Get the list of all accounts from ganache in local test network
  // these all accounts were made to make our life easier
  accounts = await web3.eth.getAccounts();

  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: [initialString] })
    .send({ from: accounts[0], gas: '1000000' })
});


describe('Inbox', () => {
  it('deploys a contract', () => {
    assert.ok(inbox.options.address);
  });

  it("check the set message", async () => {
    const newTransactionResponse = await inbox.methods.setMessage("new message").send({ from: accounts[0] })
    assert.ok(newTransactionResponse["transactionHash"]);

    // Now we will fetch the message from message API
    const message = await inbox.methods.message().call();
    assert.equal(message, "new message");

  });

  it("has a default message", async () => {
    // it will call the methods and access the message
    const message = await inbox.methods.message().call();
    assert.equal(message, initialString)

  });
})

// https://rinkeby.infura.io/v3/d981bbe3d90742a3bec0f15cba973e64

// for hdwallet -> 0.0.3
// const result = await new web3.eth.Contract(JSON.parse(interface))
//     .deploy({ data: bytecode, arguments: ['Hi there!'] })
//     .send({ gas: '1000000', from: accounts[0] });

// for hdwallet -> 0.0.4, 0.0.5, 0.0.6

// const result = await new web3.eth.Contract(JSON.parse(interface))
//      .deploy({data: '0x' + bytecode, arguments: ['Hi there!']}) // add 0x bytecode
//      .send({from: accounts[0]})
