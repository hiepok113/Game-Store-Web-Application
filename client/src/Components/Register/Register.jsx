import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import './Register.css';

const Register = () => {
    const [style1, setStyle1] = useState('notfocus');
    const [style2, setStyle2] = useState('notfocus');
    const [style3, setStyle3] = useState('notfocus');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/register', { email, username, password })
            .then(result => {
                console.log(result.data); 
                setSuccessMessage('Registration successful! Redirecting to login...');
                setTimeout(() => {
                    navigate('/login');
                }, 2000); // Redirect after 2 seconds
            })
            .catch(err => {
                console.error('Error:', err);
            });
    };

    const changeFocus1 = () => {
        setStyle1('focus1');
    };

    const changeFocus2 = () => {
        setStyle2('focus2');
    };

    const changeFocus3 = () => {
        setStyle3('focus3');
    };

    const changeNotFocus1 = () => {
        setStyle1('notfocus');
    };

    const changeNotFocus2 = () => {
        setStyle2('notfocus');
    };

    const changeNotFocus3 = () => {
        setStyle3('notfocus');
    };

    return (
        <div className="register_container">
            <div className="register">
                <div className="register_content">
                    <h1 className="title">Create new account</h1>
                    <span className="login_link_container">
                        Already a member? <Link to="/login" className="bold_item">Sign In</Link>
                    </span>
                    {successMessage && <p className="success_message">{successMessage}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className={`input_container ${style1}`}>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onBlur={changeNotFocus1}
                                onMouseDown={changeFocus1}
                                required
                            />
                        </div>

                        <div className={`input_container ${style2}`}>
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                onBlur={changeNotFocus2}
                                onMouseDown={changeFocus2}
                                required
                            />
                        </div>

                        <div className={`input_container ${style3}`}>
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onBlur={changeNotFocus3}
                                onMouseDown={changeFocus3}
                                required
                            />
                        </div>
                        <button type="submit" className="register_button">Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
