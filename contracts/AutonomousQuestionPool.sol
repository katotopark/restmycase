pragma solidity ^0.4.24;

contract AutonomousQuestionPool {
  mapping(uint => string) tokenToIpfsHash;
  mapping(string => uint) ipfsHashToToken;


  struct Question {
    uint id;
    string title;
    uint group;
    uint voteCount;
  }

  mapping(address => bool) public voters;
  mapping(uint => Question) public questions;
  uint public questionsCount;

  event votedEvent(uint indexed _questionId);

  constructor() public {
  }

  function addQuestion(string ipfsHash) public {
    questionsCount ++;
    ipfsHashToToken[ipfsHash] = questionsCount;
    tokenToIpfsHash[questionsCount] = ipfsHash;

  }
  function getQuestionById(string _questionId) public view returns (string) {
    // return tokenToIpfsHash[_questionId];
  }

  function vote(uint _questionId) public {
    // require(!voters[msg.sender]);
    // require(_questionId > 0 && _questionId <= questionsCount);
    //
    // voters[msg.sender] = true;
    // questions[_questionId].voteCount ++;
    //
    // emit votedEvent(_questionId);
  }

}
