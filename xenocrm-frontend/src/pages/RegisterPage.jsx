import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");

  const navigate = useNavigate();

  const handleRegister = async () => {

    try {

      const response = await fetch(
        "http://localhost:8081/api/auth/register",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name,
            email,
            password,
            role,
          }),
        }
      );

      if (response.ok) {

        alert("Registration Successful");

        navigate("/login");

      } else {

        alert("Registration Failed");

      }

    } catch (error) {

      console.log(error);

      alert("Server Error");

    }

  };

  return (

    <div className="container mt-5">

      <h1>Register</h1>

      <input
        className="form-control mb-3"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="form-control mb-3"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="form-control mb-3"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <select
        className="form-control mb-3"
        onChange={(e) => setRole(e.target.value)}
      >

        <option value="USER">
          USER
        </option>

        <option value="ADMIN">
          ADMIN
        </option>

      </select>

      <button
        className="btn btn-success"
        onClick={handleRegister}
      >
        Register
      </button>

    </div>

  );
}

export default Register;