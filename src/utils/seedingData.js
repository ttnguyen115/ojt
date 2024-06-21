/** Binding seeding data to json:
 *
 * json.price = seedingData.generateRandomAmount();
 *
 * or
 *
 * const newResponse = {
 *  ...,
 *  price: generateRandomAmount(),
 *  ...,
 * }
 *
 ** If want to remove any unused properties in order to shorten or flatten the json:
 *
 * delete json.price
 *
 * or
 *
 * const newResponse = {
 *  ...,
 *  price: undefined,
 *  ...,
 * }
 */

// TODO: Add unit test for this one
const seedingData = {
    generateRandomAmount(year = 0) {
        switch (year) {
            case 2020:
                return generateDecimals(70_000, 90);

            case 2019:
                return generateDecimals(50_000, 50);

            case 2018:
                return generateDecimals(40_000, 20);

            case 2017:
                return generateDecimals(30_000, 50);

            case 2016:
                return generateDecimals(20_000, 10);

            case 2015:
                return generateDecimals(15_000, 70);

            default:
                return generateDecimals(15_000, 50);
        }
    },

    // pass width + height as your wish
    generateVehicleImage(width = 200, height = 300) {
        return `https://picsum.photos/${width}/${height}`;
    },

    generateRandomColor() {
        return generateHexColor();
    },
};

function generateDecimals(power, tens) {
    return (Math.random() * power + tens).toFixed(2);
}

function generateHexColor() {
    const singleColor = () => {
        // Generate a random number between 0 and 0xFFFFFF
        const randomColor = Math.floor(Math.random() * 0xffffff);
        const hexColor = `#${randomColor.toString(16).padStart(4, '0')}`;
        return hexColor;
    };
    const colors = [];

    for (let i = 0; i < 10; i++) {
        colors.push(singleColor());
    }
    return colors;
}

// Example usage:
console.log(generateHexColor());

export default seedingData;
