// helpers
import { mapDuckEggsToPage } from '@helpers/mapDuckEggsToPage';
import seedingData from '@utils/seedingData';
import handleFilterCars from '@utils/filterUtils/filterCarsFromQuery';
import duckCreator from '@ducks/duckCreator';

// hooks
import useCustomNavigation from '@hooks/useCustomNavigation';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

//selectors
import { getFilters } from '@redux/selectors';

//axios
import localInstance from '@fetchers/localInstance';
import CheckboxFilter from '@components/shared/filters/checkboxFilter';
import CarHolder from '@components/shared/carHolder/carHolder';
import { getMakeCarsNumber } from '@utils/carUtils';

const SearchCarResults = ({ title, slugging }) => {
    const { query } = useRouter();
    const filters = getFilters();

    const navigateToPage = useCustomNavigation();

    const dispatch = useDispatch();
    const handleClick = () => {
        navigateToPage({ query: '123' });
    };

    useEffect(() => {
        const fetchData = async () => {
            const { make, model } = query;

            try {
                dispatch(duckCreator.creators.setLoading(true));
                const data = await handleFilterCars(
                    model?.toString() || '',
                    make?.toString() || '',
                );
                const makes = getMakeCarsNumber(data.makes, data.models);

                const filteredCars = seedingData.carDataGenerator(
                    data.cars,
                    data.makes,
                );

                dispatch(
                    duckCreator.creators.updateState({
                        key: 'makes',
                        data: makes,
                    }),
                );

                dispatch(
                    duckCreator.creators.updateState({
                        key: 'filteredCars',
                        data: filteredCars,
                    }),
                );
                dispatch(
                    duckCreator.creators.updateState({
                        key: 'cars',
                        data: data.makeModels,
                    }),
                );

                dispatch(
                    duckCreator.creators.updateState({
                        key: 'exteriorColors',
                        data: data.colors,
                    }),
                );
                dispatch(
                    duckCreator.creators.updateState({
                        key: 'interiorColors',
                        data: data.intColors,
                    }),
                );
                dispatch(
                    duckCreator.creators.updateState({
                        data: data.engines,
                        key: 'enginesType',
                    }),
                );
                dispatch(
                    duckCreator.creators.updateState({
                        data: data.bodies,
                        key: 'bodiesType',
                    }),
                );
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [query]);

    return (
        <div className='flex flex-col items-start w-full'>
            <div className='grid md:grid-cols-12 gap-x-4 gap-y-2 w-full'>
                <div
                    suppressHydrationWarning
                    className='hidden lg:block lg:col-span-3 relative items-start border-2 border-gray-200 rounded-md h-fit overflow-y-scroll'
                >
                    <CheckboxFilter />
                </div>
                <div className='col-span-12 lg:col-span-9 w-full flex flex-col gap-4'>
                    {/* <SortAndCompare /> */}
                    <CarHolder />
                </div>
            </div>
        </div>
    );
};

SearchCarResults.getInitialProps = async (context) => {
    const { make, model } = context.query;
    let data = {};

    try {
        const fetchedData = await handleFilterCars(model, make);
        const makes = getMakeCarsNumber(fetchedData.makes, fetchedData.models);
        context.store.dispatch(
            duckCreator.creators.updateState({
                key: 'makes',
                data: makes,
            }),
        );
        context.store.dispatch(
            duckCreator.creators.updateState({
                key: 'exteriorColors',
                data: fetchedData.colors,
            }),
        );
        context.store.dispatch(
            duckCreator.creators.updateState({
                key: 'interiorColors',
                data: fetchedData.intColors,
            }),
        );

        context.store.dispatch(
            duckCreator.creators.updateState({
                key: 'filteredCars',
                data: seedingData.carDataGenerator(cars.data, filters.makes),
            }),
        );
        context.store.dispatch(
            duckCreator.creators.updateState({
                data: fetchedData.engines,
                key: 'enginesType',
            }),
        );
        context.store.dispatch(
            duckCreator.creators.updateState({
                data: fetchedData.bodies,
                key: 'bodiesType',
            }),
        );
    } catch (error) {
        console.error(error);
    }
    return {
        title: 'SearchCarResults',
        slugging: data || {},
    };
};

const { WrappedPage } = mapDuckEggsToPage(SearchCarResults, {
    // Only add reducers which are only used in this PageComponent
    // exampleDuckCreator had called API and wrapped as a global reducer
    reducers: [],
});

export default WrappedPage;
