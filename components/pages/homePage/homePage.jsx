import { useEffect, useState } from 'react';
import { homePageApi } from '../../../api/homePageApi';
import Header from "../../header/header";
import RenderCoins from "./renderCoins"

export default function HomePage() {
  let [plus, updatePlus] = useState(20);
  let [state, updateState] = useState(false);
  let [res, updateRes] = useState([]);
  useEffect(() => {

    homePageApi(plus)
      .then((e) => {
        return e.json();
      })
      .then((e) => {
        updateRes(e.data);
      }).catch(() => {
        return <h1>error</h1>
      })
  }, [plus]);

  if (state) {
    setTimeout(() => {
      updateState(false);
    }, 1000);
  }

  return (
    <>
      <div className='father'>
        <div className='homePage-part1'>
            <Header/>
        </div>
        <div className='homePage-part2'>

        </div>
        <div className='homePage-part3'>
        <div className='header-wrapper'>
          <div className='homePage-container'>
            <div className='part1'>
              <ul>
                <li className='section1'>
                <span>
                <h6>Rank</h6>
                </span>
                  
                  <h6>Name</h6>
                </li>
                <li className='section2'>
                  <h6>Price</h6>
                  <h6>Market Cap</h6>
                  <h6>VWAP(24Hr)</h6>
                  <h6>Supply</h6>
                  <h6>Volume(24Hr)</h6>
                  <h6>Change(24Hr)</h6>
                </li>
              </ul>
            </div>
            <div className='part2'>
            {res.map(e => {
            console.log(e)
            return <RenderCoins name = {e.name} id = {e.rank} priceUsd = {e.priceUsd} marketCapUsd = {e.marketCapUsd} vwap24Hr = {e.vwap24Hr} supply = {e.supply} volumeUsd24Hr = {e.volumeUsd24Hr} changePercent24Hr = {e.changePercent24Hr} symbol= {e.symbol}/>
          })}
            </div>
            
          </div>
        </div>
        
          
        </div>
        <div className='homePage-part4'>
        {!state ? (
            <button
              onClick={() => {
                updateState(true);
                updatePlus((plus += 20));
                console.log(plus);
              }}>
              show more
            </button>
          ) : (
            <button>please wait</button>
          )}
        </div>
      </div>
    </>
  );
}
