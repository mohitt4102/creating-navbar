import { useState } from "react";
import { BsArrowLeftShort, BsSearch, BsInfoCircle } from "react-icons/bs";
import { SiCodecademy } from "react-icons/si";
import { TiHome } from "react-icons/ti";
import { MdMiscellaneousServices } from "react-icons/md";
import { IoPersonAdd } from "react-icons/io5";
import { IoIosContact } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { IoMdLogIn } from "react-icons/io";
import { RiRegisteredLine } from "react-icons/ri";

const App = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const Menus = [
    { title: "Home", path: "/", icon: <TiHome /> },
    { title: "About", path: "/About", icon: <BsInfoCircle /> },
    {
      title: "Services",
      path: "/Services",
      icon: <MdMiscellaneousServices />,
    },
    { title: "Careers", path: "/Careers", icon: <IoPersonAdd /> },
    { title: "Contact", path: "/Contact", icon: <IoIosContact /> },
  ];

  const handleLoginClick = () => {
    navigate("/Login");
  };

  const handleRegisterClick = () => {
    navigate("/Register");
  };


  return (
    <>
      <div className="">
        <div
          className={`bg-neutral-800 h-screen pt-8 flex-auto ${
            open ? "w-64" : "w-20"
          } duration-700 relative`}
        >
          <BsArrowLeftShort
            className={`bg-white text-xl rounded-full absolute -right-2 top-9 border
           border-neutral-800 cursor-pointer duration-700 ${
             !open && "rotate-180 duration-700"
           } `}
            onClick={() => setOpen(!open)}
          />
          <div className="inline-flex">
            <SiCodecademy
              className={`bg-amber-300 text-3xl  
            rounded  cursor-pointer block float-left mr-2  p-1 ml-6 duration-700 ${
              open && "rotate-[360deg]"
            }`}
            />
            <h1
              className={`text-cyan-500 origin-left font-medium text-3xl mb-1  duration-700
            ${!open && "scale-0 duration-700"}`}
            >
              SideBar{" "}
            </h1>
          </div>

          <div
            className={`flex items-center rounded-md bg-gray-500 mt-5 
          ${!open ? "px-1" : "px-3"}px-2 py-2  p-1 ml-6 mr-6`}
          >
            <BsSearch
              className={`text-white text-lg block float-left cursor-pointer
            ${!open && "mr-2"}`}
            />
            <input
              type={"search"}
              placeholder={"Search"}
              className={`text-base bg-transparent w-full text-white focus:outline-none pl-2 ${
                !open && "hidden"
              }`}
            ></input>
          </div>

          <ul className="pt-2">
            {Menus.map((menu, index) => (
              <>
                <Link to={menu.path} key={index}>
                  <li
                    key={index}
                    className="text-white text-sm flex items-center 
                  gap-x-4 cursor-pointer p-2 ml-4 hover:bg-gray-500 rounded-md mt-2 mr-5 "
                  >
                    <span className="text-2xl block float-left">
                      {menu.icon ? menu.icon : <TiHome />}
                    </span>
                    <span
                      className={`text-base font-medium flex-1 duration-700 
                    ${!open && "hidden"}`}
                    >
                      {menu.title}
                    </span>
                  </li>
                </Link>
              </>
            ))}
          </ul>

          <div className="flex duration-700 mt-40 ">
            <div className={`pl-6 pt-6   ${!open && <IoMdLogIn />}`}>
              <button
                onClick={handleLoginClick}
                className={`bg-gray-500 origin-left text-lg text-white px-2 py-1 rounded hover:bg-cyan-500  ${
                  !open && "scale-0"
                }`}
                style={{ display: "flex" }}
              >
                <IoMdLogIn className="mt-1 mr-1 text-xl" /> Login
              </button>
            </div>

            <div className={`pl-6 pt-6   ${!open && <IoMdLogIn />}`}>
              <button
                onClick={handleRegisterClick}
                className={`bg-gray-500 origin-left text-lg text-white px-2 py-1 rounded hover:bg-cyan-500  ${
                  !open && "scale-0"
                }`}
                style={{ display: "flex" }}
              >
                <RiRegisteredLine className="mt-1 mr-1 text-xl" /> Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default App;
