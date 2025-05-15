import { useEffect, useState } from 'react';
import { homePageApi, homePageApiFullInfo } from '../../composable/useHomePageApi';
import Header from '../../components/header/header';
import RenderCoins from './renderCoins';
import { exchangeApi } from '../../composable/useExchangeApi';
import { marketApi } from '../../composable/useMarketApi';
import Body from '../../components/body/body';

export default function HomePage() {
  let [plus, updatePlus] = useState(20);
  let [state, updateState] = useState(false);
  let [res, updateRes] = useState([]);
  let [upd, setUpd] = useState(1);
  let [fullRes, setFullRes] = useState([]);
  let [exchange, setExchange] = useState([]);
  //.........................................................................

  useEffect(() => {
    homePageApi(plus)
      .then((e) => {
        return e.json();
      })
      .then((e) => {
        updateRes(e.data);
      })
      .catch(() => {
        return <h1>error</h1>;
      });
    homePageApiFullInfo()
      .then((e) => {
        return e.json();
      })
      .then((e) => {
        setFullRes(e.data);
      })
      .catch(() => {
        return <h1>error</h1>;
      });
    exchangeApi()
      .then((e) => {
        return e.json();
      })
      .then((e) => {
        setExchange(e.data);
      })
      .catch(() => {
        return <h1>error</h1>;
      });
    marketApi()
      .then((e) => {
        return e.json();
      })
      .then((e) => {
        setMarket(e.data);
      })
      .catch(() => {
        return <h1>error</h1>;
      });
  }, [plus, upd]);
  useEffect(() => {
    setInterval(() => {
      setUpd(upd++);
    }, 40000);
  }, []);

  if (state) {
    setTimeout(() => {
      updateState(false);
    }, 1000);
  }
  return (
    <>
      <div className='father'>
        <div className='homePage-part1'>
          <Header />
        </div>
        <Body exchange={exchange} fullRes={fullRes} />
        <div className='homePage-part3'>
          <div className='header-wrapper'>
            <table className='homePage-container'>
              <thead>
                <tr className='part1'>
                  <th className='NoNe2'>
                    <h6>Rank</h6>
                  </th>
                  <th className='left align'>
                    <h6>Name</h6>
                  </th>
                  <th className='right align '>
                    <h6>Price</h6>
                  </th>
                  <th className='right align NoNe2'>
                    <h6>Market Cap</h6>
                  </th>
                  <th className='right align NoNe1'>
                    <h6>VWAP(24Hr)</h6>
                  </th>
                  <th className='right align NoNe1'>
                    <h6>Supply</h6>
                  </th>
                  <th className='right align NoNe2'>
                    <h6>Volume(24Hr)</h6>
                  </th>
                  <th className='right align'>
                    <h6>Change(24Hr)</h6>
                  </th>
                </tr>
              </thead>
              <tbody>
                {res?.map((e) => {
                  return (
                    <RenderCoins
                      name={e.name}
                      id={e.rank}
                      nameOfTheCoins={e.id}
                      priceUsd={e.priceUsd}
                      marketCapUsd={e.marketCapUsd}
                      vwap24Hr={e.vwap24Hr}
                      supply={e.supply}
                      volumeUsd24Hr={e.volumeUsd24Hr}
                      changePercent24Hr={e.changePercent24Hr}
                      symbol={e.symbol}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className='homePage-part4'>
          {res?.length == plus ? (
            <button
              className='load-button'
              onClick={() => {
                updateState(true);
                updatePlus((plus += 20));
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
