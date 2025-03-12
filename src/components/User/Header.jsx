// components/Header.js
import { useEffect, useState } from 'react';
import {
  MagnifyingGlassIcon,
  XMarkIcon,
  Bars3Icon,
} from '@heroicons/react/24/outline';
import { NavLink, useLocation } from 'react-router-dom';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState('Trang chủ');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  let lastScrollY = window.scrollY;
  const menus = [
    { name: 'Trang chủ', path: '/' },
    { name: 'Sản phẩm', path: '/san-pham' },
    { name: 'Giới thiệu', path: '/gioi-thieu' },
    { name: 'Liên hệ', path: '/lien-he' },
  ];
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setIsVisible(false); // Ẩn menu khi cuộn xuống
      } else {
        setIsVisible(true); // Hiện menu khi cuộn lên
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Search:', searchQuery);
  };

  return (
    <header
      className={`bg-gray-900 text-white shadow-lg w-full transition-transform duration-300 z-50 fixed top-0 left-0 right-0 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <svg
              className="w-10 h-10 text-yellow-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
              />
            </svg>
            <span className="text-xl font-bold">
              XE NÂNG <span className="text-yellow-500">ĐỨC HÒA</span>
            </span>
          </div>

          {/* Desktop Navigation và Search */}
          <div className="hidden md:flex items-center space-x-8">
            <nav className="hidde md:flex space-x-8">
              {menus.map((menu) => (
                <NavLink
                  key={menu.name}
                  to={menu.path}
                  className={({ isActive }) =>
                    `hover:text-yellow-500 transition-colors ${
                      isActive
                        ? 'text-yellow-500 border-b-2 border-yellow-500'
                        : 'text-yellow-500 '
                    }`
                  }
                >
                  {menu.name}
                </NavLink>
              ))}
            </nav>

            <form onSubmit={handleSearch} className="flex items-center w-64">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Tìm kiếm sản phẩm..."
                  className="w-full px-4 py-2 rounded-l-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute right-0 top-0 mt-2 mr-3 text-gray-500"
                  aria-label="Search"
                >
                  <MagnifyingGlassIcon className="w-5 h-5" />
                </button>
              </div>
              <button
                type="submit"
                className="bg-yellow-500 text-gray-900 px-4 py-2 rounded-r-lg hover:bg-yellow-600 transition-colors"
              >
                Tìm
              </button>
            </form>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-300 hover:text-yellow-500"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="w-8 h-8" />
            ) : (
              <Bars3Icon className="w-8 h-8" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden absolute top-20 left-0 right-0 bg-gray-800 transition-all duration-300 ease-in-out overflow-hidden ${
            isMobileMenuOpen ? 'max-h-96' : 'max-h-0'
          }`}
        >
          <nav className="flex flex-col p-4 space-y-4">
            {menus.map((menu) => (
              <a
                key={menu.name}
                href={menu.path}
                className={`px-4 py-3 rounded-lg ${
                  activeMenu === menu.name
                    ? 'bg-yellow-500 text-gray-900'
                    : 'hover:bg-gray-700'
                }`}
                onClick={() => {
                  setActiveMenu(menu.name);
                  setIsMobileMenuOpen(false);
                }}
              >
                {menu.name}
              </a>
            ))}

            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mt-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  className="w-full px-4 py-3 rounded-lg text-gray-900"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute right-3 top-3 text-gray-500"
                >
                  <MagnifyingGlassIcon className="w-6 h-6" />
                </button>
              </div>
            </form>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
