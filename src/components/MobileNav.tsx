import { useState } from 'react';

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="md:hidden fixed top-0 left-0 right-0 bg-[#faf8f5] z-40 border-b border-[#e9e5dd]">
      <div className="container flex items-center justify-between p-4">
        <h1 className="text-2xl font-bold text-[#1a2e1a] font-serif">Portfolio Pro</h1>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-[#1a2e1a] focus:outline-none focus:ring-2 focus:ring-[#e66000] p-2 rounded"
          aria-expanded={isOpen}
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      {isOpen && (
        <div className="bg-[#faf8f5] px-4 pb-4 shadow-lg">
          <ul className="flex flex-col space-y-4">
            <li>
              <a
                href="#hero"
                className="block py-2 text-[#1a2e1a] hover:text-[#e66000] transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="block py-2 text-[#1a2e1a] hover:text-[#e66000] transition-colors"
                onClick={() => setIsOpen(false)}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#projects"
                className="block py-2 text-[#1a2e1a] hover:text-[#e66000] transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Projects
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="block py-2 text-[#1a2e1a] hover:text-[#e66000] transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default MobileNav;