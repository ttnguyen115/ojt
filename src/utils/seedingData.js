const seedingData = {
    generateRandomAmount(year) {
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
};

function generateDecimals(power, tens) {
    return (Math.random() * power + tens).toFixed(2);
}

export default seedingData;
