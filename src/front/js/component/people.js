import React, {useContext} from 'react'
import { useParams } from 'react-router-dom'
import { Context } from '../store/appContext'

const People = () => {
	const {store, actions} = useContext(Context)
	const params = useParams()
	console.log(params);
	// check if we have a person or planet and get the corresponding one
	let type = window.location.href.includes('people') ? "person" : "planet"
	let item = type == "person" ? actions.getPerson(params.index) : actions.getPlanet(params.index)
	console.log(item);
	let fields = type == "person" ?
		<div className='AboutPage'>
			<h5>{item.name}</h5>
			<div className='midSection'>
			<img 
			className="aboutImg"
			src="https://st2.depositphotos.com/3031831/5365/i/450/depositphotos_53655241-stock-photo-black-space-with-many-stars.jpg" alt="..." />
				<p>
					Bacon ipsum dolor amet biltong pork belly chislic pork loin pork strip steak tri-tip pancetta spare ribs. Ground round ribeye pig, frankfurter hamburger short ribs salami. Flank bresaola shankle alcatra, pork shoulder ham cow. Jowl jerky alcatra venison. Ball tip alcatra tongue, turkey sausage kielbasa boudin t-bone short ribs kevin tail andouille filet mignon corned beef. Short ribs flank bresaola jerky, rump ball tip chislic shankle jowl drumstick doner. Landjaeger ham hock beef ribs boudin, venison beef pork loin doner frankfurter turkey porchetta turducken.
                </p>
			</div>
			<div className='botSection'>
				<h6><strong>Gender: </strong>{item.gender}</h6>
				<h6><strong>Hair Color: </strong>{item.hair_color}</h6>
				<h6><strong>Eye Color: </strong>{item.eye_color}</h6>
				<h6><strong>Height: </strong>{item.height}</h6>
				<h6><strong>Birth Year: </strong>{item.birth_year}</h6>
				<h6><strong>Mass: </strong>{item.mass}</h6>
			</div>
		</div>
		:
		<div className='AboutPage'>
			<h5>{item.name}</h5>
			<div className='midSection'>
			<img 
			className="aboutImg"
			src="https://st2.depositphotos.com/3031831/5365/i/450/depositphotos_53655241-stock-photo-black-space-with-many-stars.jpg" alt="..." />
				<p>
					Bacon ipsum dolor amet biltong pork belly chislic pork loin pork strip steak tri-tip pancetta spare ribs. Ground round ribeye pig, frankfurter hamburger short rib		s salami. Flank bresaola shankle alcatra, pork shoulder ham cow. Jowl jerky alcatra venison. Ball tip alcatra tongue, turkey sausage kielbasa boudin t-bone short ribs kevin tail andouille filet mignon corned beef. Short ribs flank bresaola jerky, rump ball tip chislic shankle jowl drumstick doner. Landjaeger ham hock beef ribs boudin, venison beef pork loin doner frankfurter turkey porchetta turducken.
                </p>
			</div>
			<div className='botSection'>
				<h6><strong>Climate: </strong>{item.climate}</h6>
				<h6><strong>Population: </strong>{item.population}</h6>
				<h6><strong>Orbital Period: </strong>{item.orbital_period}</h6>
				<h6><strong>Rotational Period: </strong>{item.rotation_period}</h6>
				<h6><strong>Diameter: </strong>{item.diameter}</h6>
			</div>
		</div>

  return (
	<div className="col">
			<div className="card shadow my-3">
				{fields}
				{/* <div className="card-body">
					<h5 className="card-title">
						<strong>Person:</strong> {props.name}
					</h5>
					<p className="card-text">
						<strong>Gender:</strong> {props.gender}
					</p>
					<p className="card-text">
						<strong>Hair Color:</strong> {props.hair_color}
					</p>
					<p className="card-text">
						<strong>Eye color:</strong> {props.eye_color}
					</p>
					<div className="row">
						<div className="col-6">
							<div className="btn btn-primary">Learn More</div>
						</div>
						<div className="col-6">
								<div className="btn btn-outline-warning">
									<i className="fas fa-heart" />
								</div>					
						</div>
					</div>
				</div> */}
			</div>
		</div>
  )
}

export default People