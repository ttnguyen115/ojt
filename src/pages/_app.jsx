import React from 'react';
// ducks

// components

// redux

// fetch

//styles
import '../app/globals.css';

//components
import { seedingData } from '../utils';
import { carsFetcher } from '@fetchers/index';
import { makesFetcher } from '@fetchers/makes-fetcher';
import duckCreator from '@ducks/duck-creator';
import Layout from '@components/Layout';
import { getDuckEgg, wrapperInitializer } from '@redux/store';
import filtersFetcher from '@fetchers/filter-fetcher';

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
        let cars = await carsFetcher('/models?sort=asc&year=2020');
        const makes = await makesFetcher('/makes');
        const filters = await filtersFetcher();
        const exteriorColors = seedingData.colors[0].exterior;
        const interiorColors = seedingData.colors[1].interior;
        store.dispatch(duckCreator.creators.setCars(cars.data));
        store.dispatch(duckCreator.creators.setMakes(makes.data));
        store.dispatch(duckCreator.creators.setFilters(filters.data));
        store.dispatch(duckCreator.creators.setExteriorColors(exteriorColors));
        store.dispatch(duckCreator.creators.setInteriorColors(interiorColors));
    };
}
const collectEggsFromDucks = (ducks) => {
    return ducks.map((duck) => getDuckEgg(duck));
};

const wrapper = wrapperInitializer.getAppWrapper(
    collectEggsFromDucks([duckCreator]),
    options,
);

export default wrapper.wrapApp(MyApp);
