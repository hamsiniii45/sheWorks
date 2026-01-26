import { useState } from "react";
import Login from "./Login";
import RegisterWorker from "./RegisterWorker";
import HireWorker from "./HireWorker";

function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("home");

  const handleLogout = () => {
    setUser(null);
    setPage("home");
  };

  return (
    <div style={styles.appContainer}>
      {!user ? (
        <Login onLogin={setUser} />
      ) : page === "home" ? (
        <div style={styles.dashboard}>
          <h2 style={styles.welcome}>Hi {user.name} 👋</h2>

          <p style={styles.tagline}>
            Let’s work together 💪👩‍🌾
          </p>

          <button
            style={styles.primaryBtn}
            onClick={() => setPage("register")}
          >
            Register as Worker
          </button>

          <button
            style={styles.secondaryBtn}
            onClick={() => setPage("hire")}
          >
            Hire a Worker
          </button>

          {/* LOGOUT BUTTON */}
          <button
            style={styles.logoutBtn}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      ) : page === "register" ? (
        <RegisterWorker user={user} goBack={() => setPage("home")} />
      ) : (
        <HireWorker goBack={() => setPage("home")} />
      )}
    </div>
  );
}

const styles = {
  appContainer: {
    minHeight: "100vh",
    background: "linear-gradient(to bottom, #fff0f5, #ffe6f0)",
    fontFamily: "Arial, sans-serif",
  },

  dashboard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    textAlign: "center",
  },

  welcome: {
    fontSize: "28px",
    marginBottom: "6px",
  },

  tagline: {
    fontSize: "16px",
    color: "#555",
    marginBottom: "30px",
  },

  primaryBtn: {
    width: "240px",
    padding: "12px",
    marginBottom: "15px",
    backgroundColor: "#d6336c",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
  },

  secondaryBtn: {
    width: "240px",
    padding: "12px",
    marginBottom: "15px",
    backgroundColor: "white",
    color: "#d6336c",
    border: "2px solid #d6336c",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
  },

  logoutBtn: {
    width: "120px",
    padding: "10px",
    backgroundColor: "#fff",
    color: "#444",
    border: "1px solid #aaa",
    borderRadius: "8px",
    fontSize: "14px",
    cursor: "pointer",
  },
};

export default App;
