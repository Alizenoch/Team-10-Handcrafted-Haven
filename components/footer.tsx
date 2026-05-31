import Image from "next/image";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub, FaYoutube, FaEnvelopeOpen } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="hidden md:block bg-gray-text text-white py-4 px-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* LOGO */}
                 <div className="flex gap-4 items-center">
                   <Image
                     src="/images/logo.png"
                     alt="Logo"
                     width={50}
                     height={50}
                     className="rounded-full"
                   />
                   <div>
                     <h1 className="font-bold leading-none text-secondary">Handcrafted</h1>
                     <p className="font-semibold leading-none text-accent">Haven</p>
                   </div>
                 </div>


        <div className="flex items-center gap-4">
          <a href="https://facebook.com/yourusername" className="hover:text-blue-500 transition" title="Facebook">
            <FaFacebook size={20} />
          </a>

          <a href="https://twitter.com/yourusername" className="hover:text-blue-400 transition" title="Twitter">
            <FaTwitter size={20} />
          </a>

          <a href="https://instagram.com/yourusername" className="hover:text-pink-500 transition" title="Instagram">
            <FaInstagram size={20} />
          </a>

          <a href="https://linkedin.com/in/yourusername" className="hover:text-blue-600 transition" title="LinkedIn">
            <FaLinkedin size={20} />
          </a>

          <a href="https://github.com/yourusername" className="hover:text-gray-400 transition" title="GitHub">
            <FaGithub size={20} />
          </a>

          <a href="https://youtube.com/@yourusername" className="hover:text-red-500 transition" title="YouTube">
            <FaYoutube size={20} />
          </a>

          <a href="mailto:your.email@example.com" className="hover:text-orange-500 transition" title="Email">
            <FaEnvelopeOpen size={20} />
          </a>
        </div>
      </div>
      <div className="text-center text-sm mt-4 border-t border-gray-700 pt-4">
        &copy; {new Date().getFullYear()} Handcrafted Haven. All rights reserved.
      </div>
    </footer>
  );
}