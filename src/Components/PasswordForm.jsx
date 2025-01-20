import { React, useState, useEffect } from 'react'
import { PiEyeClosedLight } from "react-icons/pi";
import { PiEye } from "react-icons/pi";
import './PasswordForm.css';

export const PasswordForm = ({ handlePassword, inputId, hint }) => {
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const checkPassword = (entry) => {
        handlePassword(entry);
        setPassword("");
    }

    useEffect(() => {
        const pressEnter = (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                checkPassword(password);
            }
        }

        const loginInput = document.getElementById(inputId);
        loginInput?.addEventListener('keypress', pressEnter);

        return () => {
            loginInput?.removeEventListener('keypress', pressEnter);
        }
    });

    return (
        <div className="pw-form-div">
            <div className="pw-form">
                <input
                    type={`${showPassword ? 'text' : 'password'}`}
                    placeholder="Password"
                    className="login-input"
                    id={inputId}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                <button className="visibility-toggle" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <PiEye /> : <PiEyeClosedLight />}</button>
                <button className="unlock-button" onClick={() => checkPassword(password)}>⇥</button>
            </div>
            <p className="pw-hint" >Hint: {hint ? hint : 'You love this'}</p>
        </div>
    )
}
