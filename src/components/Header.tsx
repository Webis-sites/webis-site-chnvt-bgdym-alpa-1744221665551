'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiShoppingCart, FiUser, FiMenu, FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

interface NavItem {
  id: string;
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { id: 'home', label: 'דף הבית', href: '/' },
  { id: 'men', label: 'גברים', href: '/men' },
  { id: 'women', label: 'נשים', href: '/women' },
  { id: 'kids', label: 'ילדים', href: '/kids' },
  { id: 'sale', label: 'מבצעים', href: '/sale' },
  { id: 'new', label: 'חדש', href: '/new' },
];

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    // Prevent body scroll when menu is open
    document.body.style.overflow = !isOpen ? 'hidden' : 'auto';
  };

  // Glassmorphism and neumorphic styles
  const headerClasses = clsx(
    'sticky top-0 w-full z-50 transition-all duration-300 rtl',
    'backdrop-blur-md',
    isScrolled 
      ? 'py-2 bg-white/80 shadow-md' 
      : 'py-4 bg-white/60'
  );

  const logoClasses = clsx(
    'text-2xl font-bold transition-all',
    'bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent',
    isScrolled ? 'text-xl' : 'text-2xl'
  );

  const navButtonClasses = clsx(
    'p-2 rounded-xl transition-all',
    'bg-white/80 hover:bg-white',
    'shadow-neumorphic hover:shadow-neumorphic-pressed',
    'text-gray-700 hover:text-primary',
    'focus:outline-none focus:ring-2 focus:ring-primary/50'
  );

  const mobileMenuVariants = {
    closed: { 
      opacity: 0,
      x: '100%',
      transition: { duration: 0.3 }
    },
    open: { 
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="z-10">
            <h1 className={logoClasses}>חנות בגדים אלפא</h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 space-x-reverse">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.href}
                className={clsx(
                  'px-4 py-2 mx-1 rounded-xl text-sm font-medium transition-all',
                  'hover:bg-white/90 hover:shadow-neumorphic',
                  activeItem === item.id
                    ? 'bg-white text-primary shadow-neumorphic-pressed'
                    : 'text-gray-700'
                )}
                onClick={() => setActiveItem(item.id)}
                aria-current={activeItem === item.id ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2 space-x-reverse">
            <button 
              className={navButtonClasses}
              aria-label="חיפוש"
            >
              <FiSearch className="w-5 h-5" />
            </button>
            
            <Link 
              to="/cart" 
              className={clsx(navButtonClasses, 'relative')}
              aria-label="עגלת קניות"
            >
              <FiShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                3
              </span>
            </Link>
            
            <Link 
              to="/account" 
              className={navButtonClasses}
              aria-label="החשבון שלי"
            >
              <FiUser className="w-5 h-5" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              className={clsx(
                navButtonClasses,
                'md:hidden',
                isOpen && 'bg-white shadow-neumorphic-pressed'
              )}
              onClick={toggleMenu}
              aria-expanded={isOpen}
              aria-label={isOpen ? 'סגור תפריט' : 'פתח תפריט'}
            >
              {isOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            className="fixed inset-0 top-[72px] bg-white/95 backdrop-blur-lg md:hidden z-40 overflow-y-auto"
          >
            <div className="container mx-auto px-4 py-6">
              <nav className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * navItems.indexOf(item) }}
                  >
                    <Link
                      to={item.href}
                      className={clsx(
                        'block py-3 px-4 rounded-2xl text-lg font-medium text-center transition-all',
                        'bg-white/70 backdrop-blur-sm',
                        'border border-white/20',
                        'shadow-neumorphic',
                        activeItem === item.id
                          ? 'text-primary shadow-neumorphic-pressed'
                          : 'text-gray-700'
                      )}
                      onClick={() => {
                        setActiveItem(item.id);
                        toggleMenu();
                      }}
                      aria-current={activeItem === item.id ? 'page' : undefined}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;