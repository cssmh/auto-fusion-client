import logo from "../assets/bg.png";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="bg-main mt-[6rem]">
      <footer className="footer footer-center p-10 text-primary-content">
        <aside>
          <img
            src={logo}
            className="w-32 md:w-64"
            alt="Auto Fusion Logo"
          />
          <p className="font-bold text-xl text-white mt-5">Auto Fusion</p>
          <p className="font-semibold text-[14px] text-white">
            Copyright © {currentYear} - All rights reserved
          </p>
          {/* Social Media Links */}
          <div className="flex gap-4 mt-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FaFacebook className="text-white text-2xl hover:text-blue-500 transition-colors" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <FaTwitter className="text-white text-2xl hover:text-blue-400 transition-colors" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram className="text-white text-2xl hover:text-pink-500 transition-colors" />
            </a>
          </div>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
