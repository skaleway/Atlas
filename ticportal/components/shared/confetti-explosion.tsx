import React from "react";
import ConfettiExplosion from "react-confetti-explosion";

const Confetti = ({ show }: { show: boolean }) => {
  const colors = ["#FFC700", "#FF0000", "#2E3191", "#41BBC7"];
  if (show) return <ConfettiExplosion colors={colors} />;
};

export default Confetti;
