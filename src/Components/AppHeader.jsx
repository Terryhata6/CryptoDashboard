import {Button, Drawer, Layout, Modal, Select, Space} from "antd";
import {useCrypto} from "../Context/crypto-context.jsx";
import {useEffect, useState} from "react";
import CoinInfoModal from "./CoinInfoModal.jsx";
import AddAssetForm from "./AddAssetForm.jsx";

const headerStyle = {
    width: '100%',
    textAlign: 'center',
    height: 60,
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
};

const handleChange = (value) => {
    console.log(`selected ${value}`);
};

const options = [
    {
        label: 'China',
        value: 'china',
        emoji: '🇨🇳',
        desc: 'China (中国)',
    },
    {
        label: 'USA',
        value: 'usa',
        emoji: '🇺🇸',
        desc: 'USA (美国)',
    },
    {
        label: 'Japan',
        value: 'japan',
        emoji: '🇯🇵',
        desc: 'Japan (日本)',
    },
    {
        label: 'Korea',
        value: 'korea',
        emoji: '🇰🇷',
        desc: 'Korea (韩国)',
    },
];


export default function AppHeader() {
    const {crypto} = useCrypto();
    const [select, setSelect] = useState(false);
    const [modal, setModal] = useState(false);
    const [coin, setCoin] = useState(null);
    const [drawer,setDrawer] = useState(false);
    const cryptoArray = crypto.map((coin) => ({
        label: coin.name,
        value: coin.id,
        icon: coin.icon

    }))

    useEffect(() => {
        const keypress = event => {
            if (event.key === '/') {
                setSelect(true);
            }
        }

        document.addEventListener('keypress', keypress);
        return () => {
            document.removeEventListener('keypress', keypress);
        }
    }, [])

    function handleSelect(value) {

        setCoin(crypto.find((c)=>c.id === value));
        setModal(true);
    }

    return (
        <Layout.Header style={headerStyle}>
            <Select
                style={{width: 250}}
                value="press / to open"
                open={select}
                onSelect={handleSelect}
                onClick={() => setSelect((prev) => !prev)}
                options={cryptoArray}
                optionRender={(option) => (
                    <Space>
                        <img style={{width: 20}} src={option.data.icon}
                             alt={"option.data.label"}/> {option.data.label} {' '}
                    </Space>
                )}
            />
            <Button
                type="primary"
                onClick={()=>setDrawer(true)}
            >
                Add Asset</Button>
            <Modal
                open={modal}
                onCancel={()=>setModal(false)}
                footer={null}>
                <CoinInfoModal coin={coin}/>
            </Modal>
            <Drawer
                width={600}
                title="Add asset"
                onClose={()=> setDrawer(false)}
                open={drawer}
                destroyOnClose={true}
            >
                <AddAssetForm onClose={() => setDrawer(false)}/>
            </Drawer>

        </Layout.Header>
    );
}