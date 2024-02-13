import {Button, Drawer, Modal} from "antd";
import CoinInfoModal from "./CoinInfoModal.jsx";
import AddAssetForm from "./AddAssetForm.jsx";
import React, {useState} from "react";


export default function AddAssetButton({wideWidth}) {
    const [drawer,setDrawer] = useState(false);

    return (
        <>
            <Button
                type="primary"
                onClick={() => setDrawer(true)}
                style={wideWidth&&{width:'100%'}}
            >
                Add Asset</Button>

            <Drawer
                width={600}
                title="Add asset"
                onClose={() => setDrawer(false)}
                open={drawer}
                destroyOnClose={true}
            >
                <AddAssetForm onClose={() => setDrawer(false)}/>
            </Drawer>
        </>
    )
}


