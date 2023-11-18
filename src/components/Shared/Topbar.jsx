"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getUserByUsername } from "@/api/user";

const Topbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUserByUsername().then((res) => {
      if (res) {
        setUsers(res);
      }
    });
    const userLoggedIn = localStorage.getItem("access_token");
    setIsLoggedIn(userLoggedIn);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setShowDropdown(false);
  };

  const toggleDropdown = () => {
    setShowDropdown((prevState) => !prevState);
  };

  const profileImage = isLoggedIn ? users.profilepicture : "/assets/user.svg";

  return (
    <nav className="topbar">
      <Link href="/" className="flex items-center gap-3">
        <Image src="/logo.png" alt="logo" width={42} height={42} />
        <p className="font-dosis text-heading3-bold text-light-1 max-xs:hidden">Captiverse</p>
      </Link>

      <div className="flex items-center gap-1">
        <div className="relative" onClick={toggleDropdown}>
          <img src={profileImage} alt="profile" className="h-10 w-10 rounded-full cursor-pointer" />
          {showDropdown && (
            <div className="absolute top-10 right-0 bg-white border rounded-md shadow-md p-2">
              {isLoggedIn ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setShowDropdown(false);
                  }}
                  className="font-dosis text-dark-1"
                >
                  Logout
                </button>
              ) : (
                <Link href="/sign-in">
                  <button onClick={() => setShowDropdown(false)} className="font-dosis text-dark-1">
                    Login
                  </button>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Topbar;
