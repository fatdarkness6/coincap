import { useParams, useSearchParams } from 'react-router-dom';
import Header from '../../header/header';
import { useEffect, useRef } from 'react';
import { coinsApi } from '../../../api/coins';
import { useState } from 'react';
import { calculateBigNumber } from '../../../jsFunctions/calculateFunction';
import { candleApi, candleApiLimit } from '../../../api/candle';
import { Line } from 'react-chartjs-2';
import moment from 'moment';

import {
  Chart as ChartJs,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { createPortal } from 'react-dom';
ChartJs.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

export default function SingleCoin() {
  let params = useParams();
  let coinName = params.coinName;
  let [res, setRes] = useState([]);
  let [truee, setTrue] = useState(false);
  let [plusPlus, setPlus] = useState(0);
  let [response, setResponse] = useState([]);
  let [respons1, setResponse2] = useState([]);
  let [date, setDate] = useState('m5');
  let [upd, setUpdate] = useState(1);
  let [search, setSearch] = useSearchParams();
  let [selectCoin, setSelectCoin] = useState('unselect');
  let [openPortal , setOpenPortal ] = useState(false)
  useEffect(() => {
    setSearch(`active=${date}&selectCoin=${selectCoin}`);
  }, [upd]);

  useEffect(() => {
    coinsApi(coinName)
      .then((e) => {
        return e.json();
      })
      .then((e) => {
        setRes(e.data);
      });

    candleApi(coinName)
      .then((e) => {
        return e.json();
      })
      .then((e) => {
        setResponse(e.data);
      });
    candleApiLimit(coinName, date)
      .then((e) => {
        return e.json();
      })
      .then((e) => {
        setResponse2(e.data);
      });
    if (res?.changePercent24Hr < 0) {
      setTrue(true);
    } else {
      setTrue(false);
    }
  }, [plusPlus, upd]);

  useEffect(() => {
    setInterval(() => {
      setPlus(plusPlus++);
    }, 40000);
  }, []);

  function calculatePrice(x) {
    if (x < 100000 && x >= 10000) {
      let a = parseFloat(x).toFixed(2);
      let b = a / 1000;
      let c = b.toFixed(3).toString().replace(/\./g, ',');
      return c;
    } else if (x < 10000 && x >= 1000) {
      let a = parseFloat(x).toFixed(2);
      let b = a / 1000;
      let c = b.toFixed(3).toString().replace(/\./g, ',');
      return c;
    } else if (x < 1000 && x >= 100) {
      let a = parseFloat(x).toFixed(2);
      let b = a / 1;
      let c = b.toFixed(3).toString().replace(/\./g, ',');
      return c;
    } else if (x < 100 && x >= 10) {
      let a = parseFloat(x).toFixed(2);
      let b = a / 1;
      let c = b.toFixed(3).toString().replace(/\./g, ',');
      return c;
    } else if (x < 10 && x >= 1) {
      let a = parseFloat(x).toFixed(2);
      let b = a / 1;
      let c = b.toFixed(3).toString().replace(/\./g, ',');
      return c;
    } else if (x < 1 && x > 0.01) {
      let a = parseFloat(x).toFixed(2);
      let b = a / 1;
      return b;
    } else if (x < 0.01) {
      let a = parseFloat(x).toFixed(5);
      let b = a / 1;
      return b;
    }
  }
  let lowerCase = res.symbol?.toLowerCase();

  function highestValue() {
    return Math.max.apply(
      Math,
      response?.map((e) => {
        return parseFloat(e.priceUsd) >= 0.01
          ? parseFloat(e.priceUsd).toFixed(3)
          : parseFloat(e.priceUsd) < 0.01
          ? parseFloat(e.priceUsd).toFixed(6)
          : parseFloat(e.priceUsd);
      })
    );
  }
  function lowestValue() {
    return Math.min.apply(
      Math,
      response?.map((e) => {
        return parseFloat(e.priceUsd) >= 0.01
          ? parseFloat(e.priceUsd).toFixed(3)
          : parseFloat(e.priceUsd) < 0.01
          ? parseFloat(e.priceUsd).toFixed(6)
          : parseFloat(e.priceUsd);
      })
    );
  }
  function avrageValue() {
    return (highestValue && lowestValue()) !== NaN ||
      (highestValue && lowestValue()) !== undefined
      ? ((highestValue() + lowestValue()) / 2).toFixed(3)
      : 'it doesnt have value';
  }
  function chart() {
    if (date == 'm5') {
      return respons1.slice(1150).map((e) => {
        return moment(e.date).format(' MMMM Do YYYY, h:mm a');
      });
    } else if (date == 'm30') {
      return respons1.slice(295).map((e) => {
        return moment(e.date).format('MMMM Do YYYY, h:mm a');
      });
    } else if (date == 'h2') {
      return respons1.slice(397).map((e) => {
        return moment(e.date).format('MMMM Do YYYY, h:mm a');
      });
    } else if (date == 'h6') {
      return respons1.slice(380).map((e) => {
        return moment(e.date).format('MMMM Do YYYY, h:mm a');
      });
    } else if (date == 'd1') {
      return respons1.slice(120).map((e) => {
        return moment(e.date).format('MMMM Do YYYY, h:mm a');
      });
    }
  }

  let data = {
    labels: chart(),

    datasets: [
      {
        data: respons1.map((e) => {
          return e.priceUsd;
        }),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
      },
    ],
  };

  let options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Candle Stick Chart',
      },
    },
  };

  return (
    <div className='father'>
      <div className='header'>
        <Header />
      </div>
      <div className='homePage-part2'>
        <div className='homePage-part2-1-wrapper'>
          <div className='homePage-father'>
            <div className='homePage-part2-1-container'>
              <div className='shapes'>
                <div className='shape1'></div>
                <div className='backgroundColorGreen-2'>
                  <div className='shape2 flex-column'>
                    <h2>{res?.rank}</h2>
                    <h5>RANK</h5>
                  </div>
                </div>
              </div>
              <div className='nameOfExchanges'>
                <h2>
                  {res?.name}
                  {`(${res?.symbol})`}
                </h2>
                <div className='flex-align-center-justify'>
                  <h2>$ {calculatePrice(res?.priceUsd)}</h2>
                  <div className='increase-decrease flex-align-center'>
                    <h5 id={!truee ? 'green' : 'red'}>
                      {calculateBigNumber(res?.changePercent24Hr)}%
                    </h5>
                    {!truee ? (
                      <i id='green' class='fa-solid fa-sort-up'></i>
                    ) : (
                      <i id='red' class='fa-solid fa-sort-down'></i>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className='homePage-part2-2-container'>
              <div className='marketCapUsd flex-column-start'>
                <h5>Market Cap</h5>
                <h3>{calculateBigNumber(res?.marketCapUsd)}</h3>
              </div>
              <div className='Volume24Hr flex-column-start'>
                <h5>Volume (24Hr)</h5>
                <h3>{calculateBigNumber(res?.volumeUsd24Hr)}</h3>
              </div>
              <div className='supply flex-column-start'>
                <h5>Supply</h5>
                <h3>{calculateBigNumber(res?.supply)}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='candlesAndCoins'>
        <div className='candlesAndCoins-info-wrapper'>
          <div className='candlesAndCoins-info-container'>
            <div className='candlesAndCoins-info-slice1'>
              <div className='info-part1'>
                <div className='info-slice1'>
                  <div className='info-img'>
                    <img
                      src={`https://assets.coincap.io/assets/icons/${lowerCase}@2x.png`}
                    />
                  </div>
                  <div className='info-mix'>
                    <div className='info-mix-slice1'>
                      <h5>{res?.name}</h5>
                      <h5>{`(${res?.symbol})`}</h5>
                    </div>
                    <div className='info-mix-slice2'>
                      {Date().toString().slice(4, 15)}
                    </div>
                  </div>
                </div>
                <div className='info-slice2'>
                  <div className='info-high-low'>
                    <div className='info-high flex-align-gap-row'>
                      <h3>HIGH</h3>
                      {`$${highestValue()}`}
                    </div>
                    <div className='info-low flex-align-gap-row'>
                      <h3>LOW</h3>
                      {`$${lowestValue()}`}
                    </div>
                  </div>
                  <div className='info-avrage-change'>
                    <div className='info-high flex-align-gap-row'>
                      <h3>AVRAGE</h3>
                      {`$${avrageValue()}`}
                    </div>
                    <div className='info-low flex-align-gap-row'>
                      <h3>CHANGE</h3>
                      <div id={!truee ? 'green' : 'red'}>
                        {calculateBigNumber(res?.changePercent24Hr)}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='info-part2'>
                <Line data={data} options={options}></Line>
                <div className='days'>
                  <h5
                    className={
                      search.get('active') == 'm5' ? 'greenBackground' : ''
                    }
                    onClick={() => {
                      setDate('m5');
                      setUpdate((upd += 1));
                    }}>
                    1D
                  </h5>
                  <h5
                    className={
                      search.get('active') == 'm30' ? 'greenBackground' : ''
                    }
                    onClick={() => {
                      setDate('m30');
                      setUpdate((upd += 1));
                    }}>
                    1w
                  </h5>
                  <h5
                    className={
                      search.get('active') == 'h2' ? 'greenBackground' : ''
                    }
                    onClick={() => {
                      setDate('h2');
                      setUpdate((upd += 1));
                    }}>
                    1M
                  </h5>
                  <h5
                    className={
                      search.get('active') == 'h6' ? 'greenBackground' : ''
                    }
                    onClick={() => {
                      setDate('h6');
                      setUpdate((upd += 1));
                    }}>
                    3M
                  </h5>
                  <h5
                    className={
                      search.get('active') == 'd1' ? 'greenBackground' : ''
                    }
                    onClick={() => {
                      setDate('d1');
                      setUpdate((upd += 1));
                    }}>
                    6M
                  </h5>
                </div>
              </div>
            </div>
            <div className='candlesAndCoins-info-slice2'>
              <h3>Swap</h3>
              <div className='coinExchange-part1'>
                <h4>You sell</h4>
                <div className='coinExchange-part1-slice1'>
                  <input type='number' placeholder='0' />
                  <div className='selectedCoin'>
                    <h3>{search.get('selectCoin')}</h3>
                    <i class='fa-solid fa-chevron-down'></i>
                  </div>
                </div>
              </div>
              <div className='reverse-exchange'>
                <i class='fa-solid fa-reply'></i>
              </div>
              <div className='coinExchange-part2'>
              <h4>You Get</h4>
                <div className='coinExchange-part1-slice1'>
                  <input type='number' placeholder='0' />
                  <div className='selectedCoin'>
                    <h3>{search.get('selectCoin')}</h3>
                    <i class='fa-solid fa-chevron-down'></i>
                  </div>
                </div>
              </div>
                  
                <button onClick={() => {
                  setOpenPortal(true)
                }} className='connectWalletButton'>Connect Wallet</button>
              
            </div>
          </div>
        </div>
      </div>
      {openPortal ? createPortal(
        <div  className='black-background'>
          
          
      </div>,
      document.body
      ) : null}
    </div>
  );
}
