import React, { useEffect, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import axios from 'axios';
import Web3 from 'web3/dist/web3.min'
import {abi} from '../../abitwo.js'


const contractAddr = "0xa167B64c0938DeA4fC086AC5E7182C384483Ef26"
const metamaskAddr = "0xc2983aBAb0FFCFBe35a449bf9448b51B9d2c5035"

const aesPassword = "Secret Passphrase"


function Home() {
  // Patient data
  const [acnts, setAccounts] = useState([])
  const [account, setAccount] = useState(); // state variable to set account.
  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("")
  const [blood, setBlood] = useState("")
  const [weight, setWeight] = useState("")
  const [oxygen, setOxygen] = useState("")

  const [publicKey, setPublicKey] = useState("")
  const [privateKey, setPrivateKey] = useState("")
  let priv = ""
  let pub = ""

  const [searchTerm, setSearchTerm] = useState('');
  const [patientList, setPatientList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sorting, setSorting] = useState(true); // True is ascending, False is Descending
  
  // useEffect(() => {
  //   async function load() {
  //     const web3 = ;
  //     const accounts = await web3.eth.requestAccounts();
      
  //     setAccount(accounts[0]);
  //   }
    
  //   load();
  //  }, []);

  const generateKeys = async () => {
    const options = {
      name: "RSASSA-PKCS1-v1_5",
      modulusLength: 4096,
      publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
      hash: "SHA-512"
    }
    let key = ""
    await window.crypto.subtle.generateKey(options, true, ["sign", "verify"])
      .then((res) => {
        console.log("KEYS")
        console.log(res)
        setPrivateKey(res.privateKey)
        setPublicKey(res.publicKey)
        priv = res.privateKey
        pub = res.publicKey
      }).catch((err) => {
        console.log(err)
      })
    console.log("----")
    //! NEED TO SAVE KEY 
    // const ex=await window.crypto.subtle.exportKey("jwk",key.publicKey)
    // console.log("EXPORT: ",ex)

    // await window.crypto.subtle.importKey('jwk',)
  }


  const submit = async () => {
    await generateKeys()
    
    const json = {
      name: name
    }

    const string = JSON.stringify(json)
    const encrypted = await window.CryptoJS.AES.encrypt(string, aesPassword)
   
    // console.log(await encrypted.toString(window.CryptoJS.enc.Utf8))
    console.log(privateKey)
    const buffer = new ArrayBuffer(encrypted);
    const signed = await window.crypto.subtle.sign({ "name": "RSASSA-PKCS1-v1_5" }, priv, buffer)
    console.log("SIGNED")
    console.log(signed)

    const w3 = new Web3(Web3.givenProvider || 'http://localhost:7545') // 
    
    const contractman = new w3.eth.Contract(abi, contractAddr);
    const placeholder = await w3.eth.requestAccounts()
    setAccounts(placeholder)
    console.log(acnts.length +"detected")
    const num_patients = await contractman.methods.patientCount().call()
    console.log("encrypted data: " + encrypted)
    const sigData = new Uint8Array(signed)
    const sigData2 = Array.from(sigData)
    console.log("signed data: " + sigData)
    await contractman.methods.addPatient(encrypted,sigData2).send({from: acnts[0]});

    console.log(num_patients)

    // EHR.methods.method_name(parameters).call()

    // const verified = await window.crypto.subtle.verify({ "name": "RSASSA-PKCS1-v1_5" }, pub, signed, buffer)
    // console.log("VERIFICATION")
    // console.log(verified)

    
    // const decrypted=await window.CryptoJS.AES.decrypt(encrypted,aesPassword).toString(window.CryptoJS.enc.Utf8)
    // const js=JSON.parse(decrypted)
    // console.log(js)
  }

  return (
    <div className='Container'>
      <div>
        <div>
          <h1> Add new patient</h1>
          <form>
            <div className="mb-3">
              <label className="form-label">Name:</label>
              <input className="form-control" name='name' value={name} onChange={(value) => setName(value.target.value)}/>
            </div>
            <div className="mb-3">
              <label className="form-label">Age:</label>
              <input className="form-control" name='age' value={age} onChange={(value) => setAge(value.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Gender:</label>
              <input className="form-control" name='gender' value={gender} onChange={(value) => setGender(value.target.value)}/>
            </div>
            <div className="mb-3">
              <label className="form-label">Blood Type:</label>
              <input className="form-control" name='blood' value={blood} onChange={(value) => setBlood(value.target.value)}/>
            </div>
            <div className="mb-3">
              <label className="form-label">Weight:</label>
              <input className="form-control" name='weight' value={weight} onChange={(value) => setWeight(value.target.value)}/>
            </div>
            <div className="mb-3">
              <label className="form-label">Oxygen:</label>
              <input className="form-control" name='oxygen' value={oxygen} onChange={(value) => setOxygen(value.target.value)}/>
            </div>
            <button type="button" onClick={submit} className="btn btn-primary">Add Record</button>
          </form>
          {/* <div>
            <button type='button' onClick={submit}>  add record </button>
          </div> */}
        </div>

        {/* Add Visit 
        in: patientid,data
        */}

        {/* Get all visits */}
        {/* Get visits for patientid (take patientid) */}


      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 4fr 1fr',
          alignItems: 'center',
          marginBottom: '50px',
        }}>

      </div>
    </div>
  );
}

export default Home;
