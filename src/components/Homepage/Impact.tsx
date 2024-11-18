export default function ImpactCard() {
  return (
    <div className="mx-auto pt-20">
      <h2
        style={{
          fontSize: "2.25rem", // Set to h4 equivalent
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "1.5rem",
        }}
      >
        Our{" "}
        <span
          style={{
            backgroundColor: "#F2AF29CC",
            padding: "2px 2px 20px",
            marginRight: "10px",
            display: "inline-block",
            lineHeight: "0.1",
          }}
        >
          Impact
        </span>{" "}
        So Far
      </h2>

      <div
        style={{
          marginTop: "2rem",
          marginBottom: "2rem",
          backgroundColor: "#0F4C5C",
          backgroundImage: `url('/assets/left.png'), url('/assets/right.png')`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top left, bottom right", // Update positions
          backgroundSize: "250px 250px", // Default size
          color: "white",
          padding: "2rem 0",
          borderRadius: "1rem",
        }}
        className="responsive-background"
      >
        <style>
          {`
            @media (max-width: 768px) {
              .responsive-background {
                background-size: 150px 150px; /* Smaller size for mobile */
                background-position: top left, bottom right; /* Maintain position */
              }
            }
          `}
        </style>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {/* 9000+ */}
          <div
            style={{
              textAlign: "center",
              flex: "1 1 200px",
              margin: "1rem",
            }}
          >
            <h4
              style={{
                fontWeight: "bold",
                color: "#F2AF29",
                fontSize: "2rem",
              }}
            >
              9000+
            </h4>
            <p
              style={{
                fontSize: "1.125rem",
              }}
            >
              Deployed Abroad
            </p>
          </div>

          {/* 4+ */}
          <div
            style={{
              textAlign: "center",
              flex: "1 1 200px",
              margin: "1rem",
            }}
          >
            <h4
              style={{
                fontWeight: "bold",
                color: "#F2AF29",
                fontSize: "2rem",
              }}
            >
              4+
            </h4>
            <p
              style={{
                fontSize: "1.125rem",
              }}
            >
              Big Clients
            </p>
          </div>

          {/* 30 Years */}
          <div
            style={{
              textAlign: "center",
              flex: "1 1 200px",
              margin: "1rem",
            }}
          >
            <h4
              style={{
                fontWeight: "bold",
                color: "#F2AF29",
                fontSize: "2rem",
              }}
            >
              30 Years
            </h4>
            <p
              style={{
                fontSize: "1.125rem",
              }}
            >
              of Operations in Indonesia
            </p>
          </div>

          {/* 90% */}
          <div
            style={{
              textAlign: "center",
              flex: "1 1 200px",
              margin: "1rem",
            }}
          >
            <h4
              style={{
                fontWeight: "bold",
                color: "#F2AF29",
                fontSize: "2rem",
              }}
            >
              90%
            </h4>
            <p
              style={{
                fontSize: "1.125rem",
              }}
            >
              Successful Placement Rate
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
