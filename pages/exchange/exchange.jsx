import Body from '../../components/body/body';
import Header from '../../components/header/header';
import { useEffect, useState } from 'react';
import { exchangeApi } from '../../composable/useExchangeApi';
import { homePageApiFullInfo } from '../../composable/useHomePageApi';
import RenderExchange from './renderExchange';
export default function ExchangePage() {
  let [fullRes, setFullRes] = useState([]);
  let [exchangeLenght, setExchangeLenght] = useState([]);

  useEffect(() => {
    exchangeApi()
      .then((e) => {
        return e.json();
      })
      .then((e) => {
        setExchangeLenght(e.data);
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
  }, []);

  return (
    <>
      <div className='father'>
        <div className='header'>
          <Header />
        </div>
        <Body exchange={exchangeLenght} fullRes={fullRes} />
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
                {exchangeLenght?.map((e) => {
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
      </div>
    </>
  );
}
