import React, { useEffect, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import axios from 'axios';


const privateKey=`-----BEGIN RSA PRIVATE KEY-----
MIICXQIBAAKBgQDWSRyaW4S4VxbS0NrfgU8VTftsrFdK+rc3RzP/0eapp4Lg2/YL
CnQuxBSKX9Ftq5O5J40Sjjjy6twASUKvVpuqthL/AEEJ384qdYwp4ggYmf2pFjaM
15M04qWHe2XUTtThvUhFlJCYoGzQ4/I8Fm3J7LQi/bRscJiEBHp1Kh439wIDAQAB
AoGBAK7jnOSeLQQGkCofK4OfFdxdeQaI4fXgCgijpFz2AzwT6016OKVqMsi4X8tP
yK2pizdigFDUosYfyM6y/Cn+layPXXEjNtJtxzL+gfdQpzZGA7hvuaXNwodqJkTe
mA0yz/q36Iyb5kzqZYDpsyzxbyBESm8nGP6PWNvs3Zy3INyBAkEA9/VdmI6l6mKm
kLxJm/Ycc+tOMFrHwfpQTZDLy+/CtRLXtts7zaF0cCrFMphWZbmQTq8IfN4+59sA
ZXhQgerTIwJBAN08LsPIMCuDtcuYGXcCtnngbwV5pabm+kURcermgVo2OD2L4KIp
rmiH+9hPTDS+P6aLomv36/GKOsSjmaU5zx0CQFIUOL1NSwLBUR3MFhm4aEa+94zu
H/3IHFjwu2VwomVKLXnsLGmvLloK7mgHIWJfALPrIMYk03HwfrsYDp5S2z0CQG2e
uWlHEx8slvK3fb6reHExVLF40iy9/Dom57RF3MgvX3SXj4mqb4HaB17qA8+KiQ1j
2On4oU9Ad9ghXCszVr0CQQC4S6yCYOuxtIvP0IlhFPZwcss3L8yvbeBCnK6imkPn
43gGhUQUOtZE0CcGh7hRjwWza+IakpC+Z50ZpoTSCL47
-----END RSA PRIVATE KEY-----`

const publicKey=`-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDWSRyaW4S4VxbS0NrfgU8VTfts
rFdK+rc3RzP/0eapp4Lg2/YLCnQuxBSKX9Ftq5O5J40Sjjjy6twASUKvVpuqthL/
AEEJ384qdYwp4ggYmf2pFjaM15M04qWHe2XUTtThvUhFlJCYoGzQ4/I8Fm3J7LQi
/bRscJiEBHp1Kh439wIDAQAB
-----END PUBLIC KEY-----`


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

  const [searchTerm, setSearchTerm] = useState('');
  const [patientList, setPatientList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sorting, setSorting] = useState(true); // True is ascending, False is Descending
  useEffect(() => {
    axios.get('')
      .then(({ data }) => {
        setPatientList(data.sort());
        setLoading(false);
      })
      .catch((err) => console.log(err.response.data));
  }, []);


  const submit=async()=>{

    const json={
      name:name
    }

    const string=JSON.stringify(json)
    const encrypted= await window.CryptoJS.AES.encrypt(string,aesPassword)

    console.log(encrypted)

    const decrypted=await window.CryptoJS.AES.decrypt(encrypted,aesPassword)
    console.log(decrypted)
    const js=JSON.parse(decrypted)
    console.log(js)
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
