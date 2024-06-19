import { useState , useRef } from 'react';
import image from '../../public/headerImage.png';

export default function Header() {
  let input = useRef();

  let [update , setUpdate] = useState(false)
  
    if(update){
      setUpdate(false);
      input.current.focus();
    }
  return (
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
            <div className='currency-part1'>
              <button onClick={() => {
                setUpdate(true);
              }}>
                <i class='fa-solid fa-magnifying-glass'></i>
                <input ref={input} id='idOfInput' />
              </button>
            </div>
            <div className='currency-part2'>
              <i class='fa-solid fa-gear'></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
