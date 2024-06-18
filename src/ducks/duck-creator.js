import Duck from 'extensible-duck';
import { createSelector } from 'reselect';
import _get from 'lodash/get';
import { createAction } from '@/redux/createAction';

const initialState = {
    loading: true,
    error: null,
    cars: {},
    makes: {},
    filters: {},
};

const duckCreator = new Duck({
    namespace: '',
    store: 'hydrate',
    consts: {},
    initialState,

    types: ['CLEAR', 'LOADED_CARS', 'LOADED_MAKES', 'LOADED_FILTERS'],

    reducer: (state, action, { types }) => {
        switch (action.type) {
            case types.LOADED_CARS: {
                const { payload = {} } = action;
                return {
                    ...state,
                    cars: payload,
                    loading: false,
                    error: null,
                };
            }

            case types.LOADED_MAKES: {
                const { payload = {} } = action;
                return {
                    ...state,
                    makes: payload,
                    loading: false,
                    error: null,
                };
            }

            case types.LOADED_FILTERS: {
                const { payload = {} } = action;
                return {
                    ...state,
                    filters: payload,
                    loading: false,
                    error: null,
                };
            }

            case types.CLEAR: {
                return { ...initialState };
            }

            default:
                return state;
        }
    },

    creators: ({ types }) => ({
        clear: () => createAction(types.CLEAR),
        setCars: (payload) => createAction(types.LOADED_CARS, payload),
        setMakes: (payload) => createAction(types.LOADED_MAKES, payload),
        setFilters: (payload) => createAction(types.LOADED_FILTERS, payload),
    }),

    selectors: (duck) => ({
        getDuckState: (state) => _get(state, duck.store, initialState),

        getAllStates: new Duck.Selector(
            (selectors) => (state) => selectors.getDuckState(state),
        ),

        getCars: new Duck.Selector(
            (selectors) => (state) =>
                _get(selectors.getAllStates(state), 'cars', {}),
        ),

        getMakes: new Duck.Selector(
            (selectors) => (state) =>
                _get(selectors.getAllStates(state), 'makes', {}),
        ),

        getFilters: new Duck.Selector(
            (selectors) => (state) =>
                _get(selectors.getAllStates(state), 'filters', {}),
        ),

        getAllCars: new Duck.Selector((selectors) =>
            createSelector(selectors.getCars, (cars) => ({
                cars,
            })),
        ),

        getAllMakes: new Duck.Selector((selectors) =>
            createSelector(selectors.getMakes, (makes) => ({
                makes,
            })),
        ),
        getAllFilters: new Duck.Selector((selectors) =>
            createSelector(selectors.getFilters, (filters) => ({ filters })),
        ),
    }),
});

export default duckCreator;
