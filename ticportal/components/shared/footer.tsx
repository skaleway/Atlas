import React from "react";

const Footer = () => {
  const date = new Date().getFullYear();

  return (
    <footer className="h-20 text-center flex gap-2 items-center justify-center">
      <span>&copy;</span> <span>{date}</span> <span>Tic Summit</span>
    </footer>
  );
};

export default Footer;
