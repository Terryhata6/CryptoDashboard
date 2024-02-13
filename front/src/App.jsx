import {CryptoContextProvider} from "./Context/crypto-context.jsx";
import AppLayout from "./Components/AppLayout.jsx";


const App = () => {
    return (
        <CryptoContextProvider>
            <AppLayout/>
        </CryptoContextProvider>
        )

};

export default App;

