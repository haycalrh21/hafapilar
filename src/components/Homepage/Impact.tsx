import NumberTicker from "../ui/number-ticker";

export default function ImpactCard() {
  return (
    <div className="mx-auto pt-10 font-['Poppins']">
      <h2 className="text-[24px] sm:text-[24px] text-textlayout  md:text-[50px] lg:text-[50px] font-bold text-center relative mb-8">
        <span className="block md:hidden text-textlayout">
          Our{" "}
          <span
            style={{
              backgroundColor: "#F2AF29CC",
              font: "Poppins",
              padding: "2px 2px 15px",
              marginRight: "1px",
              display: "inline-block",
              lineHeight: "0.1",
            }}
            className="text-textlayout"
          >
            Impact
          </span>{" "}
          So Far
        </span>
        <span className="hidden md:block">
          Our{" "}
          <span
            style={{
              backgroundColor: "#F2AF29CC",
              font: "Poppins",
              padding: "2px 2px 30px",
              marginRight: "10px",
              display: "inline-block",
              lineHeight: "0.1",
            }}
            className="text-textlayout"
          >
            Impact
          </span>{" "}
          So Far
        </span>
      </h2>
      <div className="max-w-[1120px] sm:w-full lg:w-[1120px] mx-auto ">
        <div
          style={{
            marginTop: "1rem",
            marginBottom: "1rem",
            backgroundColor: "#0F4C5C",
            backgroundImage: `url('/assets/left2.png'), url('/assets/right2.png')`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "top left, bottom right",
            backgroundSize: "370px 370px",
            color: "white",
            padding: "1rem 0",
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
                <NumberTicker value={9000} delay={-1000000} direction="up" />+
              </h4>
              <p className=" text-[16px] sm:text-[14px] lg:text-[24px]">
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
                <NumberTicker value={4} />+
              </h4>
              <p className=" text-[16px] sm:text-[14px] lg:text-[24px]">
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
                <NumberTicker value={30} />
                Years
              </h4>
              <p className=" text-[16px] sm:text-[14px] lg:text-[24px]">
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
                <NumberTicker value={90} />%
              </h4>
              <p className=" text-[16px] sm:text-[14px] lg:text-[24px]">
                Successful Placement Rate
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
