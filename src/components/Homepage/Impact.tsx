export default function ImpactCard() {
  return (
    <div className="mx-auto pt-20 font-['Poppins']">
      <h2 className="text-[24px] sm:text-[24px]  md:text-[50px] lg:text-[50px] font-bold text-center relative mb-8">
        Our{" "}
        <span
          style={{
            backgroundColor: "#F2AF29CC",
            font: "Poppins",
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
          backgroundImage: `url('/assets/left2.png'), url('/assets/right2.png')`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top left, bottom right",
          backgroundSize: "250px 250px",
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
                background-size: 150px 150px;
                background-position: top left, bottom right;
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
            <h4 className="text-impact text-[36px] sm:text-[24px]  md:text-[50px] lg:text-[50px] font-bold text-center relative mb-2">
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
            <h4 className="text-impact text-[36px] sm:text-[24px]  md:text-[50px] lg:text-[50px] font-bold text-center relative mb-2">
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
            <h4 className="text-impact text-[36px] sm:text-[24px]  md:text-[50px] lg:text-[50px] font-bold text-center relative mb-2">
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
            <h4 className="text-impact text-[36px] sm:text-[24px]  md:text-[50px] lg:text-[50px] font-bold text-center relative mb-2">
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
