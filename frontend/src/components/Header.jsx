import React from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

const Header = () => {
  const fadeIn = (direction, delay) => ({
    hidden: { opacity: 0, y: direction === "up" ? 50 : -50 },
    show: { opacity: 1, y: 0, transition: { delay } },
  });

  return (
    <motion.div
      className="flex-1 text-center font-secondary lg:text-left"
      style={{
        textAlign: "center",
        fontFamily: "Courier New, monospace",
      }}
    >
      <motion.h1
        variants={fadeIn("up", 0.3)}
        initial="hidden"
        animate="show"
        className="text-[55px] font-bold leading-[0.8] lg:text-[110px]"
        style={{
          fontSize: "150px",
          fontWeight: "bold",
          color: "#FFFFFF",
        }}
      >
        Chain<span>Salary</span>
      </motion.h1>
      <motion.div
        variants={fadeIn("up", 0.4)}
        initial="hidden"
        animate="show"
        className="mb-6 text-[36px] lg:text-[60px] font-secondary font-semibold uppercase leading-[1]"
        style={{ fontFamily: "Courier New, monospace" }}
      >
        <span className="text-white mr-10" style={{ fontSize: "3rem" }}>
          🤩
        </span>
        <TypeAnimation
          sequence={[
            "Simplify Payroll Automation",
            2000,
            "Easy and Fast",
            2000,
            "Powered by Chainlink",
            2000,
          ]}
          speed={50}
          className="text-accent"
          wrapper="span"
          repeat={Infinity}
          style={{ fontSize: "3rem" }}
        />
      </motion.div>
    </motion.div>
  );
};

export default Header;
