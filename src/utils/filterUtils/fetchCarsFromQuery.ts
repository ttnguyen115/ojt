//utils
import { Car } from "@contracts/index";
import filterState from "./filterState";

//axios
import localInstance from "@fetchers/localInstance";
import seedingData from "@utils/seedingData";


const fetchCarsFromQuery = async (model: string, make: string) => {

    let data = {}

    const modelsRes = await localInstance.get(`/cars`);
    const makeModelsRes = await localInstance.get(`/cars?make=${make || ''}`);
    let carsRes = await localInstance.get(`/cars?model=${model || ''}&make=${make || ''}`);
    const makesRes = await localInstance.get('/makes');


    const bodiesRes = await localInstance.get(`/bodies?verbose=yes&model=${model || ''}&make=${make || ''}`);
    const bodies = filterState(bodiesRes.data, ['type']);

    const cars = new Set<Car>([])

    bodiesRes.data.map((body) => {

        const foundCar: Car = carsRes.data.find((car: Car) => car.id === body.make_model_trim.make_model.id)
        if (!foundCar) return
        if (!cars.has(foundCar)) {
            const updatedCar: Car = { ...foundCar, year: body.make_model_trim.year, body_type: body.type, price: body.make_model_trim.msrp, make_name: body.make_model_trim.make_model.make.name, image: seedingData.generateVehicleImage(200, 200), mileage: seedingData.generateRandomAmount(2020) }
            cars.add(updatedCar)
        }
    })

    const trimsRes = await localInstance.get(`/trims`, { params: { model: model || '', make: make || '' } });
    console.log('trimsRes', trimsRes);

    const enginesRes = await localInstance.get(`/engines?model=${model || ''}&make=${make || ''}`);

    const engines = filterState(enginesRes.data, ['engine_type']);


    const extColorsRes = await localInstance.get(`/exterior-colors?model=${model || ''}&make=${make || ''}`);
    const colors = filterState(extColorsRes.data, ['name', 'rgb']);

    const intColorsRes = await localInstance.get(`/interior-colors?model=${model || ''}&make=${make || ''}`);
    const intColors = filterState(intColorsRes.data, ['name', 'rgb']);


    return data = { bodies, engines, colors, intColors, makes: makesRes.data, models: modelsRes.data, makeModels: makeModelsRes.data, cars: Array.from(cars) };
};

export default fetchCarsFromQuery;