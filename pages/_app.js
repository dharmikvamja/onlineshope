import Hedear from "@/Componets/Hedear";
import appstore from "@/store/appstore";
import "@/styles/globals.css";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }) {
    return (
        <>
            <Provider store={appstore}>
                <Hedear />
                <Component {...pageProps} />
            </Provider>
        </>
    );
}
