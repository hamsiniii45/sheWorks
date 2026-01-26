import { useState } from "react";

function Login({ onLogin }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleLogin = () => {
  const nameRegex = /^[A-Za-z ]+$/;
  const phoneRegex = /^[6-9][0-9]{9}$/;

  if (!name || !nameRegex.test(name)) {
    alert("Name should contain only letters");
    return;
  }

  if (phone.length !== 10 || isNaN(phone)) {
    alert("Please enter a valid 10-digit mobile number");
    return;
  }

  onLogin({ name, phone });
};

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to SheWorks</h1>
      <h3 style={styles.subtitle}>empowHER 👩‍🌾</h3>

      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={styles.input}
      />

      <input
        type="text"
        placeholder="Enter mobile number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        style={styles.input}
      />

      <button style={styles.button} onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    background: "#fdf3f6",
    textAlign: "center"
  },
  title: {
    fontSize: "32px",
    marginBottom: "0px"
  },
  subtitle: {
    color: "#d6336c",
    marginBottom: "30px",
    fontSize: "25px"
  },
  input: {
    width: "250px",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "6px",
    border: "1px solid #ccc"
  },
  button: {
    padding: "10px 25px",
    backgroundColor: "#d6336c",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px"
  }
};

export default Login;
