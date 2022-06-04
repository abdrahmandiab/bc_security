import React from 'react';
import { Card } from 'react-bootstrap';
const CountryCard = ({ country }) => {
  let style1 = {
    background:
      'linear-gradient(purple, transparent),linear-gradient(to top left, #2C2A8A, transparent),linear-gradient(to top right, #F9564F, transparent)',
    backgroundColor: '#0C0A4A',
    color: 'white',
    borderRadius: 10,
    boxShadow: '5px 10px 5px #9E9E9E',
    border: 0,
    height: 150,
    paddingTop: 15,
  };
  return (
    <div style={{ display: 'grid' }}>
      <Card style={style1}>
        <table style={{ width: '100%' }}>
          <colgroup>
            <col span='1' style={{ width: '16%', height: '100%' }} />
            <col span='1' style={{ width: '84%', height: '100%' }} />
          </colgroup>
          <tbody>
            <tr>
              <td style={{ padding: 0, margin: 0 }}>
                <img
                  style={{
                    borderRadius: '10px',
                    width: '150px',
                    height: '120px',
                  }}
                  alt={'Flag of ' + country[0] + '.'}
                  src={country[2]}
                />
              </td>
              <td>
                <Card.Body>
                  <Card.Title
                    style={{
                      fontSize: 30,
                      textDecoration: 'underline',
                      textDecorationColor: '#B33F62',
                    }}>
                    {country[0]}
                  </Card.Title>
                  <Card.Text>
                    Capital: {country[1] == null ? 'N/A' : country[1]}
                  </Card.Text>
                </Card.Body>
              </td>
            </tr>
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default CountryCard;
