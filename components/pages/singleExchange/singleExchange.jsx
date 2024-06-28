import { useEffect } from 'react';
import Header from '../../header/header';
import { marketApi, marketLimitApi } from '../../../api/marketApi';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import RenderSingleExchange from './renderSingleExchange';
import { singleExchangeApiLimit } from '../../../api/exchangeApi';
import { calculateBigNumber } from '../../../jsFunctions/calculateFunction';

export default function SingleExchange() {
  let a = useParams();
  let nameCoin = a.coinName;

  let [res, setRes] = useState([]);
  let [plus, setPlus] = useState(20);
  let [rank, setRank] = useState([]);
  let [FullExchange, setFullExchange] = useState([]);

  useEffect(() => {
    marketApi(nameCoin)
      .then((e) => {
        return e.json();
      })
      .then((e) => {
        setFullExchange(e.data);
      });
    marketLimitApi(nameCoin, plus)
      .then((e) => {
        return e.json();
      })
      .then((e) => {
        setRes(e.data);
      })
      .catch(() => {
        return <h1>error</h1>;
      });
    singleExchangeApiLimit(nameCoin)
      .then((e) => {
        return e.json();
      })
      .then((e) => {
        setRank(e.data);
      });
  }, [plus]);

  let CalVolume = [];
  let CalVolumeNumber = 0;
  return (
    <>
      <div className='father'>
        <div className='header'>
          <Header />
        </div>
        <div className='homePage-part2 p2'>
          <div className='homePage-part2-1-wrapper'>
            <div className='homePage-father'>
              <div className='homePage-part2-1-container'>
                <div className='shapes'>
                  <div className='shape1'></div>
                  <div className='backgroundColorGreen-2'>
                    <div className='shape2 flex-column'>
                      <h2>{rank?.rank}</h2>
                      <h5>RANK</h5>
                    </div>
                  </div>
                </div>
                <div className='nameOfExchanges'>
                  <h2>{rank?.name}</h2>
                  <div className='flex-align-center'>
                    <h2>{rank?.tradingPairs}</h2>
                    <h5>Pairs</h5>
                  </div>
                </div>
              </div>
              <div className='homePage-part2-2-container'>
                <div className='ExchangeVolume'>
                  <div className='ExchangeVolume(24Hr)'>
                    <h5>Volume (24Hr)</h5>
                  </div>
                  <div className='CalVolume24Hr'>
                    {FullExchange.map((e) => {
                      let a = e.volumeUsd24Hr;
                      CalVolume.push(a);
                    })}
                    {CalVolume.map((e) => {
                      CalVolumeNumber += +e;
                    })}
                    <h5>${calculateBigNumber(CalVolumeNumber)}</h5>
                  </div>
                </div>
                <div className='TopPair'>
                  <h5>Top Pair</h5>
                  <h3>
                    {res[0]?.quoteSymbol}/{res[0]?.baseSymbol}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='allExchanges'>
          <div className='exchangePage-info-wrapper'>
            <div className='exchangePage-info'>
              <div className='container'>
                <div className='header-container flex-align-center-justify'>
                  <div className='header-container-title flex-align-center'>
                    <h5>Pair</h5>
                  </div>
                  <div className='header-container-info flex-align-center right'>
                    <h5>Rate</h5>
                    <h5>price</h5>
                    <h5>Volume(24Hr)</h5>
                    <h5>Volume(%)</h5>
                    <h5>Trades(24Hr)</h5>
                  </div>
                </div>
                <div className='body-container'>
                  {res.map((e) => {
                    return (
                      <RenderSingleExchange
                        baseId={e.baseId}
                        tradesCount24Hr={e.tradesCount24Hr}
                        percentExchangeVolume={e.percentExchangeVolume}
                        volumeUsd24Hr={e.volumeUsd24Hr}
                        price={e.priceUsd}
                        rate={e.priceQuote}
                        baseSymbol={e.baseSymbol}
                        quoteSymbol={e.quoteSymbol}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='homePage-part4'>
          {res.length == plus ? (
            <button
              className='load-button'
              onClick={() => {
                setPlus((plus += 20));
              }}>
              View More
            </button>
          ) : (
            <button className='load-button'>please wait</button>
          )}
        </div>
      </div>
    </>
  );
}
