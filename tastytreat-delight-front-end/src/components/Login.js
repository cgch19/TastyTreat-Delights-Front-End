import { useNavigate } from 'react-router-dom';

import { useState } from "react";

const Login = ({ handleLogin }) => {
    const [form, setForm] = useState(null);
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const error = await handleLogin(form, navigate); 
            if (error) {
                setErrorMsg(error);
            }
        } catch (error) {
            console.error('Error during login:', error);
            setErrorMsg('Failed to login');
        }
    };

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    return (
        <div className="form-container">
            <div className="login-heading">
                <h1>Log In</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username"/>
                    <input type="text" name="username" placeholder="Username" onChange={handleChange}/>
                </div>
                <div>
                    <label htmlFor="password"/>
                    <input type="password" name="password" placeholder="Password" onChange={handleChange}/>
                </div>
                <button type="submit" className="popup-button" value="Login">Submit</button>
            </form>
            {errorMsg ? <h4 style={{color: "red"}}>{errorMsg}</h4> : ""}
        </div>
    );
};

export default Login;
