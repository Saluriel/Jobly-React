import React, { useState, useEffect, useContext } from "react"
import JoblyApi from "../api/api"
import CompanyCard from "./CompanyCard";
import SearchForm from "../common/SearchForm";
import UserContext from "../UserContext"
import { useNavigate } from "react-router-dom";

function AllCompanies() {
    const user = useContext(UserContext)
    const navigate = useNavigate();

    if (user.currentUser === null) {
        navigate("/")
    }

    const [companies, setCompanies] = useState(null);

    // get companies on page load
    useEffect(function getCompaniesOnMount() {
        search()
    }, [])

    // finds companies, will search by name if given
    async function search(name) {
        let companies = await JoblyApi.getCompanies(name);
        setCompanies(companies)
    }

    if (!companies) return (<div>loading...</div>)


    return (
        <div>
            <SearchForm search={search} />
            {companies.map(company => (
                <CompanyCard
                    key={company.handle}
                    handle={company.handle}
                    name={company.name}
                    description={company.description}
                    logoUrl={company.logoUrl} />
            ))}
        </div>
    )
}

export default AllCompanies;