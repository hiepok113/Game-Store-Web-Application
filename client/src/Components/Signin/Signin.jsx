import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { login, changeLogginState } from '../../redux/slice/userSlice';
import './Signin.css';

const SignIn = () => {
    const [style1, setStyle1] = useState('notfocus');
    const [style2, setStyle2] = useState('notfocus');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:3001/login', { email: email, password: password })
            .then(result => {
                if (result.data.message === "Success") {
                    const id = result.data.user._id;
                    dispatch(login({ email, id }));
                    dispatch(changeLogginState(true));
                    navigate('/');
                    window.location.reload();
                } else {
                    console.log(result.data.message);
                }
            })
            .catch(err => console.log(err));
    };

    const changeFocus1 = () => {
        setStyle1('focus1');
    };

    const changeFocus2 = () => {
        setStyle2('focus2');
    };

    const changeNotFocus1 = () => {
        setStyle1('notfocus');
    };

    const changeNotFocus2 = () => {
        setStyle2('notfocus');
    };

    return (
        <div className="login_container">
            <div className="login">
                <div className="login_content">
                    <h1 className="title">Sign In</h1>
                    <span className="register_link_container">
                        Don’t have an account? <Link to="/register" className="bold_item">Sign Up</Link>
                    </span>
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
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onBlur={changeNotFocus2}
                                onMouseDown={changeFocus2}
                                required
                            />
                        </div>
                        <button type="submit" className="login_button">Sign In</button>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default SignIn;
