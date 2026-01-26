import { useState } from "react";
import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";

function RegisterWorker({ user, goBack }) {
  const [skills, setSkills] = useState([]);
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");

  const skillOptions = [
    "Cooking",
    "Tailoring",
    "House Maid",
    "Cleaning",
    "Caretaker",
    "Farming",
    "Vendor / Shop Helper",
  ];

  const toggleSkill = (skill) => {
    setSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : [...prev, skill]
    );
  };

  const handleSubmit = async () => {
    if (skills.length === 0 || !address || pincode.length !== 6) {
      alert("Please fill all details correctly");
      return;
    }

    try {
      const q = query(
        collection(db, "workers"),
        where("phone", "==", user.phone)
      );

      const snapshot = await getDocs(q);

      // 🔐 Generate 4-digit secret code
      const secretCode = Math.floor(1000 + Math.random() * 9000);

      if (!snapshot.empty) {
        // ✅ UPDATE EXISTING WORKER
        const workerDoc = snapshot.docs[0];
        const workerRef = doc(db, "workers", workerDoc.id);

        await updateDoc(workerRef, {
          skills,
          address,
          pincode,
          updatedAt: new Date(),
        });

        alert("Details updated successfully!");
      } else {
        // 🆕 NEW WORKER REGISTRATION
        await addDoc(collection(db, "workers"), {
          name: user.name,
          phone: user.phone,
          skills,
          address,
          pincode,
          rating: 0,
          ratingCount: 0,
          secretCode, // 🔐 Important
          createdAt: new Date(),
        });

        alert(
          `Registration Successful!\n\nYour verification code is: ${secretCode}\n\nShare this code with the employer after completing work.`
        );
      }

      goBack();
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Become a Worker 💼</h2>
      <p style={styles.subText}>
        Update your skills to receive more job opportunities
      </p>

      <div style={styles.box}>
        <p><b>Name:</b> {user.name}</p>
        <p><b>Phone:</b> {user.phone}</p>

        <h4>Select Your Skills</h4>
        <div style={styles.checkboxGroup}>
          {skillOptions.map((skill) => (
            <label key={skill} style={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={skills.includes(skill)}
                onChange={() => toggleSkill(skill)}
              />
              {skill}
            </label>
          ))}
        </div>

        <input
          type="text"
          placeholder="Enter full address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={styles.input}
        />

        <input
          type="text"
          placeholder="Enter pincode"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          style={styles.input}
        />

        <button style={styles.saveBtn} onClick={handleSubmit}>
          Save / Update Details
        </button>

        <button style={styles.backBtn} onClick={goBack}>
          ← Back
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "40px",
    background: "#fff7fa",
    minHeight: "100vh",
  },
  heading: {
    fontSize: "28px",
    marginBottom: "5px",
  },
  subText: {
    color: "#555",
    marginBottom: "20px",
  },
  box: {
    width: "320px",
    background: "#fff",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  checkboxGroup: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "15px",
  },
  checkboxLabel: {
    marginBottom: "6px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "12px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  saveBtn: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#d6336c",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
    marginBottom: "10px",
  },
  backBtn: {
    width: "100%",
    padding: "10px",
    backgroundColor: "white",
    border: "2px solid #d6336c",
    color: "#d6336c",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default RegisterWorker;
