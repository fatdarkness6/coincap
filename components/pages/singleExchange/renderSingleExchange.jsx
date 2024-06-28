import { Link } from 'react-router-dom';
import { calculateBigNumber } from '../../../jsFunctions/calculateFunction';

export default function RenderSingleExchange(e) {
  return (
    <Link to={`/assets/${e.baseId}`}>
    <div className='header-container flex-align-center-justify'>
      <div className='header-container-title flex-align-center'>
        <h5>
          {e.quoteSymbol}/{e.baseSymbol}
        </h5>
      </div>
      <div className='header-container-info flex-align-center right'>
        <h5>{calculateBigNumber(e.rate)}</h5>
        <h5>{calculateBigNumber(e.price)}</h5>
        <h5>{!e.volumeUsd24Hr ? '-' : calculateBigNumber(e?.volumeUsd24Hr)}</h5>
        <h5>
          {!e.percentExchangeVolume
            ? '-'
            : calculateBigNumber(e?.percentExchangeVolume)}
          %
        </h5>
        <h5>{calculateBigNumber(e.tradesCount24Hr)}</h5>
      </div>
    </div>
    </Link>
  );
}
