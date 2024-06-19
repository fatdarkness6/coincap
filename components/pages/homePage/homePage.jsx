import { useEffect, useState } from 'react';
import { homePageApi } from '../../../api/homePageApi';
import Header from "../../header/header";
import { marketApi } from '../../../api/marketApi';

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
        console.log(e.data);
      }).catch(() => {
        return <h1>error</h1>
      })

      marketApi()
      .then(e => {return e.json()})
      .then(e => console.log(e))
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
