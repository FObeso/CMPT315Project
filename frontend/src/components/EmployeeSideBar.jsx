import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaCalendar,
  FaUserCircle,
  FaGraduationCap,
  FaCarSide,
  FaCodeBranch,
} from "react-icons/fa";

function getWindowWidth() {
  return window.innerWidth;
}

function SideBarItem({ link, route, Icon, text, selectedRoute }) {
  const [windowWidth, setWindowWidth] = useState(getWindowWidth());

  useEffect(() => {
    function handleWindowResize() {
      setWindowWidth(getWindowWidth());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  const activeStyle = "text-primaryText bg-lightOpacity ";
  return (
    <div>
      <Link to={link} style={{ textDecoration: "none" }}>
        <div
          className={`flex  p-3 font-bold
font-bold ${
            route === selectedRoute && activeStyle
          } hover:bg-lightOpacity hover:text-primaryText`}
        >
          <Icon />
          {windowWidth > 850 && <h5 className="pl-3">{text}</h5>}
        </div>
      </Link>
    </div>
  );
}

export default function EmployeeSideBar({ route }) {
  return (
    <>
      <div
        className={` top-0 border ml-3 w-fit border-black border-solid z-auto `}
      >
        <div>
          <div className="pt-3 bg-primary"></div>
          <SideBarItem
            link="/employee/cars"
            Icon={() => <FaCarSide size={24} />}
            text="Cars"
            route="cars"
            selectedRoute={route}
          />
          <SideBarItem
            link="/employee/transactions"
            Icon={() => <FaCalendar size={24} />}
            text="Transactions"
            route="transactions"
            selectedRoute={route}
          />
          <SideBarItem
            link="/employee/branches"
            Icon={() => <FaCodeBranch size={24} />}
            text="Branches"
            route="branches"
            selectedRoute={route}
          />
          <SideBarItem
            link="/employee/customers"
            Icon={() => <FaUserCircle size={24} />}
            text="Customers"
            route="customers"
            selectedRoute={route}
          />
          <SideBarItem
          link="/employee/damages"
          Icon={() => <FaUserCircle size={24} />}
          text="Damages"
          route="damages"
          selectedRoute={route}
          />
        </div>
      </div>
    </>
  );
}
