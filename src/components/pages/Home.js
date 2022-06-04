import React, { useEffect, useState, Suspense, lazy } from 'react';
import { Container, Button } from 'react-bootstrap';
import axios from 'axios';
import Loading from 'react-loading';
const CountryCard = lazy(() => import('./subcomps/CountryCard'));

function Home() {
  let style2 = {
    backgroundColor: '#FFF',
    borderRadius: 10,
    margin: 0,
    justifySelf: 'center',
    alignSelf: 'stretch',
  };

  const [pageNum, setPageNum] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [countryList, setCountryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sorting, setSorting] = useState(true); // True is ascending, False is Descending
  useEffect(() => {
    axios
      .get('/api/countries')
      .then(({ data }) => {
        setCountryList(data.sort());
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
        <input
          style={style2}
          type='text'
          placeholder='Search...'
          onChange={(event) => {
            setSearchTerm(event.target.value);
            setPageNum(1);
          }}
        />

        <Button
          style={{
            borderRadius: '4px',
            margin: 0,
            marginLeft: '5px',
            padding: '10 10',
            alignSelf: 'stertch',
            justifySelf: 'stretch',
            whiteSpace: 'nowrap',
          }}
          onClick={() => {
            setSorting(!sorting);
            setCountryList(countryList.reverse());
          }}>
          sort <i className='fas fa-sort' />
        </Button>
      </div>

      <Suspense
        fallback={
          <div align='center'>
            <Loading
              type={'spinningBubbles'}
              color='#888'
              height={'10%'}
              width={'10%'}
            />
          </div>
        }>
        {countryList
          .filter((val) => {
            if (searchTerm === '') {
              return val;
            } else if (
              val[0].toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return val;
            } else if (
              val[1] != null &&
              val[1].toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return val;
            }
          })
          .slice((pageNum - 1) * 10, pageNum * 10)
          .map((country, key) => {
            return (
              <div key={country}>
                <CountryCard country={country} key={key} />
              </div>
            );
          })}
      </Suspense>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 4fr 1fr',
          alignItems: 'center',
          marginBottom: '50px',
        }}>
        {pageNum > 1 ? (
          <Button
            style={{ justifySelf: 'end', borderRadius: '4px', margin: 0 }}
            onClick={() => setPageNum(pageNum - 1)}>
            {'<< Prev'}
          </Button>
        ) : (
          <Button
            style={{
              justifySelf: 'end',
              borderRadius: '4px',
              margin: 0,
              backgroundColor: '#666',
            }}>
            {'<< Prev'}
          </Button>
        )}
        <strong style={{ justifySelf: 'center' }}>{'Page #' + pageNum}</strong>
        {pageNum < countryList.length / 10 ? (
          <Button
            style={{ justifySelf: 'start', borderRadius: '4px' }}
            onClick={() => setPageNum(pageNum + 1)}>
            {'Next >>'}
          </Button>
        ) : (
          <Button
            style={{
              justifySelf: 'start',
              borderRadius: '4px',
              backgroundColor: '#666',
            }}>
            {'Next >>'}
          </Button>
        )}
      </div>
    </Container>
  );
}

export default Home;
