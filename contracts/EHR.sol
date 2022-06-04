// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EHR {
    mapping(uint256 => bytes) public Enc_Visits;
    mapping(uint256 => bytes) public Enc_Patients;
    uint256 public visitCount;
    uint256 public patientCount;

    struct Patient {
        string info;
        string visits;
    }

    function addPatient(bytes memory _patientHash) public {
        patientCount++;
        Enc_Patients[patientCount] = _patientHash;
    }

    function addVisit(bytes memory _visitHash) public {
        visitCount++;
        Enc_Visits[visitCount] = _visitHash;
    }
}
