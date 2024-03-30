import React from "react";
import { Oval } from "react-loader-spinner";

const MainLoader = () => {
  return (
    <div className="main-loader">
      <Oval
        height={50}
        width={50}
        color="#E5E9EB"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="bg-slate-100"
        strokeWidth={3}
        strokeWidthSecondary={3}
      />
    </div>
  );
};

export default MainLoader;
