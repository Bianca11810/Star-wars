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
			favorites: [],
			token: null
		},
		actions: {
			syncTokenFromSessionStore: () => {
				const token = sessionStorage.getItem('token');
				if(token && token !="" && token !=undefined) setStore({ token: token});
			},
			logout: () => {
				sessionStorage.removeItem('token');
				setStore({ token: null});
			},

			login: async(email, password) => {
				const opts = {
					method: 'POST',
					headers: {
						"content-Type": "application/json"
					},
					body: JSON.stringify({
						"email": email,
						"password": password
					})
				}
				try{
					const resp = await fetch('https://3001-bianca11810-starwars-yzkjob81mi4.ws-us75.gitpod.io/api/login', opts)		
					if(resp.status !== 200){
						alert("there was an error on the fetch response at login fetch")
						return false;
					}
					const data = await resp.json()
						sessionStorage.setItem("token", data.access_token)
						setStore({ token: data.access_token })
						return true
				}catch(error){
					console.error('there was an error on the login fetch', error)
				}
			},
				getMessage: () => {
					const store = getStore();
					const opts = {
						headers: {
							"Authorization": "Bearer" + store.token
						}
					};
					// hello problem
					fetch("https://bianca11810-starwars-yzkjob81mi4.ws-us75.gitpod.io/api/login",opts)
						.then(resp => resp.json())
						.then (data =>setStore[{ message: data.message}])
						.catch(error => console.log ("error loading message from backend",error));
				}, 



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
				fetch('https://3001-bianca11810-starwars-yzkjob81mi4.ws-us75.gitpod.io/api/people', opts)
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
				fetch('https://3001-bianca11810-starwars-yzkjob81mi4.ws-us75.gitpod.io/api/planets',opts)
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