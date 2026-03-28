import { useState, useEffect, useRef } from "react";

export default function Display() {
  const [queueNumber, setQueueNumber] = useState(
    () => parseInt(localStorage.getItem("clinic_current_queue")) || 0,
  );

  const [callHistory, setCallHistory] = useState(() => {
    const saved = localStorage.getItem("clinic_call_history");
    return saved ? JSON.parse(saved) : [];
  });

  const [isReady, setIsReady] = useState(false);
  const audioRef = useRef(null);

  const handleEnableSound = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => console.log("Audio test failed"));
      setIsReady(true);
    }
  };

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "clinic_current_queue") {
        const newNum = parseInt(e.newValue) || 0;
        setQueueNumber(newNum);

        setCallHistory((prev) => {
          const updated = [newNum, ...prev.slice(0, 4)];
          localStorage.setItem("clinic_call_history", JSON.stringify(updated));
          return updated;
        });

        if (isReady && audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current.play().catch(console.error);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [isReady]);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8fafc",
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
        color: "#1e293b",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>
        {`
          @keyframes slideIn {
            from { opacity: 0; transform: translateX(-15px); }
            to { opacity: 1; transform: translateX(0); }
          }
          @keyframes pulseDot {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
          .history-card { animation: slideIn 0.4s ease-out forwards; }
        `}
      </style>

      {!isReady && (
        <div
          style={{
            position: "absolute",
            top: "2rem",
            right: "2rem",
            backgroundColor: "#ffffff",
            padding: "1rem 1.5rem",
            borderRadius: "1rem",
            boxShadow:
              "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)",
            border: "1px solid #e2e8f0",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            zIndex: 10,
          }}
        >
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: "#f59e0b",
              animation: "pulseDot 2s infinite",
            }}
          ></div>
          <span
            style={{ fontSize: "0.9rem", fontWeight: 600, color: "#475569" }}
          >
            Audio alerts disabled
          </span>
          <button
            onClick={handleEnableSound}
            style={{
              backgroundColor: "#3b82f6",
              color: "white",
              border: "none",
              padding: "0.6rem 1.2rem",
              borderRadius: "0.5rem",
              fontSize: "0.875rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "background-color 0.2s",
            }}
          >
            Enable Audio
          </button>
        </div>
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          padding: "1rem",
        }}
      >
        <audio
          ref={audioRef}
          src="https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"
          preload="auto"
        />

        <div style={{ marginBottom: "1.5rem", textAlign: "center" }}>
          <h1
            style={{
              fontSize: "1.25rem",
              fontWeight: 700,
              color: "#64748b",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              margin: 0,
            }}
          >
            Now Serving
          </h1>
        </div>

        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "2.5rem 6rem",
            borderRadius: "2rem",
            boxShadow:
              "0 20px 25px -5px rgba(0,0,0,0.05), 0 8px 10px -6px rgba(0,0,0,0.01)",
            border: "1px solid #f1f5f9",
            marginBottom: "2.5rem",
          }}
        >
          <h2
            style={{
              fontSize: "10rem",
              fontWeight: 800,
              color: "#3b82f6",
              margin: 0,
              lineHeight: 1,
              textShadow: "0 10px 20px rgba(59, 130, 246, 0.15)",
            }}
          >
            {queueNumber}
          </h2>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
            width: "100%",
            maxWidth: "800px",
          }}
        >
          <span
            style={{
              fontSize: "0.875rem",
              fontWeight: 600,
              color: "#94a3b8",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Recent Calls
          </span>

          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {callHistory.length > 0 ? (
              callHistory.map((num, i) => (
                <div
                  key={`history-${num}-${i}`}
                  className="history-card"
                  style={{
                    backgroundColor: i === 0 ? "#eff6ff" : "#ffffff",
                    border: i === 0 ? "2px solid #bfdbfe" : "1px solid #e2e8f0",
                    borderRadius: "1rem",
                    padding: "1rem 1.5rem",
                    boxShadow:
                      i === 0
                        ? "0 10px 15px -3px rgba(59, 130, 246, 0.1)"
                        : "0 4px 6px -1px rgba(0,0,0,0.02)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minWidth: "80px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "1.75rem",
                      fontWeight: 800,
                      color: i === 0 ? "#2563eb" : "#64748b",
                    }}
                  >
                    {num}
                  </span>
                </div>
              ))
            ) : (
              <span
                style={{
                  color: "#cbd5e1",
                  fontStyle: "italic",
                  fontSize: "0.9rem",
                }}
              >
                No history for today
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
