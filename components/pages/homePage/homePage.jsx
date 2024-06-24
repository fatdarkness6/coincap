import { useEffect, useState } from 'react';
import { homePageApi } from '../../../api/homePageApi';
import Header from '../../header/header';
import RenderCoins from './renderCoins';
import { iconApi } from '../../../api/iconsApi';
import axios from 'axios';

export default function HomePage() {
  let [plus, updatePlus] = useState(20);
  let [state, updateState] = useState(false);
  let [res, updateRes] = useState([]);
  let [upd, setUpd] = useState(1);
  let [itsTrue, setItsTrue] = useState('');
  let [itsFalse, setItsFalse] = useState(false);
  useEffect(() => {
    homePageApi(plus)
      .then((e) => {
        setItsTrue(e.status);
        return e.json();
      })
      .then((e) => {
        updateRes(e.data);
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
        <div className='homePage-part2'></div>
        <div className='homePage-part3'>
          <div className='header-wrapper'>
            <table className='homePage-container'>
              <thead>
                <tr className='part1'>
                  {/* <li className='section1'> */}

                  <th>
                    <h6>Rank</h6>
                  </th>

                  <th className='left align'>
                    <h6>Name</h6>
                  </th>
                  {/* </li> */}
                  {/* <li className='section2'> */}
                  <th className='right align'>
                    {' '}
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

                  {/* </li> */}
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
