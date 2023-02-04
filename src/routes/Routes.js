import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../home/Home"
import AllCompanies from "../companies/CompaniesList";
import ShowOneCompany from "../companies/CompanyDetails";
import AllJobs from "../jobs/Jobs";
import LoginForm from "../auth/LoginForm"
import SignupForm from "../auth/SignupForm"
import ProfileForm from "../profile/ProfileForm"



function AllRoutes({ login, signup }) {
    return (
        <Routes >
            <Route exact path="/" element={<Home />} />
            <Route path="/companies" element={<AllCompanies />} />
            <Route path="/companies/:handle" element={<ShowOneCompany />} />
            <Route path="/jobs" element={<AllJobs />} />
            <Route path="/login" element={<LoginForm login={login} />} />
            <Route path="/signup" element={<SignupForm signup={signup} />} />
            <Route path="/profile" element={<ProfileForm />} />
        </Routes>
    )
}

export default AllRoutes;