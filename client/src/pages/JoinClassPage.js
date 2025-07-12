/**
 * JoinClassPage.jsx
 *
 * Page for joining a class via a classId in the URL.
 * Handles join requests, loading state, error/success feedback, and navigation.
 */

import React, { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useClass } from "../context/ClassContext";
import { AuthContext } from "../context/AuthContext";
import { Navbar } from "../components/NavbarManager";

/**
 * JoinClassPage
 * --------------
 * Allows a user to join a class using the classId from the URL.
 * Handles join requests, loading state, success/error feedback, and navigation on success.
 */
const JoinClassPage = () => {
  const { joinClass, loading } = useClass();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { classId } = useParams();
  const [message, setMessage] = useState("");

  /**
   * Handles the join class form submission.
   * Shows feedback and navigates home on success.
   * @param {Event} e - Form submission event.
   */
  const handleJoin = async (e) => {
    e.preventDefault();

    // Defensive: ensure classId and user exist
    if (!classId || !user) {
      setMessage("Missing class or user information.");
      return;
    }

    try {
      await joinClass(classId, user);
      setMessage("Successfully joined the class!");
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      // Extract server error message if available
      let errorMsg = "Failed to join class";
      if (error?.response?.data?.error) {
        errorMsg = error.response.data.error;
      } else if (error?.message) {
        errorMsg = error.message;
      }
      setMessage(errorMsg);
      console.error(error);
    }
  };

  /**
   * Renders an error message if no classId is present in the URL.
   */
  if (!classId) {
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
            textAlign: "center"
          }}
        >
          <h2 style={{ color: "#fff", marginBottom: "20px" }}>Join Class</h2>
          <p style={{ color: "#f44336" }}>Invalid class link.</p>
        </div>
      </>
    );
  }

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
              background: loading ? "#1565c0" : "#1976d2",
              color: "#fff",
              border: "none",
              borderRadius: 4,
              fontSize: "1rem",
              cursor: loading ? "not-allowed" : "pointer",
              marginTop: "16px",
              opacity: loading ? 0.7 : 1,
              transition: "background 0.2s, opacity 0.2s"
            }}
          >
            {loading ? "Joining..." : "Join Class"}
          </button>
        </form>
        {message && (
          <p
            style={{
              color:
                typeof message === "string" && message.toLowerCase().includes("success")
                  ? "#4caf50"
                  : "#f44336",
              marginTop: "16px",
              fontWeight: 500
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
