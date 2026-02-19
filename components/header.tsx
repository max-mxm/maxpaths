'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './theme-toggle';
import { NavLink } from './nav-link';
import { SearchTrigger, SearchTriggerMobile } from './search/search-trigger';
import { SearchDialog } from './search/search-dialog';

import { LogoOption3 } from './logo-option-3';

export function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();

  // Global Cmd+K / Ctrl+K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <LogoOption3 />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <NavLink href="/" active={pathname === '/'}>
            Accueil
          </NavLink>
          <NavLink href="/guides" active={pathname.startsWith('/guides')}>
            Guides
          </NavLink>
          <NavLink href="/demos" active={pathname.startsWith('/demos')}>
            Demos
          </NavLink>
          <NavLink href="/blog" active={pathname.startsWith('/blog')}>
            Blog
          </NavLink>
          <NavLink href="/about" active={pathname === '/about'}>
            A propos
          </NavLink>
        </nav>

        {/* Actions: Search + ThemeToggle */}
        <div className="flex items-center gap-3">
          <SearchTrigger onClick={() => setSearchOpen(true)} />
          <SearchTriggerMobile onClick={() => setSearchOpen(true)} />
          <ThemeToggle />
        </div>
      </div>

      {/* Search Dialog */}
      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
