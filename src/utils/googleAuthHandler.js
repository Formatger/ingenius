import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
const GoogleAuthHandler = () => {
  const [authError, setAuthError] = useState(null);
  const history = useHistory();
  useEffect(() => {
    // Extract the token from URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const error = urlParams.get("error");
    if (token) {
      // If there's a token, assume the user has been authenticated
      // Store the token in localStorage/sessionStorage or in your app's state
      localStorage.setItem("authToken", token);
      // Redirect the user to their dashboard or home page
      history.push("/dashboard");
    } else if (error) {
      // Handle any errors that might have occurred during the OAuth process
      setAuthError("Failed to authenticate with Google. Please try again.");
    }
  }, [history]);
  return (
    <div>
      {authError && <p>{authError}</p>}
      {!authError && <p>Authenticating with Google, please wait...</p>}
    </div>
  );
};
export default GoogleAuthHandler;
