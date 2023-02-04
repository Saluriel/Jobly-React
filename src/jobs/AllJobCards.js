import React from "react"
import JobCard from "./JobCard"

// maps through all jobs and makes the card for each
function AllJobCards({ jobs }) {
    console.log("all job cards")

    return (<div>
        {jobs.map(job => (
            <JobCard
                key={job.id}
                id={job.id}
                title={job.title}
                salary={job.salary}
                equity={job.equity}
                companyName={job.companyName} />

        ))}
    </div>)
}

export default AllJobCards;