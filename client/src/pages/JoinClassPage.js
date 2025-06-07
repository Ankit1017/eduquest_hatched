import React, { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useClass } from "../context/ClassContext";
import { AuthContext } from "../context/AuthContext";
import {Navbar} from "../components/NavbarManager";

const JoinClassPage = () => {
  const { joinClass, loading } = useClass();
  const { user } = useContext(AuthContext);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const { classId } = useParams();

    const handleJoin = async (e) => {
      e.preventDefault();
      try {
        await joinClass(classId, user);
        setMessage("Successfully joined the class!");
        setTimeout(() => navigate("/"), 1500);
      } catch (error) {
        // Try to extract server error message
        let errorMsg = "Failed to join class";
        if (error?.response?.data?.error) {
          errorMsg = error.response.data.error; // For Axios or similar libraries
        } else if (error?.message) {
          errorMsg = error.message;
        }
        setMessage(errorMsg);
        console.error(error);
      }
    };


  return (
   <>
    <Navbar />
    <div
      style={{
        maxWidth: 400,
        margin: "60px auto",
        padding: 24,
        background: "#121212",
        color: "#e0e0e0",
        border: "1px solid #333",
        borderRadius: 8,
      }}
    >
      <h2 style={{ color: "#fff", marginBottom: "20px" }}>Join Class</h2>
      <form onSubmit={handleJoin}>
        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            background: "#1976d2",
            color: "#fff",
            border: "none",
            borderRadius: 4,
            fontSize: "1rem",
            cursor: "pointer",
            marginTop: "16px",
          }}
        >
          {loading ? "Joining..." : "Join Class"}
        </button>
      </form>
      {message && (
        <p
          style={{
            // Defensive: check message is a string before using includes
            color:
              typeof message === "string" && message.includes("Success")
                ? "#4caf50"
                : "#f44336",
            marginTop: "16px",
          }}
        >
          {message}
        </p>
      )}
    </div>
   </>
  );
};

export default JoinClassPage;
