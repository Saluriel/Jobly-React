import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom"
import JoblyApi from "../api/api";
import JobCard from "../jobs/JobCard";
import UserContext from "../UserContext";
import { useNavigate } from "react-router-dom";

// shows information about one company and the jobs at that company 
// /companies/:handle

function ShowOneCompany() {
    const user = useContext(UserContext)
    const navigate = useNavigate();

    if (user.currentUser === null) {
        navigate("/")
    }

    const { handle } = useParams();

    const [company, setCompany] = useState(null)

    // every time the handle changes get the company with that handle
    useEffect(function getCompanyAndJobs() {
        async function getCompany() {
            setCompany(await JoblyApi.getCompany(handle))
        }

        getCompany();
    }, [handle])

    // if no company is found load until you find one
    if (!company) return (<div>Loading...</div>)

    return (
        <div>
            <img src={company.logoUrl} />
            <h2>{company.name}</h2>
            <p>{company.description}</p>
            <JobCard jobs={company.jobs} />
        </div>
    )
}

export default ShowOneCompany;