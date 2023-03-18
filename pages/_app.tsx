import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Head from "next/head";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { Provider } from "react-redux";
import store from "../store/configureStore";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>조인밴드 - 좋은 밴드원을 만나고 좋은 합주실을 구할 수 있는 곳! 거기다 좋은 공연까지!</title>
                <meta name="description" content="JoinBand" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
            <Footer />
        </>
    );
}
