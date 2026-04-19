const BottomNav = () => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#faf8f5] border-t border-[#e9e5dd] z-40">
      <div className="flex justify-around py-2">
        <a
          href="#hero"
          className="text-[#1a2e1a] hover:text-[#e66000] p-4 flex flex-col items-center text-sm"
        >
          <svg className="w-5 h-5 mb-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
          Home
        </a>
        <a
          href="#about"
          className="text-[#1a2e1a] hover:text-[#e66000] p-4 flex flex-col items-center text-sm"
        >
          <svg className="w-5 h-5 mb-1" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 005 16v1a2 2 0 002 2h6a2 2 0 002-2v-1a5.986 5.986 0 00-.454-2.084A5 5 0 0012 11z"
              clipRule="evenodd"
            />
          </svg>
          About
        </a>
        <a
          href="#projects"
          className="text-[#1a2e1a] hover:text-[#e66000] p-4 flex flex-col items-center text-sm"
        >
          <svg className="w-5 h-5 mb-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm12 10H4V6h12v8z" />
          </svg>
          Projects
        </a>
        <a
          href="#contact"
          className="text-[#1a2e1a] hover:text-[#e66000] p-4 flex flex-col items-center text-sm"
        >
          <svg className="w-5 h-5 mb-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
          Contact
        </a>
      </div>
    </nav>
  );
};

export default BottomNav;