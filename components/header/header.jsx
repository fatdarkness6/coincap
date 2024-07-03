import { useState, useRef, useEffect } from 'react';
import image from '../../public/a.png';
import image2 from '../../public/white.png';
import { createPortal } from 'react-dom';
import { searchCoinsApi } from '../../api/searchCoinsApi';
import { searchExchanges } from '../../api/searchExchanges';
import { Link } from 'react-router-dom';

export default function Header() {
  const input = useRef();
  const background = useRef();
  const h5 = useRef();
  const button = useRef()
  let back = useRef(null);
  const wrapper = useRef(null);
  const [click, setClick] = useState(false);
  const [inputValue, setInputValue] = useState('');
  let [res, setRes] = useState([]);
  let [excangeRes, setExcangeRes] = useState([]);
  let [none, setNone] = useState(false);
  let [plus, setPlus] = useState(1);
  let [checkBox, setCheckBox] = useState(false);
  let [active2, setActive2] = useState(false);
  let [openButton, setOpenButton] = useState(false);

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

    document.addEventListener('click', () => {
      setPlus(plus++);
    });
  }, [inputValue]);

  useEffect(() => {
    console.log(document.activeElement == button.current);
    
      if (document.activeElement !== input.current && document.activeElement !== button.current) {
      setTimeout(() => {
        setNone(true);
        setOpenButton(false);
      }, 300);
    } else {
      setNone(false);
    }

    document.addEventListener('click', (e) => {
      if (e.target == background.current || e.target == wrapper.current) {
        setClick(false);
      }
    });
  }, [plus]);
  if (checkBox === true) {
    document.body.classList.add('darkMode');
  } else {
    document.body.classList.remove('darkMode');
  }
  let getActivityFromLocalStorage = localStorage.getItem('val');
  useEffect(() => {
    if (getActivityFromLocalStorage == 'true') {
      setCheckBox(false);
    } else {
      setCheckBox(true);
    }
  }, [checkBox]);

  useEffect(() => {
    document.addEventListener('click', (e) => {
      if (e.target == back.current) {
        setActive2(false);
      }
    });
  }, []);

  return (
    <>
      <div className='header'>
        <div className='header-wrapper'>
          <div className='items'>
            <div className='coins'>
              <Link className='NoNe2' to={`/`}>
                <h4>Coins</h4>
              </Link>
              <i
                onClick={() => {
                  setActive2(true);
                }}
                class='fa-solid fa-bars'></i>
              <Link className='NoNe2' to={`/exchanges`}>
                <h4>Exchanges</h4>
              </Link>
              <Link
                className='NoNe2'
                to={
                  'https://app.shapeshift.com/?_ga=2.216213151.886595383.1719752448-46182446.1717690257#/trade'
                }>
                <h4>Swap</h4>
              </Link>
            </div>
            <div className='logo'>
              <Link to={`/`}>
                {document.body.classList.contains('darkMode') ? (
                  <img className='image2' src={image2} />
                ) : (
                  <img src={image} />
                )}
              </Link>
            </div>
            <div className='currency'>
              <div className='currency-part1'>
                <button ref={button}
                  className={openButton ? 'openBtn' : 'closeBtn'}
                  onClick={() => {
                    setOpenButton(true);
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
                  <div
                    id={!none ? 'block' : 'none'}
                    className='currency-part2-absolute'>
                    <div className='Assets'>
                      <h3>Assets</h3>
                      {res.length !== 0 &&
                        res.map((e) => {
                          return (
                            <Link
                              onClick={() => {
                                setNone(false);
                                setTimeout(() => {
                                  location.reload();
                                }, 100);
                              }}
                              to={`/assets/${e.id}`}>
                              <div className='flex-align-center'>
                                <h5>{e.name}</h5>
                                <h5>{`(${e.symbol})`}</h5>
                              </div>
                            </Link>
                          );
                        })}
                    </div>
                    <div className='Exchanges'>
                      <h3>Exchanges</h3>

                      {excangeRes.length !== 0 &&
                        excangeRes.map((e) => {
                          return (
                            <div>
                              <Link
                                onClick={() => {
                                  setNone(false);
                                  setTimeout(() => {
                                    location.reload();
                                  }, 100);
                                }}
                                to={`/exchanges/${e.exchangeId}`}>
                                <h5 ref={h5}>{e.name}</h5>
                              </Link>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                )}
              </div>
              <div
                onClick={() => {
                  setClick(true);
                }}
                className='currency-part2 NoNe2'>
                <i class='fa-solid fa-gear'></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      {click
        ? createPortal(
            <div ref={background} className='black-background'>
              <div ref={wrapper} className='portal-wrapper'>
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

                    <input
                      checked={checkBox}
                      onClick={() => {
                        localStorage.setItem('val', checkBox);
                        setCheckBox(!checkBox);
                      }}
                      type='checkbox'
                    />
                  </div>
                </div>
              </div>
            </div>,
            document.body
          )
        : null}
      <div ref={back} className={active2 ? 'back' : null}></div>
      <div
        id={active2 ? 'transform' : 'notTransform'}
        className='hamberger-menu '>
        <div className='hamberger-menu-slice1 flex-column-center'>
          <Link className='flex-column-center' to={'/'}>
            <i class='fa-brands fa-bitcoin'></i>
            <h4>Coins</h4>
          </Link>
        </div>
        <div className='hamberger-menu-slice2'>
          <Link className='flex-column-center' to={'/exchanges'}>
            <i class='fa-solid fa-exchange-alt'></i>
            <h4>Exchanges</h4>
          </Link>
        </div>
        <div className='hamberger-menu-slice3 flex-column-center'>
          <Link
            className='flex-column-center'
            to={
              'https://app.shapeshift.com/?_ga=2.225053587.886595383.1719752448-46182446.1717690257#/trade'
            }>
            <i class='fa-solid fa-shuffle'></i>
            <h4>Swap</h4>
          </Link>
        </div>
        <div className='hamberger-menu-slice4 flex-column-center '>
          <Link className='flex-column-center' to={'https://docs.coincap.io'}>
            <i class='fa-solid fa-a'></i>
            <h4>Api</h4>
          </Link>
        </div>
        <div
          onClick={() => {
            setClick(true);
            setActive2(false);
          }}
          className='hamberger-menu-slice5 flex-column-center '>
          <i class='fa-solid fa-gear'></i>
          <h4>Setting</h4>
        </div>
      </div>
    </>
  );
}
