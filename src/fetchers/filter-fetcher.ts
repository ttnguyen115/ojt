import axios from "axios";

// const attributes: string[] = ['bodies.type', 'engines.cam_type', 'engines.cylinders', 'engines.drive_type', 'engines.engine_type', 'engines.fuel_type', 'engines.transmission', 'engines.valve_timing', 'engines.valves']
export default async function filtersFetcher() {
    const results = await axios.get('http://localhost:3000/api/filters')

    return results || {};
}