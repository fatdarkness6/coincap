import { useState, useRef, useEffect } from 'react';
import image from '../../public/headerImage.png';
import { createPortal } from 'react-dom';
import { searchCoinsApi } from '../../api/searchCoinsApi';
import { searchExchanges } from '../../api/searchExchanges';

export default function Header() {
  let input = useRef();
  let background = useRef()

  let [update, setUpdate] = useState(false);
  const [click, setClick] = useState(false);
  const [inputValue, setInputValue] = useState('');
  let [res, setRes] = useState([]);
  let [excangeRes, setExcangeRes] = useState([]);
  let [none , setNone] = useState(false)
  let [plus, setPlus] = useState(1);
  

  useEffect(() => {
    if (inputValue !== '') {
      searchCoinsApi(inputValue)
        .then((e) => {
          return e.json();
        })
        .then((e) => {
          setRes(e.data);
        });

      searchExchanges(inputValue)
        .then((e) => {
          return e.json();
        })
        .then((e) => {
          setExcangeRes(e.data);
        });
    }

    document.addEventListener("click" , () => {
      setPlus(plus++)
    })
  }, [inputValue]);

  useEffect(() => {
    if (document.activeElement !== input.current) {
      setNone(true);
    }else {
      setNone(false)
    }

    document.addEventListener("click" , (e) => {
      if(e.target == background.current ) {
        setClick(false)
      }
    })
  } , [plus])
    
  
  
  
  return (
    <>
    
      <div className='header'>
        <div className='header-wrapper'>
          <div className='items'>
            <div className='coins'>
              <h4>Coins</h4>
              <h4>Exchanges</h4>
              <h4>Swap</h4>
            </div>
            <div className='logo'>
              <img src={image} />
            </div>
            <div className='currency'>
              <div  className='currency-part1'>
                <button

                  onClick={() => {
                    setUpdate(true);
                  }}>
                  <i class='fa-solid fa-magnifying-glass'></i>
                  <input
                    onChange={(e) => {
                      let a = e.target.value;
                      setInputValue(a);
                    }}
                    ref={input}
                    id='idOfInput'
                  />
                </button>
                {inputValue !== '' && (
                  <div  id={ !none ? "block" : "none"}  className='currency-part2-absolute'>
                     
                    <div className='Assets'>
                      <h3>Assets</h3>
                      {res.length !== 0 &&
                        res.map((e) => {
                          return( 
                            <div className='flex-align-center'>
                            <h5>{e.name}</h5>
                            <h5>{`(${e.symbol})`}</h5>
                          </div>
                        );
                        })}
                    </div>
                    <div className='Exchanges'>
                      <h3>Exchanges</h3>
                      {excangeRes.length !== 0 &&
                        excangeRes.map((e) => {
                          return <h5>{e.name}</h5>;
                        })}
                    </div>
                  </div>
                )}
              </div>
              <div
                onClick={() => {
                  setClick(true);
                }}
                className='currency-part2'>
                <i class='fa-solid fa-gear'></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      {click
        ? createPortal(
            <div ref={background} className='black-background'>
              <div className='portal-wrapper'>
                <div className='portal-items'>
                  <div className='portal-item1'>
                    <div className='portal-item1-part1'>
                      <i class='fa-solid fa-screwdriver-wrench'></i>
                      <h4>Settings</h4>
                    </div>
                    <div className='portal-item1-part2'>
                      <i
                        onClick={() => {
                          setClick(false);
                        }}
                        class='fa-solid fa-xmark'></i>
                    </div>
                  </div>
                  <div className='portal-item2'>
                    <h4>Dark Theme</h4>
                    <input type='checkbox'/>
                  </div>
                </div>
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  );
}
