//lodash
import _get from 'lodash/get';

//redux
import { createSelector } from 'reselect';
import { createAction } from '@redux/createAction';
import Duck from 'extensible-duck';

const initialState = {
    loading: true,
    error: null,
    showMobile: false,
    cars: {},
    makes: {},
    filters: {},
    showMobileFilterModal: false,
    interiorColors: {},
    exteriorColors: {},
    query: {},
};

const duckCreator = new Duck({
    namespace: '',
    store: 'hydrate',
    consts: {},
    initialState,

    types: [
        'CLEAR',
        'LOADED_CARS',
        'LOADED_MAKES',
        'LOADED_FILTERS',
        'SET_SHOW_MOBILE',
        'SET_SHOW_MOBILE_FILTER_MODAL',
        'SET_EXTERIOR_COLORS',
        'SET_INTERIOR_COLORS',
        'SET_QUERY',
        'UPDATE_STATE',
    ],

    reducer: (state, action, { types }) => {
        switch (action.type) {
            case types.LOADED_CARS: {
                const { payload = {} } = action;
                return {
                    ...state,
                    cars: payload,
                    loading: false,
                    // error: null,
                };
            }

            case types.LOADED_MAKES: {
                const { payload = {} } = action;
                return {
                    ...state,
                    makes: payload,
                    loading: false,
                    // error: null,
                };
            }

            case types.LOADED_FILTERS: {
                const { payload = {} } = action;
                return {
                    ...state,
                    filters: payload,
                    loading: false,
                    // error: null,
                };
            }

            case types.SET_SHOW_MOBILE: {
                const { payload = {} } = action;
                return {
                    ...state,
                    showMobile: window.innerWidth < 768 || payload,
                    loading: false,
                };
            }

            case types.SET_SHOW_MOBILE_FILTER_MODAL: {
                const { payload = {} } = action;
                return {
                    ...state,
                    showMobileFilterModal: payload,
                    loading: false,
                };
            }

            case types.SET_EXTERIOR_COLORS: {
                const { payload = {} } = action;
                return {
                    ...state,
                    exteriorColors: payload,
                    loading: false,
                };
            }

            case types.SET_INTERIOR_COLORS: {
                const { payload = {} } = action;
                return {
                    ...state,
                    interiorColors: payload,
                    loading: false,
                };
            }

            case types.CLEAR: {
                return { ...initialState };
            }

            case types.SET_QUERY: {
                const { payload = {} } = action;
                return {
                    ...state,
                    query: payload,
                    loading: false,
                };
            }

            case types.UPDATE_STATE: {
                const { payload } = action;
                return {
                    ...state,
                    filters: { ...state.filters, [payload.key]: payload.data },
                };
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
        setShowMobile: (payload) =>
            createAction(types.SET_SHOW_MOBILE, payload),
        setShowMobileFilterModal: (payload) =>
            createAction(types.SET_SHOW_MOBILE_FILTER_MODAL, payload),
        setExteriorColors: (payload) =>
            createAction(types.SET_EXTERIOR_COLORS, payload),
        setInteriorColors: (payload) =>
            createAction(types.SET_INTERIOR_COLORS, payload),
        setQuery: (payload) => createAction(types.SET_QUERY, payload),
        updateState: (payload) => createAction(types.UPDATE_STATE, payload),
    }),

    selectors: (duck) => ({
        getDuckState: (state) => _get(state, duck.store, initialState),

        getAllStates: new Duck.Selector(
            (selectors) => (state) => selectors.getDuckState(state),
        ),

        getIsMobile: new Duck.Selector(
            (selectors) => (state) =>
                _get(selectors.getAllStates(state), 'showMobile', false),
        ),

        getLoading: new Duck.Selector((selectors) =>
            createSelector(
                (state) => _get(selectors.getAllStates(state), 'loading', true),
                (loading) => ({
                    loading,
                }),
            ),
        ),
        getAllCars: new Duck.Selector((selectors) =>
            createSelector(
                (state) => _get(selectors.getAllStates(state), 'cars', {}),
                (cars) => ({
                    cars,
                }),
            ),
        ),

        getAllMakes: new Duck.Selector((selectors) =>
            createSelector(
                (state) => _get(selectors.getAllStates(state), 'makes', {}),
                (makes) => ({
                    makes,
                }),
            ),
        ),

        getAllFilters: new Duck.Selector((selectors) =>
            createSelector(
                (state) => _get(selectors.getAllStates(state), 'filters', {}),
                (filters) => ({ filters }),
            ),
        ),

        returnIsMobile: new Duck.Selector((selectors) =>
            createSelector(selectors.getIsMobile, (showMobile) => ({
                showMobile,
            })),
        ),

        openMobileFilterModal: new Duck.Selector((selectors) =>
            createSelector(
                (state) =>
                    _get(
                        selectors.getAllStates(state),
                        'showMobileFilterModal',
                        false,
                    ),
                (showMobileFilterModal) => ({
                    showMobileFilterModal,
                }),
            ),
        ),

        getAllExteriorColors: new Duck.Selector((selectors) =>
            createSelector(
                (state) =>
                    _get(selectors.getAllStates(state), 'exteriorColors', {}),
                (exteriorColors) => ({ exteriorColors }),
            ),
        ),

        getAllInteriorColors: new Duck.Selector((selectors) =>
            createSelector(
                (state) =>
                    _get(selectors.getAllStates(state), 'interiorColors', {}),
                (interiorColors) => ({ interiorColors }),
            ),
        ),
        getQuery: new Duck.Selector((selectors) =>
            createSelector(
                (state) => _get(selectors.getAllStates(state), 'query', {}),
                (query) => ({ query }),
            ),
        ),
    }),
});

export default duckCreator;
