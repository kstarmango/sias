import { useState } from "react";
import {useAuth} from "@shared/auth";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { setAuth } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    
    e.preventDefault();
    // Here you would usually send a request to your backend to authenticate the user
    // For the sake of this example, we're using a mock authentication
    navigate("/");
    /**
      if (username === "user" && password === "password") {
        // Replace with actual authentication logic
        setAuth({ username });

        // auth 확인 후, index page로 이동
        navigate("");
      } else {
        alert("Invalid username or password");
      }
     */

  };
  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;