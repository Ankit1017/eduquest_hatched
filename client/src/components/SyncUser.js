import React from "react";
import { useLocation } from "react-router-dom";
import { SignIn } from '@clerk/clerk-react';

const SyncUser = () => {
  const location = useLocation(); // Get the current location object

  // location.pathname gives you the current path (e.g., "/join/123")
  // location.search gives you the query string (e.g., "?next=foo")
  // location.hash gives you the hash (e.g., "#section1")

  return (
    <div style={{ marginTop: '50px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <SignIn
        // You can pass the path as a prop if your SignIn component supports redirect
        afterSignInUrl={location.pathname}
      />
      {/*<p style={{ marginTop: 20, color: "#888" }}>*/}
      {/*  You tried to access: <code>{location.pathname}</code>*/}
      {/*</p>*/}
    </div>
  );
};

export default SyncUser;
