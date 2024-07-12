import { Make } from "@contracts/index"
import { Car } from "@contracts/types/car"
import duckCreator from "@ducks/duckCreator"
import seedingData from "@utils/seedingData"
import { useSelector } from "react-redux"

const getCars = () => {
    const { cars }: { cars: Car[] } = useSelector(duckCreator.selectors.getAllCars)
    const { makes }: { makes: Make[] } = useSelector(duckCreator.selectors.getAllMakes)
    const updatedCars: Car[] = seedingData.carDataGenerator(cars, makes)
    return updatedCars
}

export default getCars