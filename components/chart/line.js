import { Line } from "react-chartjs-2";
import { Chart as ChartJs , CategoryScale , LinearScale , PointElement , LineElement , Title , Tooltip , Legend } from "chart.js";
import { useEffect } from "react";
import { candleApi } from "../../api/candle";

ChartJs.register(CategoryScale , LinearScale , PointElement , LineElement , Title , Tooltip , Legend )

export default function LineChart() {
    let options = {}

    useEffect(() => {
        candleApi().then((e) => {
            return e.json()
        }).then((e) => {
            console.log(e)
        })
    })
    let data = {}

    return <><Line options={options} data={data} /></>
}