// SPDX-License-Identifier: MIT
pragma solidity ^0.5.16;

contract EHR {
    mapping(uint256 => string) public Enc_Visits;
    mapping(uint256 => uint8[]) public Visits_sig;
    mapping(uint256 => string) public Enc_Patients;
    mapping(uint256 => uint8[]) public Patients_sig;
    uint256 public visitCount;
    uint256 public patientCount;

    function addPatient(string memory _patientEnc, uint8[] memory _patientSig)
        public
    {
        patientCount++;
        Enc_Patients[patientCount] = _patientEnc;
        Patients_sig[patientCount] = _patientSig;
    }

    function addVisit(string memory _visitHash, uint8[] memory _visitSig)
        public
    {
        visitCount++;
        Enc_Visits[visitCount] = _visitHash;
        Visits_sig[visitCount] = _visitSig;
    }
}
