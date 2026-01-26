import { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";

function HireWorker({ goBack }) {
  const [workers, setWorkers] = useState([]);
  const [skillFilter, setSkillFilter] = useState("");
  const [pincode, setPincode] = useState("");
  const [hiredWorkerId, setHiredWorkerId] = useState(null);
  const [enteredCode, setEnteredCode] = useState("");
  const [verifiedWorkerId, setVerifiedWorkerId] = useState(null);

  useEffect(() => {
    const fetchWorkers = async () => {
      const snapshot = await getDocs(collection(db, "workers"));
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setWorkers(list);
    };

    fetchWorkers();
  }, []);

  const rateWorker = async (workerId, currentRating, ratingCount, newRating) => {
    const avgRating =
      (currentRating * ratingCount + newRating) / (ratingCount + 1);

    const workerRef = doc(db, "workers", workerId);

    await updateDoc(workerRef, {
      rating: avgRating,
      ratingCount: ratingCount + 1,
    });

    alert("Thank you for rating!");

    setVerifiedWorkerId(null);
    setEnteredCode("");
  };

  const filteredWorkers = workers
    .filter((w) =>
      skillFilter ? w.skills.includes(skillFilter) : true
    )
    .sort((a, b) => {
      if (!pincode) return 0;
      if (a.pincode === pincode && b.pincode !== pincode) return -1;
      if (a.pincode !== pincode && b.pincode === pincode) return 1;
      return 0;
    });

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Find Helping Hands 🤝</h2>

      <div style={styles.filters}>
        <select onChange={(e) => setSkillFilter(e.target.value)}>
          <option value="">Select Skill</option>
          <option>Cooking</option>
          <option>Tailoring</option>
          <option>House Maid</option>
          <option>Cleaning</option>
          <option>Caretaker</option>
          <option>Farming</option>
          <option>Vendor / Shop Helper</option>
        </select>

        <input
          type="text"
          placeholder="Enter pincode"
          onChange={(e) => setPincode(e.target.value)}
        />
      </div>

      {filteredWorkers.map((w) => (
        <div key={w.id} style={styles.card}>
          <h4>{w.name}</h4>
          <p><b>Skills:</b> {w.skills.join(", ")}</p>
          <p><b>Location:</b> {w.pincode}</p>
          <p>⭐ {w.rating?.toFixed(1) || 0} ({w.ratingCount || 0} ratings)</p>

          {/* CALL BUTTON */}
          <button
            style={styles.callBtn}
            onClick={() => {
              window.location.href = `tel:${w.phone}`;
              setHiredWorkerId(w.id);
            }}
          >
            Call 📞
          </button>

          {/* ENTER CODE */}
          {hiredWorkerId === w.id && (
            <div style={styles.verifyBox}>
              <input
                type="text"
                placeholder="Enter worker code"
                value={enteredCode}
                onChange={(e) => setEnteredCode(e.target.value)}
                style={styles.input}
              />

              <button
                style={styles.verifyBtn}
                onClick={() => {
                  if (enteredCode === String(w.secretCode)) {
                    setVerifiedWorkerId(w.id);
                    alert("Verified! You can now rate.");
                  } else {
                    alert("Invalid code!");
                  }
                }}
              >
                Verify Code
              </button>
            </div>
          )}

          {/* RATING AFTER VERIFICATION */}
          {verifiedWorkerId === w.id && (
            <div style={styles.ratingBox}>
              <p>Rate this worker:</p>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  style={styles.star}
                  onClick={() =>
                    rateWorker(
                      w.id,
                      w.rating || 0,
                      w.ratingCount || 0,
                      star
                    )
                  }
                >
                  ⭐
                </span>
              ))}
            </div>
          )}
        </div>
      ))}

      <button style={styles.backBtn} onClick={goBack}>
        ← Back
      </button>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    background: "#fff7fa",
    minHeight: "100vh",
  },
  heading: {
    textAlign: "center",
  },
  filters: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
    marginBottom: "15px",
  },
  card: {
    background: "#fff",
    padding: "15px",
    marginBottom: "15px",
    borderRadius: "10px",
    boxShadow: "0 0 6px rgba(0,0,0,0.1)",
  },
  callBtn: {
    marginTop: "8px",
    padding: "8px",
    backgroundColor: "#d6336c",
    color: "white",
    border: "none",
    borderRadius: "6px",
  },
  verifyBox: {
    marginTop: "10px",
  },
  input: {
    padding: "8px",
    width: "100%",
    marginBottom: "8px",
  },
  verifyBtn: {
    padding: "8px",
    width: "100%",
    backgroundColor: "#444",
    color: "white",
    border: "none",
    borderRadius: "6px",
  },
  ratingBox: {
    marginTop: "10px",
  },
  star: {
    cursor: "pointer",
    fontSize: "20px",
    marginRight: "5px",
  },
  backBtn: {
    marginTop: "20px",
    width: "10%",
    padding: "10px",
    border: "2px solid #d6336c",
    background: "white",
    color: "#d6336c",
    borderRadius: "8px",
  },
};

export default HireWorker;
