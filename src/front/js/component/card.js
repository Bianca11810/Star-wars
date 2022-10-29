import React, {useContext} from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
const Card = (props) => {
    const {store, actions} = useContext(Context)
    let typeURL = props.person ? "/components/people/" : "/components/planet/"
    let name = props.person ? props.person.name : props.planet.name
    // make people data as a variable
    let personProps = props.person ? <div>
        <h5 className="card-title">{props.person.name}</h5> 
        <h6>Gender: {props.person.gender}</h6> 
        <h6>Hair color: {props.person.hair_color}</h6> 
        <h6>Eye color: {props.person.eye_color}</h6>
    </div> : ""
    let planetProps = props.planet ? <div>
         <h5 className="card-title">{props.planet.name}</h5>
		<h6>Diameter: {props.planet.diameter}</h6>
		<h6>Population: {props.planet.population}</h6>
        <h6>Terrain: {props.planet.terrain}</h6>
    </div> : ""


    return (
        <div className="card" style={{"width": "18rem"}}>
            <img src="https://st2.depositphotos.com/3031831/5365/i/450/depositphotos_53655241-stock-photo-black-space-with-many-stars.jpg" className="card-img-top" alt="..." />
            <div className="card-body">

                {props.person ? personProps : "" }

                {props.planet ? planetProps: "" }

                {/* <p className="card-text">content</p> */}
                <Link to={typeURL + props.id}>
                    <span className="btn btn-primary">Learn More</span>
                </Link>
                {/* <a href="#" className="btn btn-info">Learn more</a> */}
                <button className="btn btn-primary" onClick={()=>actions.addFavorite(name)}><i className="fas fa-heart" /></button>
            </div>
        </div>
    )
}

export default Card