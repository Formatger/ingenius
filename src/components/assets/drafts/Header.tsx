import React, { useState, useEffect } from "react";
import Image from "next/image";

const Header = () => {
  const [displayLogo, setDisplayLogo] = useState<any>();

  return (
    <>
      <div
        className="header" >
        <div className="">
        </div>
        <div>
          <div className="user-wrap">
            hello
          </div>
        </div>
      </div>
      <div className="sticky-header"></div>
    </>
  );
};

export default Header;
