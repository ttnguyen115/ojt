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
import { getMakeCarsNumber } from '@utils/carUtils';
import { Toaster } from 'sonner';
import localInstance from '@fetchers/localInstance';

const MyApp = ({ Component, pageProps }) => {
    return (
        <Layout>
            <Toaster />
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

const collectEggsFromDucks = (ducks) => {
    return ducks.map((duck) => getDuckEgg(duck));
};

const wrapper = wrapperInitializer.getAppWrapper(
    collectEggsFromDucks([duckCreator]),
    options,
);

export default wrapper.wrapApp(MyApp);
