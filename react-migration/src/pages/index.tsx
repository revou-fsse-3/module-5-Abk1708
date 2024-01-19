import Layout from "@/layouts";
import Head from "next/head";
import { NextPageWithLayout } from "./_app";
import {
    ReactElement,
    JSXElementConstructor,
    ReactNode,
    ReactPortal,
    PromiseLikeOfReactNode,
} from "react";

const Home = () => {
    return (
        <>
            <Head>
                <title>Home Page</title>
            </Head>
            <div className="flex flex-col items-center justify-center h-hnavbar w-wnavbar">
                <h1 className="pb-12 font-serif text-6xl text-white">
                    Welcome to the Weather App
                </h1>
                <p className="pl-96 pr-36 font-serif text-3xl text-white">
                    In order to access the weather app, Press the weather button
                    on the navbar.
                </p>
            </div>
        </>
    );
};

Home.getLayout = function getLayout(
    page:
        | string
        | number
        | boolean
        | ReactElement<any, string | JSXElementConstructor<any>>
        | Iterable<ReactNode>
        | ReactPortal
        | PromiseLikeOfReactNode
        | null
        | undefined
) {
    return <Layout>{page}</Layout>;
};

export default Home;
