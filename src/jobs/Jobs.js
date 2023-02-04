import React, { useState, useEffect, useContext } from "react";
import JoblyApi from "../api/api";
import CompanyCard from "../companies/CompanyCard";
import SearchForm from "../common/SearchForm";
import JobCard from "./JobCard";
import AllJobCards from "./AllJobCards";
import { useNavigate } from "react-router-dom";
import UserContext from "../UserContext";

// gets a list of all jobs and shows them on the page with links to each
function AllJobs() {
    const user = useContext(UserContext)
    const navigate = useNavigate();

    if (user.currentUser === null) {
        navigate("/")
    }

    const [jobs, setJobs] = useState(null);

    // get jobs on page load
    useEffect(function getJobsOnMount() {
        console.log('getting jobs')
        search()
    }, [])

    // search for jobs using a title if available
    async function search(title) {
        let jobs = await JoblyApi.getAllJobs(title);
        setJobs(jobs);
    }

    if (!jobs) return (<div>loading...</div>)

    return (
        <div>
            <ul><h1>💼J💼O💼R💼B💼S💼</h1></ul>
            <SearchForm search={search} />
            <AllJobCards jobs={jobs} />

        </div>

    )
}

export default AllJobs;