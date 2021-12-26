class DataService {

    getTopVehicle = async () => {
        const combinedData = await this.getCombinedData();
        combinedData.sort((a, b) => {
            const keyA = a.sum_population,
                keyB = b.sum_population;
            if (keyA < keyB) return 1;
            if (keyA > keyB) return -1;
            return 0;
        });

        return combinedData.filter((item) => item.sum_population >= combinedData[0].sum_population);
    }

    getCombinedData = async () => {
        const [vehicles, pilots, planets] = await Promise.all([
            this.fetchByCategory("vehicles"),
            this.fetchByCategory("people"),
            this.fetchByCategory("planets")
        ]);
        const combinedData = this.createCombinedData(vehicles, pilots, planets);
        return combinedData;
    }


    fetchByCategory = async (category) => {
        let URL = "https://swapi.dev/api/" + category;
        const categoryData = [];
        let run = true;
        while (run) {
            const response = await fetch(`${URL}`);
            const json = await response.json();
            if (json.next === null) { run = false; }
            else { URL = json.next }
            json.results.forEach(item => {
                categoryData.push(item);

            });
        }
        return categoryData;
    }

    createCombinedData(vehicles, pilots, planets) {

        const pilotsMap = this.mapDataByURL(pilots, ["name", "homeworld"]);
        const planetsMap = this.mapDataByURL(planets, ["name", "population"]);
        const finalData = [];
        for (let i = 0; i < vehicles.length; i++) {
            const vehicle = {};
            vehicle.name = vehicles[i].name;
            vehicle.pilots = this.getPilots(vehicles[i].pilots, pilotsMap);
            vehicle.homeworldsInfo = this.getHomeworlds(vehicle.pilots, planetsMap);
            vehicle.sum_population = this.getSum(vehicle.homeworldsInfo);
            if (Number.isNaN(vehicle.sum_population)) { vehicle.sum_population = -1; }
            finalData.push(vehicle);
        }
        return finalData;
    }

    mapDataByURL(items, keys) {
        const mappedData = {};
        if (items.length === 0) { return mappedData; }
        else {
            items.forEach((item) => {
                mappedData[item.url] = {};
                for (const key of keys) {
                    mappedData[item.url][key] = item[key];
                }
            });
            return mappedData;
        }
    }


    getPilots(pilots, map) {
        const res = [];
        pilots.forEach((pilot) => {
            res.push(map[pilot]);
        });
        return res;
    }

    getHomeworlds(pilots, map) {
        const res = [];
        pilots.forEach((pilot) => res.push(map[pilot.homeworld]));
        return res;
    }

    getSum(planets) {
        return planets.reduce((total, planet) => total + parseInt(planet.population), 0);

    }

    getChartData = async (list) => {
        const planets = [];
        for (const planet of list) {
            const response = await fetch(`https://swapi.dev/api/planets/?search=${planet}`);
            const json = await response.json();
            const results = json.results;
            if (results.length > 0) {
                planets.push(results[0]);
            }
        }
        planets.sort((a, b) => {
            const keyA = parseInt(a.population),
                keyB = parseInt(b.population);
            if (keyA < keyB) return 1;
            if (keyA > keyB) return -1;
            return 0;
        });

        return this.getHeight(planets);;
    }

    getHeight = (planets) => {
        const myFixedheight = 250;
        const logMaxPopulation = Math.log10(parseInt(planets[0].population));
        for (let i = 0; i < planets.length; i++) {
            const logCurrentPopulation = Math.log10(parseInt(planets[i].population));
            planets[i].height = Math.floor(myFixedheight * logCurrentPopulation / logMaxPopulation);
        }
        return planets;
    }
}
export default new DataService();