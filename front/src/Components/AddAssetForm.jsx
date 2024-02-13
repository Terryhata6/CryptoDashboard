import React, {useRef, useState} from "react";
import {
    Divider,
    Select,
    Space,
    Typography,
    Form,
    Button,
    InputNumber,
    DatePicker,
    Result
} from "antd";
import {useCrypto} from "../Context/crypto-context.jsx";
import * as PropTypes from "prop-types";
import CoinInfo from "./CoinInfo.jsx";

function RangePicker(props) {
    return null;
}

RangePicker.propTypes = {
    showTime: PropTypes.shape({format: PropTypes.string}),
    format: PropTypes.string,
    onOk: PropTypes.any
};

export default function AddAssetForm({onClose}) {
    const [formTotal] = Form.useForm();
    const {crypto, addAsset} = useCrypto();
    const [coin, setCoin] = useState(null);
    const [submitted, setSubmitted] = useState(false)
    const assetRef = useRef()

    if (!coin) {
        return (<Select
            style={{width: "100%"}}
            onSelect={(value) => setCoin(crypto.find(c => c.id === value))}
            placeholder="Select coin"
            options={crypto.map((item) => ({
                label: item.name,
                value: item.id,
                icon: item.icon
            }))}
            optionRender={(option) => (
                <Space>
                    <img style={{width: 20}} src={option.data.icon}
                         alt={"option.data.label"}/> {option.data.label} {' '}
                </Space>
            )}
        />)
    }


    if (submitted) {
        return (<Result
            status="success"
            title="New asset Added"
            subTitle={`Added ${assetRef.current.amount} of ${assetRef.current.name} by price ${assetRef.current.price}`}
            extra={[
                <Button type="primary" key="console" onClick={onClose}>
                    Nice
                </Button>
            ]}
        />)
    }

    const validateMessages = {
        required: '${label} is required!',
        types: {
            number: '${label} is not valid number'
        },
        number: {
            range: '${label} must be between ${min} and ${max}'
        }
    };



    function onFinish(values) {
        console.log('finish', values)
        const newAsset = {
            id: coin.id,
            name: coin.name,
            amount: values.amount,
            price: values.price,
            date: values.date?.$d ?? new Date(),
        }
        assetRef.current = newAsset;
        setSubmitted(true);
        addAsset(newAsset);
    }

    function onDateChange(value) {
        console.log("date changed", value)

    }

    function onOk(value) {
        console.log("onOk", value)

    }

    function handleAmountChange(value) {
        const price = formTotal.getFieldValue("price");
        const result = price * value
        formTotal.setFieldsValue({
            total: +result.toFixed(2)
        });
    }

    function handlePriceChange(value) {
        const amount = formTotal.getFieldValue("amount");
        formTotal.setFieldsValue({
            total: +amount * value.toFixed(2)
        });
    }

    return (
        <>
            <Typography.Title level={2} style={{margin: 0}}>
                <CoinInfo coin={coin}/>
                <Divider></Divider>
                <Form
                    form={formTotal}
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 10,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{
                        price: coin.price.toFixed(2)
                    }}
                    onFinish={onFinish}
                    validateMessages={validateMessages}
                >
                    <Form.Item
                        label="Amount"
                        name="amount"
                        rules={[
                            {
                                required: true,
                                type: 'number',
                                min: 0,
                            },
                        ]}
                    >
                        <InputNumber
                            style={{width: '100%'}}
                            onChange={handleAmountChange}
                        >
                        </InputNumber>
                    </Form.Item>

                    <Form.Item
                        label="Price"
                        name="price"
                    >
                        <InputNumber
                            onChange={handlePriceChange}
                            style={{width: '100%'}}/>
                    </Form.Item>

                    <Form.Item
                        label="Date & Time"
                        name="date"

                    >
                        <DatePicker
                            showTime
                            onChange={onDateChange}
                            onOk={onOk}
                            initialValue={Date.now()}
                        />
                        <RangePicker
                            showTime={{
                                format: 'HH:mm',
                            }}
                            format="YYYY-MM-DD HH:mm"
                            onChange={onDateChange}
                            onOk={onOk}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Total"
                        name="total"

                    >
                        <InputNumber
                            disabled
                            style={{width: '100%'}}
                        />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Add asset
                        </Button>
                    </Form.Item>
                </Form>
            </Typography.Title>

        </>

    )
}