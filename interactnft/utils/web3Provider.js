const { Web3 } = require("web3");
const fs = require("fs");
const path = require("path");

require("dotenv").config();

const web3 = new Web3(
  new Web3.providers.HttpProvider("http://127.0.0.1:8545")
);

const contractAddress = process.env.CONTRACT_ADDRESS;
const fromAddress = process.env.FROM_ADDRESS;
const gasLimit = process.env.GAS_LIMIT;

const abiData = fs.readFileSync(path.join(__dirname, 'ABI.json'));
const abi = JSON.parse(abiData);

const contract = new web3.eth.Contract(abi, contractAddress);

module.exports = { web3, contract, fromAddress, gasLimit };
