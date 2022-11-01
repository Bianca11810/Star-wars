const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			people: [],
			planets: [],
			favorites: []
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			loadPeople: () => {
				const opts = {
					method: "GET",
					mode: "cors",
					headers: {
					  "Content-Type": "application/json",
					  "Access-Control-Allow-Origin": "*",
					  //"Access-Control-Allow-Headers": "Origin",
					  //"X-Requested-With, Content-Type": "Accept",
					},
				}
				// fetch people from SWAPI
				fetch('https://3001-bianca11810-starwars-yzkjob81mi4.ws-us73.gitpod.io/api/people', opts)
				.then((response) => response.json())
				.then((data) => {
					console.log('here', data);
					let people = data.data
					// console.log("PEOPLE", people)
					setStore({people: people})
				})
			},

			loadPlanets: () => {
				// fetch planets from SWAPI
				const opts = {
					method: "GET",
					mode: "cors",
					headers: {
					  "Content-Type": "application/json",
					  "Access-Control-Allow-Origin": "*",
					  //"Access-Control-Allow-Headers": "Origin",
					  //"X-Requested-With, Content-Type": "Accept",
					},
				}
				fetch('https://3001-bianca11810-starwars-yzkjob81mi4.ws-us73.gitpod.io/api/planets',opts)
				.then((response) => response.json())
				.then((data) => {
					let planets = data.data
					// console.log("PLANETS", planets)
					setStore({planets: planets})
				})
			},

			getPerson: (idx) => {
				console.log("get person ", idx);
				const people = getStore().people
				for (let index = 0; index < people.length; index++) {
					if (idx == index) {
						return people[index]
					}
				}
			},

			getPlanet: (idx) => {
				console.log("get person ", idx);
				const planets = getStore().planets
				for (let index = 0; index < planets.length; index++) {
					if (idx == index) {
						return planets[index]
					}	
				}
			},

			addFavorite: (name) => {
				const favorites = getStore().favorites
				favorites.push(name)
				setStore({favorites: favorites})
			},

			deleteFavorite: (idx) => {
				const favorites = getStore().favorites
				let filtered = favorites.filter((f, i) => i !== idx)
				setStore({favorites: filtered})
			}
		}
	};
};

export default getState;