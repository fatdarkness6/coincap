import { useEffect, useRef, useState } from 'react';
import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { useCandles } from '../../composable/useCandle';

import moment from 'moment';
import { calculateBigNumber } from '../../utils/calculateFunction';
import {
  Chart as ChartJs,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Link } from 'react-router-dom';
ChartJs.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

export default function RenderCoins(props) {
  let [tr, setTrue] = useState(false);
  let [response, setResponse] = useState([]);
  let [click, setClick] = useState(false);
  let [upd, setUpd] = useState(1);
  //....................................chart...............................
  const {getCandles , getLimitCandles} = useCandles()

  useEffect(() => {
    let name = props.nameOfTheCoins;
    if (click) {
      getCandles(name)
        .then((e) => {
          return e.json();
        })
        .then((e) => {
          setResponse(e.data);
        });
    }
  }, [click, upd]);

  useEffect(() => {
    setInterval(() => {
      setUpd(upd++);
    }, 40500);
  }, []);
  let data = {
    labels: response
      .reverse()
      .splice(0, 150)
      .reverse()
      .map((e) => {
        return moment(e.date).format(' (DD) ( HH:mm)');
      }),

    datasets: [
      {
        data: response.map((e) => {
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

  //........................................................................

  let lowerCase = props.symbol.toLowerCase();

  function calculate(x) {
    if (x >= 0.01) {
      return '$' + parseFloat(x).toFixed(2);
    } else if (x < 0.01) {
      return '$' + parseFloat(x).toFixed(6);
    }
  }

  useEffect(() => {
    if (props.changePercent24Hr < 0) {
      setTrue(true);
    }
  }, []);
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
  return (
    <>
      <tr
        className='hover'
        id={click ? 'zoom-out' : 'zoom-in'}
        onClick={() => {
          setClick(!click);
        }}>
        <td colSpan={1} className='center align NoNe2'>
          <h5>{props.id}</h5>
        </td>

        <td colSpan={2} className='td-flex'>
          <img
            src={`https://assets.coincap.io/assets/icons/${lowerCase}@2x.png`}
          />
          <div className='mix'>
            <Link to={`/assets/${props.nameOfTheCoins}`}>
              <h5>{props.name}</h5>
              <h5>{props.symbol}</h5>
            </Link>
          </div>
        </td>
        <td colSpan={1} className='right align'>
          <h5>{calculate(props.priceUsd)}</h5>
        </td>
        <td colSpan={1} className='right align NoNe2'>
          <h5>{calculateBigNumber(props.marketCapUsd)}</h5>
        </td>
        <td colSpan={1} className='right align NoNe2'>
          <h5>{calculate(props.vwap24Hr)}</h5>
        </td>
        <td colSpan={1} className='right align NoNe1'>
          <h5>{calculateBigNumber(props.supply)}</h5>
        </td>
        <td colSpan={1} className='right align NoNe1'>
          <h5>{calculateBigNumber(props.volumeUsd24Hr)}</h5>
        </td>
        <td colSpan={1} id={tr ? 'red' : 'green'} className='right align'>
          <h5>{calculateBigNumber(props.changePercent24Hr)}%</h5>
        </td>
      </tr>
      <tr className={click ? 'active' : 'none'}>
        <td colSpan={11}>
          <div className='info-part1'>
            <div className='info-slice1'>
              <div className='info-img'>
                <img
                  src={`https://assets.coincap.io/assets/icons/${lowerCase}@2x.png`}
                />
              </div>
              <div className='info-mix'>
                <div className='info-mix-slice1'>
                  <h5>{props.name}</h5>
                  <h5>{`(${props.symbol})`}</h5>
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
                  <div id={tr ? 'red' : 'green'}>
                    {calculateBigNumber(props.changePercent24Hr)}%
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='chart-part2'>
            <div className='chart-part2-slice1'>
              <Line data={data} options={options}></Line>
            </div>

            <Link to={`/assets/${props.nameOfTheCoins}`}>
              <div className='chart-part2-mix'>
                <button className='seeMoreButton'>More Details</button>
              </div>
            </Link>
          </div>
        </td>
      </tr>
    </>
  );
}
