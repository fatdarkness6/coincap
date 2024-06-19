export default function RenderCoins(props) {
    return (
        <div className="border">

            <div className="section1">
                <h5>{props.id}</h5>
                <div className="mix">
                <h5>{props.name}</h5>
                <h5>{props.symbol}</h5>
                </div>
            </div>
            <div className="section2">
                <h5>{props.priceUsd}</h5>
            </div>
        
        </div>
    )
}