'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (href: string) => pathname === href;

  const handleAboutClick = (e: React.MouseEvent) => {
    if (pathname === '/') {
      e.preventDefault();
      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactClick = (e: React.MouseEvent) => {
    if (pathname === '/') {
      e.preventDefault();
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navigateWithTransition = (e: React.MouseEvent, href: string) => {
    if (pathname === href) return;
    e.preventDefault();
    const overlay = overlayRef.current;
    if (!overlay) { router.push(href); return; }

    overlay.style.transform = 'scaleY(0)';
    overlay.style.transformOrigin = 'bottom';
    overlay.style.transition = 'none';
    overlay.style.display = 'block';

    requestAnimationFrame(() => {
      overlay.style.transition = 'transform 0.45s cubic-bezier(0.76,0,0.24,1)';
      overlay.style.transformOrigin = 'bottom';
      overlay.style.transform = 'scaleY(1)';

      setTimeout(() => {
        router.push(href);
        setTimeout(() => {
          overlay.style.transformOrigin = 'top';
          overlay.style.transform = 'scaleY(0)';
          setTimeout(() => { overlay.style.display = 'none'; }, 450);
        }, 150);
      }, 420);
    });
  };
const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);
  return (
    <>
      {/* Page transition overlay */}
    {mounted && (
      <div
        ref={overlayRef}
        style={{
          display: 'none',
          position: 'fixed',
          inset: 0,
          background: '#e63020',
          zIndex: 9999,
          transform: 'scaleY(0)',
          transformOrigin: 'bottom',
        }}
      />
    )}

      <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
        <div className="navbar-name">
          <Link href="/" onClick={(e) => navigateWithTransition(e, '/')}>Ishan Mishra</Link>
        </div>
        <div className="navbar-links">
          <Link href="/" onClick={handleAboutClick} className={pathname === '/' ? 'nav-active' : ''}>About</Link>
          <Link href="/projects" onClick={(e) => navigateWithTransition(e, '/projects')} className={isActive('/projects') ? 'nav-active' : ''}>Work</Link>
          <Link href="/problem-solving" onClick={(e) => navigateWithTransition(e, '/problem-solving')} className={isActive('/problem-solving') ? 'nav-active' : ''}>DSA</Link>
          <Link href="/experience" onClick={(e) => navigateWithTransition(e, '/experience')} className={isActive('/experience') ? 'nav-active' : ''}>Experience</Link>
          <a href="https://drive.google.com/file/d/16tZweGQ90i6SOFW--B2KXq9t0DWmD53N/view?usp=drivesdk" target="_blank" rel="noreferrer" className="nav-resume">Resume ↗</a>
        </div>
      </nav>
    </>
  );
}
