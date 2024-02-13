import AppHeader from "./AppHeader.jsx";
import {Layout, Spin} from "antd";
import AppSider from "./AppSider.jsx";
import AppContent from "./AppContent.jsx";
import {useCrypto} from "../Context/crypto-context.jsx";

export default function AppLayout() {
    const {loading} = useCrypto()

    if (loading) {
        return <Spin color="red" fullscreen/>
    }

    return <Layout>
        <AppHeader/>
        <Layout>
            <AppSider/>
            <AppContent/>
        </Layout>
    </Layout>
}