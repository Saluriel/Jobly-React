import React from "react";
import { Link } from "react-router-dom"

// shows information about one specific company

function CompanyCard({ name, description, logoUrl, handle }) {
    return (
        <Link to={`/companies/${handle}`}>
            <div>
                <h3>{name} {logoUrl && <img src={logoUrl}
                    alt={name} />}</h3>
                <p>{description}</p>
            </div>
        </Link>
    )
}

export default CompanyCard;
