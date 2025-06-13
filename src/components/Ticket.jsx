import React from "react";
import ticket from "../assets/images/pattern-ticket.svg";
import logoFull from "../assets/images/logo-full.svg";
import githubIcon from "../assets/images/icon-github.svg"

const Ticket = ({ formData, image }) => {
  const currentDate = new Date();
  const month = currentDate.toLocaleString("default", { month: "long" });
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();

  const fullDate = `${month} ${day} ${year}`;

  return (
    <div className="relative h-full w-full lg:max-w-xl md:max-w-xl max-w-lg lg:p-0 md:p-0 p-4">
      <div className="z-10 h-full w-full">
        <img src={ticket} alt="Ticket box" className="h-full w-full" />
      </div>
      <div className=" absolute inset-0 flex justify-between z-20 p-6 h-full w-full">
        <div className="flex flex-col justify-between">
          <div className="flex flex-col gap-2">
            <img src={logoFull} alt="Full Logo" className="lg:w-60 md:w-50 w-50" />
            <p className="text-sm text-[#8784a4] pl-10">
              {fullDate} / Austin, TX
            </p>
          </div>
          <div className="flex items-center gap-4">
            <img src={image} alt="Profile Image" className="lg:w-20 lg:h-20 md:w-20 md:h-20 w-15 h-15 object-cover rounded-xl" />
            <div className="flex flex-col lg:gap-2">
              <h2 className="lg:text-2xl md:text-2xl text-lg">{formData.fullName}</h2>
              <div className="flex items-center gap-1">
                <img src={githubIcon} alt="GitHub Icon" />
                <p className="text-[#8784a4]">{formData.githubUsername}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <p className="rotate-90 text-2xl text-[#8784a4]">#01609</p>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
