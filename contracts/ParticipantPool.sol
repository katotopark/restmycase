pragma solidity ^0.4.24;

contract ParticipantPool {
  struct Participant {
    uint id;
    string name;
    bool attending;
  }
  mapping(address => Participant) public participants;
  mapping(address => bool) public voters;
  uint public participantCount;

  constructor() public {
    addParticipant('person personsson', true);
  }

  function addParticipant(string _name, bool _accepted) public {
    require(!voters[msg.sender]);
    uint _participantId = participantCount + 1;

    Participant memory participant = Participant(_participantId, _name, _accepted);

    voters[msg.sender] = true;

    participants[msg.sender] = participant;
    participantCount ++;
  }
}
