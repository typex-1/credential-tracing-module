// test_secret_ballot.js
const AuditTracer = artifacts.require("AuditTracer");
const Web3c = require("web3c");
const truffleConfig = require("../truffle-config.js");

contract("AuditTracer", async (accounts) => {
  // Creates our instance of web3c to use in the tests with a provider that
  // makes and signs requests. The provider is configured with a private key
  // (derived from a mnemonic) and gateway url.
  const web3c = new Web3c(truffleConfig.networks.oasis.provider());

  // Creates an instance of our secret ballot contract, communicating with the contract
  // at the deployed address. Note: this address will be different in tests since it
  // will be redeployed via migration before every run of truffle test.
  const AuditTracer = new web3c.oasis.Contract(AuditTracer.abi, AuditTracer.address, {
    // the default "from" address of all transactions originating from this contract
    from: accounts[0]
  });

  // Notice how the totalVotes variable is *public* in the contract code
  // and so anyone can make encrypted calls to it *before* the voting period
  // has ended.
  it('Should allow voting for a candidate', async () => {
    // performs an encrypted call to read public data
    let totalVotes = await AuditTracer.methods.totalVotes().call();
    assert.equal(totalVotes, 0);

    // sends an encrypted transactions, updating the private data
    await AuditTracer.methods.voteForCandidate(web3c.utils.fromAscii("John")).send();

    // reading the public data again should now be updated
    totalVotes = await AuditTracer.methods.totalVotes().call();
    assert.equal(totalVotes, 1);
  });
});
