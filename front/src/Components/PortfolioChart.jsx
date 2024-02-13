import {Pie} from "react-chartjs-2";
import {ArcElement, Chart as ChartJS, Legend,Tooltip} from "chart.js";
import {useCrypto} from "../Context/crypto-context.jsx";

ChartJS.register(ArcElement, Tooltip, Legend);



export default function PortfolioChart(){
    const {assets, crypto} = useCrypto()

    const data = {
        labels: assets.map(item => item.name),
        datasets: [
            {
                label: 'USD value',
                data: assets.map(item =>
                        (item.amount * crypto.find((c)=>c.id===item.id).price).toFixed(2)),
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ]

            },
        ],
    };


    return <div style={{
        display:'flex',
        marginBottom:'1rem',
        justifyContent:'center',
        height:500
    }}>
        <Pie

             data={data} />
    </div>
}