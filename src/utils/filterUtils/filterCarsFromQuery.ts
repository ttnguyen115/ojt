//utils
import filterState from "./filterState";

//axios
import localInstance from "@fetchers/localInstance";


const handleFilterCars = async (model: string, make: string) => {

    let data = {}

    const modelsRes = await localInstance.get(`/cars`);
    const makeModelsRes = await localInstance.get(`/cars?make=${make || ''}`);
    const carsRes = await localInstance.get(`/cars?model=${model || ''}&make=${make || ''}`);
    const makesRes = await localInstance.get('/makes');


    const bodiesRes = await localInstance.get(`/bodies?verbose=yes&model=${model || ''}&make=${make || ''}`);
    const bodies = filterState(bodiesRes.data, ['type']);



    const enginesRes = await localInstance.get(`/engines?model=${model || ''}&make=${make || ''}`);
    const engines = filterState(enginesRes.data, ['engine_type']);


    const extColorsRes = await localInstance.get(`/exterior-colors?model=${model || ''}&make=${make || ''}`);
    const colors = filterState(extColorsRes.data, ['name', 'rgb']);

    const intColorsRes = await localInstance.get(`/interior-colors?model=${model || ''}&make=${make || ''}`);
    const intColors = filterState(intColorsRes.data, ['name', 'rgb']);


    return data = { bodies, engines, colors, intColors, makes: makesRes.data, models: modelsRes.data, makeModels: makeModelsRes.data, cars: carsRes.data };
};

export default handleFilterCars;