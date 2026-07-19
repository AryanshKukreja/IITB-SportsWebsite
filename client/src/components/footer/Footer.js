import React, { useState, useEffect, useRef } from 'react';
import './Footer.css';
import { FaLinkedin, FaInstagram, FaFacebook } from 'react-icons/fa';

/* ============================================================
   REVEAL — scroll-triggered entrance, with a hard fallback so
   nothing can ever get stuck invisible.
============================================================ */
function Reveal({ as: Tag = 'div', className = '', delay = 0, children, ...rest }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    let done = false;
    const reveal = () => {
      if (!done) {
        done = true;
        setVisible(true);
      }
    };

    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const fallback = setTimeout(reveal, 1200);

    if (reduce || typeof IntersectionObserver === 'undefined') {
      reveal();
      return () => clearTimeout(fallback);
    }

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      reveal();
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal();
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -5% 0px' }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  return (
    <Tag
      ref={ref}
      className={`ft-reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={{ '--d': `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

const Footer = () => {
  return (
    // <div>
    //     <ul className='socialicon'>
    //       <li><a href='#' className='mediaicon'><FaLinkedin /></a></li>
    //       <li><a href='#'><FaInstagram /></a></li>
    //       <li><a href='#'><FaFacebook /></a></li>
    //       <li><a href='#'></a></li>
    //       <li><a href='#'></a></li>
    //     </ul>
    // </div>
    <Reveal as="footer" className="ft-root">
      <div className="ft-top">
        <div className="ft-brand">
          <span className="ft-crest">S</span>
          <span>IIT Bombay Sports</span>
        </div>

        <div className="ft-col">
          <span className="ft-col-label">Quick Links</span>
          <ul className="ft-list">
            <li><a href="/sports">Home</a></li>
            <li><a href="/sports/contact">Contact</a></li>
          </ul>
        </div>

        <div className="ft-col">
          <span className="ft-col-label">Follow Us</span>
          <ul className="ft-social">
            <li>
              <a href="https://www.linkedin.com/company/iit-bombay-sports?originalSubdomain=in" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <FaLinkedin />
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/iitbombaysports/?hl=en" target="_blank" rel="noreferrer" aria-label="Instagram">
                <FaInstagram />
              </a>
            </li>
            <li>
              <a href="https://www.facebook.com/iitbombaysports/" target="_blank" rel="noreferrer" aria-label="Facebook">
                <FaFacebook />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="ft-bottom">
        <p>Copyright &copy; 2025 IIT Bombay Sports</p>
      </div>
    </Reveal>
  );
};

export default Footer;