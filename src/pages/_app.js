// ducks
import exampleDuckCreator from "@/ducks/exampleDuckCreator";

// components
import { Layout } from "@/components";

// redux
import { getDuckEgg, wrapperInitializer } from "@/redux";

// fetch
import { fetcher } from "@/fetchers";

const MyApp = ({ Component, pageProps }) => {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
};

const options = {};

if (typeof window === "undefined") {
    options.beforeResult = async (store) => {
        const animals = await fetcher("/hello");
        store.dispatch(exampleDuckCreator.creators.setExample(animals));
    };
}

const collectEggsFromDucks = (ducks) => {
    return ducks.map((duck) => getDuckEgg(duck));
};

const wrapper = wrapperInitializer.getAppWrapper(collectEggsFromDucks([exampleDuckCreator]), options);

export default wrapper.wrapApp(MyApp);
