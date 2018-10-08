pragma solidity ^0.4.24;
// pragma experimental ABIEncoderV2;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC721/ERC721Token.sol";
import "../node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract NonFungibleCase is ERC721Token('NonFungibleCase', 'NFC'), Ownable {
  mapping(uint => string) tokenToIpfsHash;
  mapping(string => uint) ipfsHashToToken;
  mapping(uint => uint) tokenToPrice;


  function mintCase(string ipfsHash, uint price) public payable {
    require(ipfsHashToToken[ipfsHash] == 0); // gen 0 validation

    uint newTokenId = totalSupply().add(1);

    ipfsHashToToken[ipfsHash] = newTokenId;
    tokenToIpfsHash[newTokenId] = ipfsHash;
    tokenToPrice[newTokenId] = price;

    _mint(msg.sender, newTokenId);
  }

  function buyCase(uint _tokenId) public payable {
    require(ownerOf(_tokenId) == address(this));
    require(msg.value >= tokenToPrice[_tokenId]);

    clearApproval(address(this), _tokenId);
    removeTokenFrom(address(this), _tokenId);
    addTokenTo(msg.sender, _tokenId);

    emit Transfer(address(this), msg.sender, _tokenId);
  }

  function tokensOf(address _owner) public view returns(uint[]) {
    require(_owner != address(0));
    return ownedTokens[_owner];
  }

  function getIpfsHash(uint _tokenId) public view returns(string) {
    return tokenToIpfsHash[_tokenId];
  }

  function getToken(string ipfsHash) public view returns(uint) {
    return ipfsHashToToken[ipfsHash];
  }
}
