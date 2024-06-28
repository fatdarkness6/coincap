import { useEffect, useState } from 'react';
import { calculateBigNumber } from '../../../jsFunctions/calculateFunction';
import { marketApi } from '../../../api/marketApi';
import { Link } from 'react-router-dom';

export default function RenderExchange(e) {
  const [bolean, setBolean] = useState('');
  const [res, setRes] = useState([]);
  let lowercase = e.exchangeId.toLowerCase();
  useEffect(() => {
    if (e.socket == true) {
      setBolean(true);
    } else if (e.socket == null) {
      setBolean(false);
    }

    marketApi(lowercase)
      .then((e) => {
        return e.json();
      })
      .then((e) => {       
        setRes(e.data[0]);
      }).catch(() => {
        return <h1>error</h1>
      })
  }, []);
  return (
    <Link to={`/exchanges/${lowercase}`}>
      <div className='header-container flex-align-center-justify'>
        <div className='header-container-title flex-align-center'>
          <h5>{e.rank}</h5>
          <h5>{e.name}</h5>
        </div>
        <div className='header-container-info flex-align-center right'>
          <h5>{e.tradingPairs}</h5>
          <h5>
            {res?.baseSymbol}/{res?.quoteSymbol}
          </h5>
          {}
          <h5>{!e.volumeUsd ? '-' : calculateBigNumber(e?.volumeUsd)}</h5>
          <h5>
            {!e.percentTotalVolume
              ? '-'
              : calculateBigNumber(e?.percentTotalVolume)}
            %
          </h5>
          <div className='circle'>
            <div className={bolean == true ? 'green' : 'red'}></div>
          </div>
        </div>
      </div>
    </Link>
  );
}
