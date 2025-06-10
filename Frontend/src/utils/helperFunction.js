import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export function getCookieData(cookieData) {
  const cookies = cookieData.split("; ");
  const cookieObject = {};
  for (const cookie of cookies) {
    const [key, value] = cookie.split("=");
    cookieObject[key] = value;
  }
  return cookieObject;
}

export function handleLogout() {
  document.cookie.split(";").forEach((cookie) => {
    const trimmedCookie = cookie.trim();
    const name = trimmedCookie.split("=")[0];
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  });
  toast.success("logout successfully");
}

export function useDeviceType() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768); // Customize breakpoint
    };

    checkScreenSize(); // Initial check
    window.addEventListener("resize", checkScreenSize); // Listen for screen resize

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return isMobile;
}
