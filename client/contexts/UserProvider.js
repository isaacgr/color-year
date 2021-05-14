import React, { createContext, useState, useEffect } from "react";
import fetchWithTimeout from "../util/fetchWithTimeout";

const context = createContext(null);

const UserProvider = ({ children }) => {
  const [auth, setAuthenticated] = useState({});
  const [loadingComplete, setLoadingComplete] = useState(false);
  useEffect(async () => {
    let isSubscribed = true;
    try {
      const res = await fetchWithTimeout("/auth/user", { timeout: 5000 });
      if (res.redirected) {
        setAuthenticated({ authenticated: false });
      } else {
        const json = await res.json();
        setAuthenticated({ authenticated: json.authenticated });
      }
    } catch (e) {
      console.log(e);
      setAuthenticated({ authenticated: false });
    }
    setLoadingComplete(true);
    return () => (isSubscribed = false);
  }, []);
  return (
    <context.Provider value={[loadingComplete, auth]}>
      {children}
    </context.Provider>
  );
};

UserProvider.context = context;

export default UserProvider;
