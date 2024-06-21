// ducks
import duckCreator from '@/ducks/duck-creator';

// components
import { Layout } from '@/components';

// redux
import { getDuckEgg, wrapperInitializer } from '@/redux';

// fetch
import { carsFetcher } from '@/fetchers';
import { makesFetcher } from '@/fetchers/makes-fetcher';
import React, { useMemo } from 'react';

//styles
import '../app/globals.css';
import filtersFetcher from '@/fetchers/filter-fetcher';
import { seedingData } from '../utils';
import { filter } from 'lodash';

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
        const exteriorColors = seedingData.generateRandomColor();
        const interiorColors = seedingData.generateRandomColor();
        store.dispatch(duckCreator.creators.setCars(cars.data));
        store.dispatch(duckCreator.creators.setMakes(makes.data));
        store.dispatch(duckCreator.creators.setFilters(filters.data));
        store.dispatch(duckCreator.creators.setExteriorColors(exteriorColors));
        store.dispatch(duckCreator.creators.setInteriorColors(interiorColors));
    };
}
// console.log(options.beforeResult);
const collectEggsFromDucks = (ducks) => {
    return ducks.map((duck) => getDuckEgg(duck));
};

const wrapper = wrapperInitializer.getAppWrapper(
    collectEggsFromDucks([duckCreator]),
    options,
);

export default wrapper.wrapApp(MyApp);
