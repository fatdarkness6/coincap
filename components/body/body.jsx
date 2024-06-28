export default function Body(props) {

    let arry = [];
    let priceNumber = 0;
    let final = 0;
    let EXCHANGEVOLarry = [];
    let EXCHANGEVOLnumber = 0;
    let EXCHANGEVOLfinal = 0;

    return (
        <>
            <div className='homePage-part2'>
          <div className='homePage-part2-wrapper'>
            <div className='flex-align-center-justify padding-top'>
              <div className='homePage-part2-MARKETCAP flex-center-column'>
                {props.fullRes.map((e) => {
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
                {props.fullRes.map((e) => {
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
                <h3>{props.fullRes.length}</h3>
              </div>
              <div className='homePage-part2-EXCHANGES flex-center-column'>
                <h3>EXCHANGES</h3>
                <h3>{props.exchange.length}</h3>
              </div>
            </div>
          </div>
        </div>
        </>
    )
}