import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [user, setUser] = useState<string>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) return;
    let ignore = false;
    const authorize = async () => {
      const response = await fetch("http://localhost:3000/auth/authorize", {
        credentials: "include",
      });
      const data = await response.json();
      console.log(data);

      if (response.ok && !ignore) {
        setUser(data);
      } else {
        setUser("");
      }
    };
    authorize();
    return () => {
      ignore = true;
    };
  }, [user]);

  const handleLogin = async () => {
    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email: email, password: password }),
    });
    const data = await response.json();
    if (response.ok) {
      setUser(data);
    }
  };

  // const handleLogin = async () => {
  //   const response = await fetch("http://localhost:3000/auth/login", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     credentials: "include",
  //     body: JSON.stringify({
  //       email: "john.doe@example.com",
  //       password: "12345678",
  //     }),
  //   });
  //   const data = await response.json();

  //   if (response.status === 200) {
  //     setUser(data);
  //   } else {
  //     setUser("");
  //   }
  // };

  const handleLogout = async () => {
    const response = await fetch("http://localhost:3000/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    if (response.ok) {
      setUser(undefined);
    }
  };
  return (
    <>
      {JSON.stringify(user)}
      {user ? (
        <button
          className="bg-red-400"
          onClick={(e) => {
            e.preventDefault();
            handleLogout();
          }}
        >
          Log out
        </button>
      ) : (
        <form
          className="mx-auto flex max-w-sm flex-col"
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button
            className="bg-blue-400"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            Log in
          </button>
        </form>
      )}
    </>
  );
}

export default App;
