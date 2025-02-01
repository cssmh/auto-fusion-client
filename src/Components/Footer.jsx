import AOS from "aos";
import "aos/dist/aos.css";
import logo from "../assets/bg.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  AOS.init({
    offset: 120,
    duration: 1200,
    easing: "ease",
    delay: 50,
  });
  return (
    <div className="bg-main mt-[6rem]">
      <footer className="footer footer-center p-10 text-primary-content">
        <aside>
          <img
            src={logo}
            className="w-32 md:w-64"
            alt=""
            data-aos="zoom-in"
            data-aos-mirror="true"
            data-aos-once="false"
            data-aos-anchor-placement="top-bottom"
          />
          <p className="font-bold text-xl text-white mt-5">Auto Fusion</p>
          <p className="font-semibold text-[14px] text-white">
            Copyright © {currentYear} - All right reserved
          </p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
