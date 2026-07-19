import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Resets the window scroll position to the top on every route change.
 * Mount this once, inside your <BrowserRouter> (or equivalent Router),
 * as a sibling to your <Routes> — it renders nothing itself.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}