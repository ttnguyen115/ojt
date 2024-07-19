// helpers
import { mapDuckEggsToPage } from '@helpers/mapDuckEggsToPage';

// hooks
import useCustomNavigation from '@hooks/useCustomNavigation';

// components
import CheckboxFilter from '@components/shared/filters/checkboxFilter';
import CarHolder from '@components/shared/carHolder/carHolder';
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';

//utils
import handleFilterCars from '@fetchers/fetchFilteredData';
import { useDispatch } from 'react-redux';
import duckCreator from '@ducks/duckCreator';

const SearchCarResults = () => {
    const router = useRouter();
    const { query } = router;
    const navigateToPage = useCustomNavigation();

    const dispatch = useDispatch();
    const handleClick = () => {
        navigateToPage({ query: '123' });
    };

    useEffect(() => {
        const fetchData = async () => {
            const { make, model } = query;

            try {
                const data = await handleFilterCars(model, make);
                console.log('ga', data);

                const newCars = new Set();

                data.cars.forEach((car) => {
                    car = car.make_model_trim.make_model;
                    if (!newCars.has(car.name)) {
                        newCars.add({
                            id: car.id,
                            make_id: car.make.id,
                            make_name: car.make.name,
                            name: car.name,
                            price: car.msrp,
                        });
                    }
                });
                console.log('nc', newCars);

                dispatch(duckCreator.creators.setCars(Array.from(newCars)));

                dispatch(duckCreator.creators.setExteriorColors(data.colors));
                dispatch(
                    duckCreator.creators.setInteriorColors(data.intColors),
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
                        key: 'bodiestype',
                    }),
                );
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
        console.log('q', query);
    }, [query]);

    return (
        <div className='flex flex-col items-start w-full'>
            <div className='grid md:grid-cols-12 gap-x-4 gap-y-2 w-full'>
                <div className='sm:hidden lg:block lg:col-span-3 items-start border-2 border-gray-200 rounded-md h-fit overflow-y-scroll'>
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
        context.store.dispatch(
            duckCreator.creators.setExteriorColors(fetchedData.colors),
        );
        context.store.dispatch(
            duckCreator.creators.setInteriorColors(fetchedData.intColors),
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
                key: 'bodiestype',
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
