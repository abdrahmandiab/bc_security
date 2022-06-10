import React, { useEffect, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import axios from 'axios';
import Loading from 'react-loading';

function Home() {
  let style2 = {
    backgroundColor: '#FFF',
    borderRadius: 10,
    margin: 0,
    justifySelf: 'center',
    alignSelf: 'stretch',
  };


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

  return (
    <Container fluid>
      <div
        style={{
          display: 'grid',
          gridAutoRows: '50px',
          gridTemplateColumns: '14fr 1fr',
          margin: 0,
        }}>
        {/* Add Patient
          in: encrypted & signed patient;
          action: put it on blockchain; 
          out: new patientid (count of patients in mapping)
          */}
        
        {/* Add Visit 
        in: patientid,data
        */}

        {/* Get all visits */}
        {/* Get visits for patientid (take patientid) */}

        
        {/* <input
          style={style2}
          type='text'
          placeholder='Search...'
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        />*/}
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
