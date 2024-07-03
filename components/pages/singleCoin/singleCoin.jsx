import { Link, useParams, useSearchParams } from 'react-router-dom';
import Header from '../../header/header';
import { useEffect, useRef } from 'react';
import { coinsApi } from '../../../api/coins';
import { useState } from 'react';
import { calculateBigNumber } from '../../../jsFunctions/calculateFunction';
import { candleApi, candleApiLimit } from '../../../api/candle';
import { Line } from 'react-chartjs-2';
import moment from 'moment';
import BinanceImage from '../../../public/bnb@2x.png';
import EthImage from '../../../public/eth@2x.png';
import foxImg from '../../../public/MetaMask_Fox.svg.png';
import wallet1 from '../../../public/wallet1.png';
import torus from '../../../public/torus.png';
import BinanceSmart from '../../../public/Binance-Smart.png';
import aaa from '../../../public/aaa.png';
import bbb from '../../../public/bbb.png';
import RenderExchange from '../exchange/renderExchange';

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
import { exchangeApi } from '../../../api/exchangeApi';
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
  let [selectWallet, setSelectWallet] = useState('Binance');
  let [openPortal, setOpenPortal] = useState(false);
  let [exchangeLenght, setExchangeLenght] = useState([]);
  useEffect(() => {
    setSearch(`active=${date}&selectCoin=${selectCoin}&wallet=${selectWallet}`);
  }, [upd, selectWallet]);

  let background = useRef(null);

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
    exchangeApi()
      .then((e) => {
        return e.json();
      })
      .then((e) => {
        setExchangeLenght(e.data);
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

  useEffect(() => {
    document.addEventListener('click', (e) => {
      if (e.target == background.current) {
        setOpenPortal(false);
      }
    });
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
    maintainAspectRatio: false,
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
                <div className='div flex-align-center-justify'>
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
                <div className='chart-part2-slice1'>
                  <Line data={data} options={options}></Line>
                </div>
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
                </div>
              </div>
              <div className='reverse-exchange'>
                <i class='fa-solid fa-reply'></i>
              </div>
              <div className='coinExchange-part2'>
                <h4>You Get</h4>
                <div className='coinExchange-part1-slice1'>
                  <input type='number' placeholder='0' />
                </div>
              </div>
              <button
                onClick={() => {
                  setOpenPortal(true);
                }}
                className='connectWalletButton'>
                Connect Wallet
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='allExchanges noMargin'>
        <div className='exchangePage-info-wrapper'>
          <div className='exchangePage-info'>
            <div className='container'>
              <div className='header-container flex-align-center-justify'>
                <div className='header-container-title flex-align-center'>
                  <h5>Rank</h5>
                  <h5>Name</h5>
                </div>
                <div className='header-container-info flex-align-center right'>
                  <h5 className='NoNe2'>Trading Pairs</h5>
                  <h5>Top Pair</h5>
                  <h5 className='NoNe1'>Volume(24Hr)</h5>
                  <h5>Total(%)</h5>
                  <h5 className='NoNe1'>Status</h5>
                </div>
              </div>
              <div className='body-container'>
                {exchangeLenght.map((e) => {
                  return (
                    <RenderExchange
                      exchangeId={e.exchangeId}
                      rank={e.rank}
                      name={e.name}
                      tradingPairs={e.tradingPairs}
                      topPair={e.topPair}
                      volumeUsd={e.volumeUsd}
                      percentTotalVolume={e.percentTotalVolume}
                      socket={e.socket}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      {openPortal
        ? createPortal(
            <div ref={background} className='black-background'>
              <div className='wallet-wrapper'>
                <div className='wallet-container'>
                  <div className='wallet-title'>
                    <div className='close-wallet-button'>
                      <i
                        onClick={() => {
                          setOpenPortal(false);
                        }}
                        class='fa-solid fa-xmark'></i>
                    </div>
                    <div className='select-network'>
                      <h3>Select a network</h3>
                      <div className='select-networkPart flex-align-center-justify '>
                        <div
                          onClick={() => {
                            setSelectWallet('Ethereum');
                          }}
                          id={
                            search.get('wallet') == 'Ethereum'
                              ? 'blueBorder'
                              : null
                          }
                          className='select-networkPart-Ethereum'>
                          <img src={EthImage} />
                          <p>Ethereum</p>
                        </div>
                        <div
                          onClick={() => {
                            setSelectWallet('Binance');
                          }}
                          id={
                            search.get('wallet') == 'Binance'
                              ? 'yellowBorder'
                              : null
                          }
                          className='select-networkPart-Binance'>
                          <img src={BinanceImage} />
                          <p>Binance</p>
                        </div>
                      </div>
                    </div>
                    <div className='select-wallet'>
                      <div
                        id={
                          search.get('wallet') == 'Binance' ? 'block' : 'none'
                        }
                        className='select-wallet-Binance'>
                        <h3>Connect a wallet</h3>
                        <div className='select-wallet-BinancePart'>
                          <Link to={'https://metamask.io'}>
                            <div className='select-wallet-BinancePart-slice1 div-button'>
                              <h4>Install Metamask</h4>
                              <img src={foxImg} />
                            </div>
                          </Link>
                          <div className='select-wallet-BinancePart-slice2 div-button'>
                            <h4>WalletConnect</h4>
                            <img src={wallet1} />
                          </div>
                          <div className='select-wallet-BinancePart-slice3 div-button'>
                            <h4>Torus</h4>
                            <img src={torus} />
                          </div>
                          <div className='select-wallet-BinancePart-slice4 div-button'>
                            <h4>Binance Chain Wallet</h4>
                            <img src={BinanceSmart} />
                          </div>
                        </div>
                      </div>
                      <div
                        id={
                          search.get('wallet') == 'Ethereum' ? 'block' : 'none'
                        }
                        className='select-wallet-Ethereum'>
                        <h3>Connect a wallet</h3>
                        <div className='select-wallet-BinancePart'>
                          <Link to={'https://metamask.io'}>
                            <div className='select-wallet-BinancePart-slice1 div-button'>
                              <h4>Portis By ShapeShift</h4>
                              <img src={aaa} />
                            </div>
                          </Link>
                          <div className='select-wallet-BinancePart-slice2 div-button'>
                            <h4>Install Metamask</h4>
                            <img src={foxImg} />
                          </div>
                          <div className='select-wallet-BinancePart-slice3 div-button'>
                            <h4>Torus</h4>
                            <img src={torus} />
                          </div>
                          <div className='select-wallet-BinancePart-slice4 div-button'>
                            <h4>WalletConnect</h4>
                            <img src={wallet1} />
                          </div>
                          <div className='select-wallet-BinancePart-slice4 div-button'>
                            <h4>Coinbase Wallet</h4>
                            <img src={bbb} />
                          </div>
                          <div className='select-wallet-BinancePart-slice4 div-button'>
                            <h4>Binance Chain Wallet</h4>
                            <img src={BinanceSmart} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>,
            document.body
          )
        : null}
    </div>
  );
}
