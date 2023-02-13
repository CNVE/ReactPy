import React, { useState } from "react";
import AppRouter from "components/Router";
import { authService } from "firebaseMain";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} />
      <footer>&copy; {new Date().getFullYear()} Twit</footer>
    </>
  );
}

export default App;
