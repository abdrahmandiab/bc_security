import React, { useEffect, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import axios from 'axios';




const aesPassword="Secret Passphrase"


function Home() {
  let style2 = {
    backgroundColor: '#FFF',
    borderRadius: 10,
    margin: 0,
    justifySelf: 'center',
    alignSelf: 'stretch',
  };

  // Patient data
  const [name,setName]=useState("")
  const [age,setAge]=useState("")
  const [publicKey,setPublicKey]=useState("")
  const [privateKey,setPrivateKey]=useState("")
  let priv=""
  let pub=""

  const [searchTerm, setSearchTerm] = useState('');
  const [patientList, setPatientList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sorting, setSorting] = useState(true); // True is ascending, False is Descending
  useEffect(() => {
    // axios.get('')
    //   .then(({ data }) => {
    //     setPatientList(data.sort());
    //     setLoading(false);
    //   })
    //   .catch((err) => console.log(err.response.data));
  }, []);

  const generateKeys=async()=>{
    const options={
      name:"RSASSA-PKCS1-v1_5",
      modulusLength:4096,
      publicExponent:new Uint8Array([0x01, 0x00, 0x01]),
      hash:"SHA-512"
    }
    let key=""
    await window.crypto.subtle.generateKey(options, true,  ["sign","verify"] )
    .then((res)=>{
      console.log("KEYS")
      console.log(res)
      setPrivateKey(res.privateKey)
      setPublicKey(res.publicKey)
      priv=res.privateKey
      pub=res.publicKey
    }).catch((err)=>{
      console.log(err)
    })
    console.log("----")
    //! NEED TO SAVE KEY 
    // const ex=await window.crypto.subtle.exportKey("jwk",key.publicKey)
    // console.log("EXPORT: ",ex)


    // await window.crypto.subtle.importKey('jwk',)





  }


  const submit=async()=>{
    await generateKeys()
    const json={
      name:name
    }

    const string=JSON.stringify(json)
    const encrypted= await window.CryptoJS.AES.encrypt(string,aesPassword)

    console.log(await encrypted.toString(window.CryptoJS.enc.Utf8))
    console.log(privateKey)
    const buffer=new ArrayBuffer(encrypted);
    const signed=await window.crypto.subtle.sign({ "name": "RSASSA-PKCS1-v1_5" },priv,buffer)
    console.log("SIGNED")
    console.log(signed)










    const verified=await window.crypto.subtle.verify({ "name": "RSASSA-PKCS1-v1_5" },pub,signed,buffer)
    console.log("VERIFICATION")
    console.log(verified)


    // const decrypted=await window.CryptoJS.AES.decrypt(encrypted,aesPassword).toString(window.CryptoJS.enc.Utf8)
    // const js=JSON.parse(decrypted)
    // console.log(js)
  }

  return (
    <Container fluid>
      <div
        style={{
          display: 'grid',
          gridAutoRows: '50px',
          gridTemplateColumns: '14fr 1fr',
          margin: 0,
        }}>
          <div>
        <h1> New patient</h1>
        <div>
          name
          <input name='name' value={name} onChange={(value)=>setName(value.target.value)}/>
          age
          <input name='age' value={age} onChange={(value)=>setAge(value.target.value)}/>
          <button type='button' onClick={submit}>  add record </button>
        </div>
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
    </Container>
  );
}

export default Home;
