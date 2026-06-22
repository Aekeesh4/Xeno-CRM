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
        "https://xeno-crm-production-1dfc.up.railway.app/api/auth/register",
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

    <div className="container mt-5" style={{maxWidth:"600px"}}>

      <div
        className="p-5 rounded shadow"
        style={{
          background:"#1e293b",
          color:"white"
        }}
      >

        <h1 className="mb-4 text-center">
          Register
        </h1>

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Enter your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          className="form-control mb-3"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <select
          className="form-control mb-4"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
        </select>

        <button
          className="btn btn-success w-100"
          onClick={handleRegister}
        >
          Register
        </button>

      </div>

    </div>

  );
}

export default Register;