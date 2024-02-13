import {Card, Layout, List, Statistic, Typography, Spin, Tag} from "antd";
import {ArrowDownOutlined, ArrowUpOutlined} from '@ant-design/icons';
import {percentDifferenceCounter, capitalize} from "../utils.js";
import {useCrypto} from "../Context/crypto-context.jsx";


const siderStyle = {
    padding: "1rem"
};

export default function AppSider() {
    const {assets, loading} = useCrypto();


    return (
        <Layout.Sider width="25%" style={siderStyle}>
            {assets.map(asset => {
                return (
                    <Card key={asset.id} style={{marginBottom: "1rem"}}>
                        <Statistic
                            title={capitalize(asset.id)}
                            value={asset.totalAmount}
                            precision={2}
                            valueStyle={{color: asset.grow ? '#3f8600' : '#cf1322'}}
                            prefix={asset.grow ? <ArrowUpOutlined/> : <ArrowDownOutlined/>}
                            suffix={"$"}
                        />
                        <List
                            dataSource={[
                                {title: 'Total Profit ', value: asset.totalProfit, withTag: true},
                                {title: 'Asset Amount ', value: asset.amount, isPlain: true},
                            ]}
                            renderItem={(item) =>
                                (<List.Item>
                                    <span>{item.title}</span>
                                    <span>
                                        {item.withTag &&
                                            <Tag color={asset.grow ? 'green' : 'red'}>{asset.growPercent}%</Tag>}
                                        {item.isPlain && item.value}
                                        {!item.isPlain && (
                                            <Typography.Text type={(asset.grow) ? 'success' : 'danger'}>
                                                {item.value.toFixed(2)}$
                                            </Typography.Text>
                                        )}
                                    </span>
                                </List.Item>)
                            }/>
                    </Card>
                )
            })}
        </Layout.Sider>
    )
}