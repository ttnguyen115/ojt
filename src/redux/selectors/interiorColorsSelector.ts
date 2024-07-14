import duckCreator from "@ducks/duckCreator";
import { useSelector } from "react-redux";

const getInteriorColors = () => {
    const { interiorColors }: { interiorColors: string[] } = useSelector(
        duckCreator.selectors.getAllInteriorColors,
    );
    return interiorColors
}

export default getInteriorColors