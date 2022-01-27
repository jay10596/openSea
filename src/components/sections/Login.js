import React from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../storage/reducers/Marketplace'

function Login() {
    const dispatch = useDispatch()

    return (
        <div>
            <button onClick={() => {dispatch(login({name:'asda', age: 20, email: 'user@test.com'}))}}>login</button>
        </div>
    );
}

export default Login;