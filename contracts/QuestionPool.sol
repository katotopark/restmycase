pragma solidity ^0.4.24;

contract QuestionPool {
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
    addQuestion("what", 2);
    addQuestion("why", 1);
  }

  function addQuestion(string _title, uint _group) public {
    questionsCount ++;
    questions[questionsCount] = Question(questionsCount, _title, _group, 0);
  }

  function vote(uint _questionId) public {
    require(!voters[msg.sender]);
    require(_questionId > 0 && _questionId <= questionsCount);

    voters[msg.sender] = true;
    questions[_questionId].voteCount ++;

    emit votedEvent(_questionId);
  }

}
