import { FaCar, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-main py-10 text-center text-white">
      <div className="container mx-auto">
        {/* Logo and Title */}
        <div className="flex justify-center items-center gap-3">
          <FaCar className="text-4xl" />
          <p className="text-2xl font-bold">Auto Fusion</p>
        </div>

        {/* Copyright Text */}
        <p className="mt-3 text-sm">
          &copy; {currentYear} Auto Fusion. All rights reserved.
        </p>

        {/* Social Icons */}
        <div className="flex justify-center gap-5 mt-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook className="text-2xl hover:text-blue-500 transition-colors" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter className="text-2xl hover:text-blue-400 transition-colors" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="text-2xl hover:text-pink-500 transition-colors" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
