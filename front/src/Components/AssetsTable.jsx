import {Table} from "antd";
import {useCrypto} from "../Context/crypto-context.jsx";


const columns = [
    {
        title: 'Coin',
        dataIndex: 'name',
        sorter: (a, b) => a.name.length - b.name.length,
        sortDirections: ['descend'],
    },
    {
        title: 'Purchase Price',
        dataIndex: 'buyedPrice',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.age - b.age,
    },
    {
        title: 'Amount',
        dataIndex: 'amount',

    },
    {
        title: 'Net worth, $',
        dataIndex: 'netWorth',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.netWorth - b.netWorth,
    },
];

export default function AssetsTable() {
    const {assets, crypto} = useCrypto();
    const data = assets.map(item => {
        return {
            key: item.id,
            name: item.name,
            buyedPrice: item.price,
            amount: item.amount,
            netWorth: (item.amount * crypto.find((c)=>c.id===item.id).price).toFixed(2)
        }
    })

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    return <div>
        <Table columns={columns} dataSource={data} onChange={onChange}/>
    </div>
}