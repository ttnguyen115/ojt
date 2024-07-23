import bodyStyleFetcher from "@fetchers/bodyStyleFetcher";
import filterState from "./filterState";
import engineFetcher from "@fetchers/engineFetcher";
import exteriorColorFetcher from "@fetchers/exteriorColorFetcher";
import interiorColorFetcher from "@fetchers/interiorColorFetcher";
import makesFetcher from "@fetchers/makesFetcher";


const handleFilterCars = async (model: string, make: string) => {

    let data = {}
    const bodiesRes = await bodyStyleFetcher(model || '', make || '');
    const bodies = filterState(bodiesRes, ['type']);

    const makesRes = await makesFetcher('/makes');


    const enginesRes = await engineFetcher(model || '', make || '');
    const engines = filterState(enginesRes, ['engine_type']);


    const extColorsRes = await exteriorColorFetcher(
        model || '',
        make || '',
    );
    const colors = filterState(extColorsRes, ['name', 'rgb']);

    const intColorsRes = await interiorColorFetcher(
        model || '',
        make || '',
    );
    const intColors = filterState(intColorsRes, ['name', 'rgb']);


    return data = { bodies, engines, colors, intColors, makes: makesRes.data };
};

export default handleFilterCars;