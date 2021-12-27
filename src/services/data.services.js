class DataService {

    ///////////////////// services for the Top-Vehicle task (task No. 1) ///////////////////

    // getting the combined data for all vehicles, sorting them by their sum population - and sending all the vehicles that has the highest sum of population
    getTopVehicle = async () => {
        const combinedData = await this.getCombinedData();
        combinedData.sort((a, b) => {
            const keyA = a.sumPopulation,
                keyB = b.sumPopulation;
            if (keyA < keyB) return 1;
            if (keyA > keyB) return -1;
            return 0;
        });

        return combinedData.filter((item) => item.sumPopulation >= combinedData[0].sumPopulation);
    }

    // fetching all the data from each category and creating the combined data
    getCombinedData = async () => {
        const [vehicles, pilots, planets] = await Promise.all([
            this.fetchByCategory("vehicles"),
            this.fetchByCategory("people"),
            this.fetchByCategory("planets")
        ]);
        const combinedData = this.createCombinedData(vehicles, pilots, planets);
        return combinedData;
    }

    // getting all the data of a category - vehicles/people/planets
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


    // recieving the data from all 3 categories, getting a map obj with the URL key and the rspected info needed
    // and creating the combined data with the info of the vehicle, pilots, planets and the sum of population
    createCombinedData(vehicles, pilots, planets) {

        const pilotsMap = this.mapDataByURL(pilots, ["name", "homeworld"]);
        const planetsMap = this.mapDataByURL(planets, ["name", "population"]);
        const finalData = [];
        for (let i = 0; i < vehicles.length; i++) {
            const vehicle = {};
            vehicle.name = vehicles[i].name;
            vehicle.pilots = this.getPilots(vehicles[i].pilots, pilotsMap);
            vehicle.homeworldsInfo = this.getHomeworlds(vehicle.pilots, planetsMap);
            vehicle.sumPopulation = this.getSum(vehicle.homeworldsInfo);
            if (Number.isNaN(vehicle.sumPopulation)) { vehicle.sumPopulation = -1; }
            finalData.push(vehicle);
        }
        return finalData;
    }


    // creates a map obj (used for planets and pilots - each needs different info so I used a "keys" array)
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

    // returning an array with the info we need on the pilots for the combined data 
    getPilots(pilots, map) {
        const res = [];
        pilots.forEach((pilot) => {
            res.push(map[pilot]);
        });
        return res;
    }

    // returning an array with the info we need on the planets for the combined data 
    getHomeworlds(pilots, map) {
        const res = [];
        pilots.forEach((pilot) => res.push(map[pilot.homeworld]));
        return res;
    }

    // returning the sum of population for the planets 
    getSum(planets) {
        return planets.reduce((total, planet) => total + parseInt(planet.population), 0);

    }

    /////////////////// services for the Population-Chart task (task No. 2) /////////////////// 

    // getting a list of planets and using the api search to recieve only these planets, sorting them 
    // and sending them with their heights in log scale compared to the highest population amongst them
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

    //getting a sorted array of planets and adding a log-scaled height property(for the population chart)   
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