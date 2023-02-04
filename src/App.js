import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom"
import NavBar from "./routes/NavBar.js"
import JoblyApi from "./api/api";
import { useJwt } from "react-jwt";
import UserContext from "./UserContext.js"
import AllRoutes from "./routes/Routes.js"
import useLocalStorage from "./hooks/useLocalStorage.js";

// key name for storing the token in localStorage
export const TOKEN_STORAGE_ID = "jobly-token"


function App() {
  // shows if information has been fetched for the user yet
  const [userInfo, setUserInfo] = useState(false)
  const [currentUser, setCurrentUser] = useState(null);
  const [jobAppIds, setJobAppIds] = useState(new Set([]));

  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID)
  let { decodedToken } = useJwt(token);

  // gets user information from the API, it will not run until the user is logged in and has a token, will re-run when a user logs out
  useEffect(function loadUser() {

    async function getCurrentUser() {
      if (token) {
        try {
          let { username } = decodedToken;
          JoblyApi.token = token;
          let currentUser = await JoblyApi.getCurrentUser(username);
          setCurrentUser(currentUser);
          setJobAppIds(new Set(currentUser.applications))
        } catch (e) {
          setCurrentUser(null);
        }
      }
    }
    getCurrentUser();
  }, [decodedToken])


  // logs a user in and sets the token to the user's
  const login = async (loginData) => {
    try {
      let token = await JoblyApi.login(loginData);
      setToken(token);
      return { success: true }
    } catch (e) {
      console.log('error', e)
      return { success: false, e }
    }
  }

  // signup and set token to the user's
  const signup = async (signupData) => {
    try {
      let token = await JoblyApi.signup(signupData);
      setToken(token);
      return { success: true };
    } catch (e) {
      console.log('error', e)
      return { success: false, e }
    }
  }

  // logs a user out
  const logout = () => {
    setCurrentUser(null);
    setToken(null);
  }

  // search if the jobAppIds set has the id in it already
  function appliedToJob(id) {
    return jobAppIds.has(id);
  }

  function applyToJob(id) {
    // if they've already applied to jobs, return
    if (appliedToJob(id)) {
      return;
    }

    // otherwise add the job to the list of jobs we've applied to
    JoblyApi.applyToJob(currentUser.username, id);
    setJobAppIds(new Set([...jobAppIds, id]))
  }

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ currentUser, setCurrentUser, appliedToJob, applyToJob }}>
        <div className="App">
          <NavBar logout={logout} />
          <AllRoutes login={login} signup={signup} />
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
