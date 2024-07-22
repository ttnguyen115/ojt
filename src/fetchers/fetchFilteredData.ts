import filterState from "@utils/filterUtils/filterState";
import bodyStyleFetcher from "./bodyStyleFetcher";
import engineFetcher from "./engineFetcher";
import exteriorColorFetcher from "./exteriorColorFetcher";
import interiorColorFetcher from "./interiorColorFetcher";

const handleFilterCars = async (model: string, make: string) => {

    let data = {}
    const bodiesRes = await bodyStyleFetcher(model || '', make || '');
    const bodies = filterState(bodiesRes, ['type']);


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


    return data = { bodies, engines, colors, intColors };
};

export default handleFilterCars;