import { buildStore } from "@redux-eggs/core";
import { combineReducers, compose, configureStore } from "@reduxjs/toolkit";

export const createStore = ({
    combiner = combineReducers,
    defaultMiddlewareOptions,
    devtools,
    extensions
}) => {
    return buildStore(
        (
            reducer,
            middlewareEnhancer,
            enhancersFromExtensions,
            middlewaresFromExtensions
        ) => {
            return configureStore({
                reducer,
                devtools,
                enhancers(getDefaultEnhancers) {
                    return getDefaultEnhancers().concat(
                        ...enhancersFromExtensions
                    );
                },
                middleware(getDefaultMiddleware) {
                    return getDefaultMiddleware(defaultMiddlewareOptions)
                        .prepend(middlewaresFromExtensions)
                        .concat(middlewareEnhancer);
                },
            });
        },
        combiner,
        compose,
        extensions
    );
};
