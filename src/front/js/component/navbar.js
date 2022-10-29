import React, {useContext} from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
export const Navbar = () => {
	const {store, actions} = useContext(Context)
	console.log(store.favorites);
	return (
		<nav className="navbar navbar-light bg-light mb-3">
			<Link to="/">
				<span className="navbar-brand mb-0 h1">Starwars logo</span>
			</Link>
			<div className="ml-auto">
				{/* <Link to="/demo">
					<button className="btn btn-primary">Favorites</button>
				</Link> */}
				<div className="dropdown">
					<button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						Favorites
					</button>
					<div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
						{store.favorites.map((fav, i) => {

							return <a className="dropdown-item" key={i} href="#"> {fav} <i onClick={()=>actions.deleteFavorite(i)} className="fas fa-trash"></i></a>

						})}
						
					</div>
				</div>
			</div>
		</nav>
	);
};