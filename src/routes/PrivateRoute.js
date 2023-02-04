import React, { useContext } from "react";
import { Route, redirect } from "react-router-dom"
import UserContext from "../UserContext";


function PrivateRoute({ exact, path, children }) {
    const { currentUser } = useContext(UserContext)

    if (!currentUser) {
        return redirect('/login')
    }

    return (
        <Route exact={exact} path={path} element={children} />
    )
}

export default PrivateRoute;