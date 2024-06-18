import Duck from 'extensible-duck';
import { createSelector } from 'reselect';

// lodash
import _get from 'lodash/get';

// custom redux
import { createAction } from '@/redux/createAction';

const initialState = {
    loading: false,
    error: null,
    animals: {},
};

const exampleDuckCreator = new Duck({
    namespace: '',
    store: 'animals',
    consts: {},
    initialState,

    types: ['CLEAR', 'LOADED'],

    reducer: (state, action, { types }) => {
        switch (action.type) {
            case types.LOADED: {
                const { payload = {} } = action;
                return {
                    ...state,
                    animals: payload,
                    loading: false,
                    error: null,
                };
            }

            case types.CLEAR: {
                return { ...initialState };
            }

            default:
        }

        return state;
    },

    creators: ({ types }) => ({
        clear: () => createAction(types.CLEAR),
        setExample: (payload) => createAction(types.LOADED, payload),
    }),

    selectors: (duck) => ({
        getDuckState: (state) => _get(state, duck.store, {}),

        getAnimals: new Duck.Selector(
            (selectors) => (state) =>
                _get(selectors.getDuckState(state), 'animals', {}),
        ),

        getDogs: new Duck.Selector(
            (selectors) => (state) =>
                _get(selectors.getAnimals(state), 'dogs', []),
        ),

        getCats: new Duck.Selector(
            (selectors) => (state) =>
                _get(selectors.getAnimals(state), 'cats', []),
        ),

        getChickens: new Duck.Selector(
            (selectors) => (state) =>
                _get(selectors.getAnimals(state), 'chickens', []),
        ),

        getBirds: new Duck.Selector(
            (selectors) => (state) =>
                _get(selectors.getAnimals(state), 'birds', []),
        ),

        getAnimalsWithTwoFeet: new Duck.Selector((selectors) =>
            createSelector(
                selectors.getChickens,
                selectors.getBirds,
                (chickens, birds) => ({
                    chickens,
                    birds,
                }),
            ),
        ),
    }),
});

export default exampleDuckCreator;
