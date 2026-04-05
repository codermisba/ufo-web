import { motion } from "framer-motion";
import { Telescope, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Gallery", path: "/gallery" },
    { name: "Creator", path: "/creator" },
    { name: "Report", path: "/report" },
  ];

  return (
    <nav className="glass fixed w-full z-50 top-0 left-0 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <Telescope className="text-neon-blue w-8 h-8 lg:w-10 lg:h-10 drop-shadow-[0_0_8px_rgba(0,243,255,0.8)] shrink-0" />
              <span className="neon-text-blue font-bold text-sm sm:text-base lg:text-xl uppercase tracking-wider truncate max-w-[200px] sm:max-w-[400px] lg:max-w-full">
                <span className="hidden sm:inline">Interactive UFO Intelligence Platform</span>
                <span className="sm:hidden">UFO Insight India</span>
              </span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              {links.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md font-medium transition-colors hover:shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none"
            >
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden glass"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
