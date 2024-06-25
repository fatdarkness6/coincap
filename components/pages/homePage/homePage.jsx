import { useEffect, useState } from 'react';
import { homePageApi, homePageApiFullInfo } from '../../../api/homePageApi';
import Header from '../../header/header';
import RenderCoins from './renderCoins';
import { iconApi } from '../../../api/iconsApi';
import axios from 'axios';
import { exchangeApi } from '../../../api/exchangeApi';
import { marketApi } from '../../../api/marketApi';

export default function HomePage() {
  let [plus, updatePlus] = useState(20);
  let [state, updateState] = useState(false);
  let [res, updateRes] = useState([]);
  let [upd, setUpd] = useState(1);
  let [fullRes, setFullRes] = useState([]);
  let [exchange, setExchange] = useState([]);
  //.........................................................................
  let arry = [];
  let priceNumber = 0;
  let final = 0;
  let EXCHANGEVOLarry = [];
  let EXCHANGEVOLnumber = 0;
  let EXCHANGEVOLfinal = 0;
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
        <div className='homePage-part2'>
          <div className='homePage-part2-wrapper'>
            <div className='flex-align-center-justify padding-top'>
              <div className='homePage-part2-MARKETCAP flex-center-column'>
                {fullRes.map((e) => {
                  let a = e.marketCapUsd;
                  arry.push(a);
                })}
                {arry.forEach((e) => {
                  let a = (priceNumber += +e);
                  let b = a / 1000000000000;
                  let c = b.toFixed(2);

                  return (final = c);
                })}
                <h3>MARKETCAP</h3>
                <h3>{final}T</h3>
              </div>
              <div className='homePage-part2-EXCHANGEVOL flex-center-column'>
                {fullRes.map((e) => {
                  let a = e.volumeUsd24Hr;
                  EXCHANGEVOLarry.push(a);
                })}
                {EXCHANGEVOLarry.forEach((e) => {
                  let a = (EXCHANGEVOLnumber += +e);
                  let b = a / 1000000000;
                  let c = b.toFixed(2);
                  return (EXCHANGEVOLfinal = c);
                })}
                <h3>EXCHANGEVOL</h3>
                <h3>{EXCHANGEVOLfinal}B</h3>
              </div>
              <div className='homePage-part2-ASSETS flex-center-column'>
                <h3>ASSETS</h3>
                <h3>{fullRes.length}</h3>
              </div>
              <div className='homePage-part2-EXCHANGES flex-center-column'>
                <h3>EXCHANGES</h3>
                <h3>{exchange.length}</h3>
              </div>
            </div>
          </div>
        </div>
        <div className='homePage-part3'>
          <div className='header-wrapper'>
            <table className='homePage-container'>
              <thead>
                <tr className='part1'>
                  <th>
                    <h6>Rank</h6>
                  </th>
                  <th className='left align'>
                    <h6>Name</h6>
                  </th>
                  <th className='right align'>
                    <h6>Price</h6>
                  </th>
                  <th className='right align'>
                    <h6>Market Cap</h6>
                  </th>
                  <th className='right align'>
                    <h6>VWAP(24Hr)</h6>
                  </th>
                  <th className='right align'>
                    <h6>Supply</h6>
                  </th>
                  <th className='right align'>
                    <h6>Volume(24Hr)</h6>
                  </th>
                  <th className='right align'>
                    <h6>Change(24Hr)</h6>
                  </th>
                </tr>
              </thead>
              <tbody>
                {res.map((e) => {
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
          {res.length == plus ? (
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
