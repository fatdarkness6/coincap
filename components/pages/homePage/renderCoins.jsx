import { useEffect, useRef, useState } from "react";
import LineChart from "../../chart/line";


export default function RenderCoins(props) {
    let [tr , setTrue] = useState(false)

    function calculate(x) {

        if (x >= 0.01) {
            return "$" + parseFloat(x).toFixed(2)
        }else if (x < 0.01) {
            return "$" + parseFloat(x).toFixed(6)
        }
    }

    function calculateBigNumber(y) {
         if (y <= 1000000000000 && y >=100000000000) {
            let transformed = `${(y / 1000000000).toFixed(2)}b`;
            return transformed;
        }else if(y <= 100000000000 && y>= 10000000000) {
            return `${(y / 1000000000).toFixed(2)}b`
        }else if (y < 10000000000 && y>= 1000000000) {
            return `${(y / 1000000000).toFixed(2)}b`
        }else if (y <1000000000 && y >= 100000000) {
            return `${(y / 1000000).toFixed(2)}m`
        }else if (y <100000000 && y >= 10000000) {
             return `${(y / 1000000).toFixed(2)}m`
        }else if (y <10000000 && y >= 1000000) {
             return `${(y / 1000000).toFixed(2)}m`
        }else if (y <10000000 && y>=100000){
            return `${(y / 1000).toFixed(2)}k`
        }else if (y <100000 && y >= 10000) {
            return `${(y / 1000).toFixed(2)}k`
        }else if (y < 10000 && y>= 1000) {
            return `${(y / 1000).toFixed(2)}k`
        }else if (y>=1000000000000) {
            return  `${(y / 1000000000000).toFixed(2)}t`
        }else if (y >= 0.01 || y < 0) {
            return parseFloat(y).toFixed(2)
        }
        
    }
    useEffect(() => {
        if (props.changePercent24Hr < 0) {
            setTrue(true)
        }
    } , [])

    return (
        <>
        <tr>
            {/* <div className="border"> */}

            {/* <div className="section1"> */}
               <td className="center align"><h5>{props.id}</h5></td> 
               <td><div className="mix">
                <h5>{props.name}</h5>
                <h5>{props.symbol}</h5>
                </div></td>
                
            {/* </div> */}
            {/* <div className="section2"> */}
                <td className='right align'><h5>{calculate(props.priceUsd)}</h5></td>
                <td className='right align'><h5>{calculateBigNumber(props.marketCapUsd)}</h5></td>
                <td className='right align'><h5>{calculate(props.vwap24Hr)}</h5></td>
                <td className='right align'><h5>{calculateBigNumber(props.supply)}</h5></td>
                <td className='right align'><h5>{calculateBigNumber(props.volumeUsd24Hr)}</h5></td>
                <td id={tr ? "red" : "green"} className='right align'><h5>{calculateBigNumber(props.changePercent24Hr)}%</h5></td>
            {/* </div> */}

            {/* </div> */}
        </tr>
        {/* <tr>
            <td></td>
            <td>
                
            </td>
        </tr> */}
        </>
        
    )
}