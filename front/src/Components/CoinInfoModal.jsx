import {Divider, Tag, Typography} from "antd";
import {useCrypto} from "../Context/crypto-context.jsx";
import {copyToClipboard} from "../utils.js";
import {CopyOutlined} from "@ant-design/icons";
import CoinInfo from "./CoinInfo.jsx";


export default function CoinInfoModal({coin}) {
    const {} = useCrypto();


    const callback = function () {

    }

    return (
        <>
            <CoinInfo coin={coin} withSymbol/>
            <Divider/>
            <Typography.Paragraph>
                <Typography.Text strong>
                    1 hour:
                </Typography.Text>
                <Tag color={coin.priceChange1h > 0 ? "green" : "red"}>
                    {coin.priceChange1h}%
                </Tag>
                <Typography.Text strong>
                    1 day:
                </Typography.Text>
                <Tag color={coin.priceChange1d > 0 ? "green" : "red"}>
                    {coin.priceChange1d}%
                </Tag>
                <Typography.Text strong>
                    1 week:
                </Typography.Text>
                <Tag color={coin.priceChange1w > 0 ? "green" : "red"}>
                    {coin.priceChange1w}%
                </Tag>

            </Typography.Paragraph>
            <Typography.Paragraph>
                <Typography.Text strong>Price: </Typography.Text>
                {coin.price.toFixed(2)}$
            </Typography.Paragraph>
            <Typography.Paragraph>
                <Typography.Text strong>PriceBTC: </Typography.Text>
                {coin.priceBtc}
            </Typography.Paragraph>
            <Typography.Paragraph>
                <Typography.Text strong>Market cap: </Typography.Text>
                {coin.marketCap.toFixed(2)}$
            </Typography.Paragraph>
            <Typography.Paragraph>
                <Typography.Text strong>Contract address: </Typography.Text>
                {coin.contractAddress}
                <CopyOutlined style={{marginLeft: "1rem"}}
                              onClick={() => copyToClipboard(coin.contractAddress, callback)}/>
            </Typography.Paragraph>

        </>
    )
}