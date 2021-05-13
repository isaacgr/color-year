import React, { createContext, useState, useEffect } from "react";

const context = createContext(null);

const UserProvider = ({ children }) => {
  const [auth, setAuthenticated] = useState({});
  const [loadingComplete, setLoadingComplete] = useState(false);
  useEffect(async () => {
    let isSubscribed = true;
    try {
      const res = await fetch("/auth/user");
      if (res.redirected) {
        setAuthenticated({ authenticated: false, url: res.url });
      } else {
        const json = await res.json();
        setAuthenticated({ authenticated: json.authenticated, url: "/" });
      }
    } catch (e) {
      console.log(e);
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
