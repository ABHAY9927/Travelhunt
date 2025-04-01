import {
  Avatar,
  Button,
  DarkThemeToggle,
  Dropdown,
  Flowbite,
  Navbar,
} from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Image from "../../logo.png";
import "../NavBar/nav.css";
import { useLocation } from "react-router-dom/dist/umd/react-router-dom.development";
import axios from "axios";

function NavBar() {
  const [loggedIn, setLoginStatus] = useState("");
  const [userdata, setUserData] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (localStorage.getItem("access_token") !== null) {
      (async () => {
        try {
          await axios
            .get("http://localhost:8000/api/login", {
              headers: { "Content-Type": "application/json" },
            })
            .then((res) => {
              setUserData(res.data);
            });
          setLoginStatus(true);
        } catch {
          console.log("Unauthorized");
          setLoginStatus(false);
        }
      })();
    } else {
      setLoginStatus(false);
    }
  }, []);

  const navigateToLogin = () => {
    navigate("/login");
  };

  const navigateTosignup = () => {
    navigate("/signup");
  };

  // const [authstate, setAuthState] = useState(true);

  const CustomFlowbiteTheme = {
    nav: {
      color: {
        primary: "bg-green-500 hover:bg-green-200",
      },
    },
  };
  return (
    <Flowbite theme={{ theme: CustomFlowbiteTheme }}>
      <Navbar
        fluid
        className="bg-white bg-opacity-10 backdrop-blur-lg dark:bg-slate-800 navcolor shadow-xl fixed top-0"
      >
        <Navbar.Brand as={Link} href="/">
          <img
            src={Image}
            className="mr-3 sm:h-9 h-px mt-3"
            alt="Flowbite React Logo"
            style={{ height: "auto", width: "150px" }}
          />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Navbar.Link href="/" active className="text-blue-900">
            Home
          </Navbar.Link>
          {loggedIn ? (
            <Navbar.Link href="/planner" active className="text-blue-900">
              TripPlanner
            </Navbar.Link>
            

          ) : (
            ""
          )}

          {loggedIn ? (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  alt="User settings"
                  img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                  rounded
                />
              }
            >
              <Dropdown.Header>
                {/* <span className="block text-sm">{userdata["name"]}</span>
                <span className="block truncate text-sm font-medium">
                  {userdata["email"]}
                </span> */}
              </Dropdown.Header>
              <Dropdown.Item>
                <a href="/profile">Profile</a>
              </Dropdown.Item>

              <Dropdown.Divider />
              <Dropdown.Item className="text-white bg-red-400">
                <a href="/logout">Sign out</a>
              </Dropdown.Item>
            </Dropdown>
          ) : (
            <div className="flex flex-wrap gap-2 border-s-2 px-3 border-blue-300">
              <Button
                className="border-0 text-white bg-slate-800 font-bold"
                onClick={navigateToLogin}
                pill
              >
                Login
              </Button>
              <Button
                className="bg-sky-950 text-white border-0"
                onClick={navigateTosignup}
                pill
              >
                Register
              </Button>
            </div>
          )}
          <DarkThemeToggle />
        </Navbar.Collapse>
      </Navbar>
    </Flowbite>
  );
}

export default NavBar;
