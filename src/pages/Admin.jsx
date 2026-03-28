import { useState } from "react";

export default function Admin() {
  const [queueNumber, setQueueNumber] = useState(
    () => parseInt(localStorage.getItem("clinic_current_queue")) || 0,
  );

  const handleNext = () => {
    const nextNumber = queueNumber + 1;
    setQueueNumber(nextNumber);
    localStorage.setItem("clinic_current_queue", nextNumber.toString());
  };

  const handleReset = () => {
    setQueueNumber(0);
    localStorage.setItem("clinic_current_queue", "0");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f8fafc",
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
        padding: "1.5rem",
      }}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          width: "100%",
          maxWidth: "460px",
          borderRadius: "1.5rem",
          boxShadow:
            "0 20px 25px -5px rgba(0,0,0,0.05), 0 8px 10px -6px rgba(0,0,0,0.01)",
          border: "1px solid #e2e8f0",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "1.5rem 2rem",
            borderBottom: "1px solid #f1f5f9",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#ffffff",
          }}
        >
          <div
            style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
          >
            <div
              style={{
                backgroundColor: "#eff6ff",
                padding: "0.6rem",
                borderRadius: "0.5rem",
              }}
            >
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
              </svg>
            </div>
            <h1
              style={{
                margin: 0,
                fontSize: "1.125rem",
                fontWeight: 700,
                color: "#1e293b",
              }}
            >
              Queue Desk
            </h1>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              backgroundColor: "#f0fdf4",
              padding: "0.4rem 0.75rem",
              borderRadius: "2rem",
              border: "1px solid #bbf7d0",
            }}
          >
            <div
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: "#22c55e",
              }}
            ></div>
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "#166534",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Live Sync
            </span>
          </div>
        </div>

        <div
          style={{
            padding: "2.5rem 2rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontSize: "0.875rem",
              fontWeight: 600,
              color: "#64748b",
              marginBottom: "1rem",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Current Patient
          </span>

          <div
            style={{
              backgroundColor: "#f8fafc",
              padding: "2.5rem 5rem",
              borderRadius: "1.25rem",
              border: "1px solid #e2e8f0",
              marginBottom: "2.5rem",
              width: "100%",
              textAlign: "center",
            }}
          >
            <h2
              style={{
                fontSize: "5.5rem",
                fontWeight: 800,
                color: "#1e293b",
                margin: 0,
                lineHeight: 1,
              }}
            >
              {queueNumber}
            </h2>
          </div>

          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "0.875rem",
            }}
          >
            <button
              onClick={handleNext}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                width: "100%",
                padding: "1.2rem",
                backgroundColor: "#3b82f6",
                color: "white",
                border: "none",
                borderRadius: "0.75rem",
                fontSize: "1.05rem",
                fontWeight: 600,
                cursor: "pointer",
                boxShadow: "0 4px 6px -1px rgba(59, 130, 246, 0.3)",
                transition: "background-color 0.2s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#2563eb")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#3b82f6")
              }
            >
              <span>Call Next Patient</span>
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>

            <button
              onClick={handleReset}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                width: "100%",
                padding: "1rem",
                backgroundColor: "#ffffff",
                color: "#ef4444",
                border: "2px solid #fee2e2",
                borderRadius: "0.75rem",
                fontSize: "1rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "background-color 0.2s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#fef2f2")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#ffffff")
              }
            >
              <svg
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
              </svg>
              <span>Reset Queue</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
