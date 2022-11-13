import React, {useContext, useEffect} from "react";
// import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

import { Context } from "../store/appContext";

// import components
import Card from "../component/card";


export const Home = () => {
	const {store, action} = useContext(Context)
	console.log(store.people);
	return (
		<div className="text-center mt-5">
			<h1>Starwars blog</h1>
			<h2>Characters</h2>
			<div className=" peopleCont">
				{store.people.map((person, idx) => {
					return (
						<div className=" peopleDiv" key={idx}>
							<Card person={person} id={idx} />
						</div>

					)
				})}
			</div>
			<h2>Planets</h2>
					<div className = "peopleCont">
						{store.planets.map((planet, idx) => {
								return (
									<div className="peopleDiv" key={idx}>
										<Card planet={planet}  id={idx}/>
									</div>

								)}
							)
						}

					</div>
		</div>
	)
};