import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

function SignupForm({ signup }) {
    const navigate = useNavigate();

    const INITIAL_STATE = {
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: ''
    }

    const [formData, setFormData] = useState(INITIAL_STATE)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }))
    }

    async function handleSubmit(e) {
        e.preventDefault();
        let result = await signup(formData);
        if (result.success) {
            navigate('/companies')
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
            <label htmlFor="firstName">First Name</label>
            <input
                id="firstName"
                type="text"
                name="firstName"
                placeholder="firstName"
                value={formData.firstName}
                onChange={handleChange}
            /><br />
            <label htmlFor="lastName">Last Name</label>
            <input
                id="lastName"
                type="text"
                name="lastName"
                placeholder="lastName"
                value={formData.lastName}
                onChange={handleChange}
            /><br />
            <label htmlFor="email">Email</label>
            <input
                id="email"
                type="text"
                name="email"
                placeholder="email"
                value={formData.email}
                onChange={handleChange}
            /><br />
            <button>Submit</button>
        </form>
    )
}

export default SignupForm;