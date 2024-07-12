import React from 'react';
// ducks
import duckCreator from '@ducks/duckCreator';

// redux
import { getDuckEgg, wrapperInitializer } from '@redux/store';

// fetchers
import filtersFetcher from '@fetchers/filterFetcher';
import { seedingData } from '../utils';
import { makesFetcher } from '@fetchers/makesFetcher';
import carsFetcher, { trimsFetcher } from '@fetchers/carsFetcher';

//styles
import '../app/globals.css';

//layout
import Layout from '@components/Layout';
import { getCars, getMakes } from '@redux/selectors';

const MyApp = ({ Component, pageProps }) => {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
};

const fetchTrims = async (car) => {
    const trims = await trimsFetcher(
        `/trims?verbose=yes&model=${car.name}&year=2019&make_model_id=${car.id}&make_id=${car.make_id}`,
    );
    car.trims = trims.data;
    return car;
};

const options = {};

if (typeof window === 'undefined') {
    options.beforeResult = async (store) => {
        let cars = await carsFetcher('/models?sort=asc&year=2019');
        cars.data.forEach(async (car) => {
            car = await fetchTrims(car);
        });
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
