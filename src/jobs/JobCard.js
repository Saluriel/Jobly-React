import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom"
import UserContext from "../UserContext";

// shows information on one specific job

function JobCard({ id, title, salary, equity, companyName }) {
    // get us the list of jobs applied to and ability to apply to the job
    const { appliedToJob, applyToJob } = useContext(UserContext);
    const [applied, setApplied] = useState();

    // function that updates when the id of the job changes or when we apply
    React.useEffect(function updateWhenApplying() {
        setApplied(appliedToJob(id));
    }, [id, appliedToJob])

    // actually apply for a job
    async function handleApplying(e) {
        // return if they've already applied
        if (appliedToJob(id)) {
            return;
        }
        applyToJob(id);
        setApplied(true);
    }

    return (

        <div>
            <h2>{title}</h2>
            <h4>{companyName} - {salary}/yr</h4>
            <button
                onClick={handleApplying}
                disabled={applied} >
                {applied ? "Applied" : "Apply"}
            </button>
            <hr />
        </div>

    )
}

export default JobCard;