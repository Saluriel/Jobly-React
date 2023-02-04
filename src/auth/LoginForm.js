import React, { useState } from "react"
import { useNavigate } from "react-router-dom";

// shows a form to log the user in if the user has already made an account
// route: /login
function LoginForm({ login }) {
    const navigate = useNavigate();

    const INITIAL_STATE = {
        username: '',
        password: ''
    }

    const [formData, setFormData] = useState(INITIAL_STATE)
    const [formErrors, setFormErrors] = useState([]);

    // changes the value of the inputs when someone types
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }))
    }

    // handles the submission of the formData and logs the user in
    async function handleSubmit(e) {
        e.preventDefault();
        let result = await login(formData);
        if (result.success) {
            navigate("/companies");
        } else {
            console.log(result.errors);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input
                id="username"
                type="text"
                name="username"
                placeholder="username"
                value={formData.username}
                onChange={handleChange}
            /><br />
            <label htmlFor="password">Password</label>
            <input
                id="password"
                type="text"
                name="password"
                placeholder="password"
                value={formData.password}
                onChange={handleChange}
            /><br />
            <button>Submit</button>
        </form>
    )
}

export default LoginForm;