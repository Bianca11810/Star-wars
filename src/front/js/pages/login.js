import React, { useContext, useState} from 'react'
import { Context } from '../store/appContext'
import { useNavigate } from "react-router-dom";



const login = () => {
    const { store, actions } = useContext(Context)
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const history = useNavigate();

    const handleLogin = () => {
        actions.login(email, password)
    };

    if(store.token && store.token!= "" && store.token!= undefined) history("/")
    
    return (
        <div className='text-center mt-5'>
            <h1>You Are NOT Prepared</h1>
            {(store.token && store.token!= "" && store.token!= undefined) ? "You are logged in with this token" + store.token :                 
                <div>                   
                    <input type="text" placeholder='EMAIL' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder='PASSWORD' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button onClick={handleLogin}>Login</button>
                </div>
            }
        </div>
    )
}

export default login