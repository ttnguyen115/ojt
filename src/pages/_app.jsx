// ducks
import exampleDuckCreator from '@/ducks/exampleDuckCreator';

// components
import { Layout } from '@/components';

// redux
import { getDuckEgg, wrapperInitializer } from '@/redux';

// fetch
import { carsFetcher } from '@/fetchers';
import React from 'react';

//styles
import '../app/globals.css';
const MyApp = ({ Component, pageProps }) => {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
};

const options = {};

if (typeof window === 'undefined') {
    options.beforeResult = async (store) => {
        const cars = await carsFetcher('/models?sort=asc&year=2015');
        console.log(cars.data);
        store.dispatch(exampleDuckCreator.creators.setExample(cars.data));
    };
}

const collectEggsFromDucks = (ducks) => {
    return ducks.map((duck) => getDuckEgg(duck));
};

const wrapper = wrapperInitializer.getAppWrapper(
    collectEggsFromDucks([exampleDuckCreator]),
    options,
);

export default wrapper.wrapApp(MyApp);
