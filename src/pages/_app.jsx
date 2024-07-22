import React from 'react';
// ducks
import duckCreator from '@ducks/duckCreator';

// redux
import { getDuckEgg, wrapperInitializer } from '@redux/store';

// fetchers
import { seedingData } from '../utils';

//styles
import '../app/globals.css';

//layout
import Layout from '@components/Layout';
import carsFetcher, { trimsFetcher } from '@fetchers/carsFetcher';
import makesFetcher from '@fetchers/makesFetcher';
import filtersFetcher from '@fetchers/filterFetcher';

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
        cars.data = seedingData.carDataGenerator(cars.data, makes.data);

        store.dispatch(duckCreator.creators.setCars(cars.data));
        store.dispatch(duckCreator.creators.setMakes(makes.data));
        // store.dispatch(duckCreator.creators.setFilters(filters.data));
        // store.dispatch(duckCreator.creators.setExteriorColors(exteriorColors));
        // store.dispatch(duckCreator.creators.setInteriorColors(interiorColors));
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
