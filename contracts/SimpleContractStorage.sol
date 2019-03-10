pragma solidity ^0.4.11;

contract SimpleContractStorage {
  string ipfsHash;

  function set(string x) public {
    ipfsHash = x;
  }

  function get() public view returns (string) {
    return ipfsHash;
  }
}