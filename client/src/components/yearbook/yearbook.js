import React, { useState, useEffect, useRef } from "react";
import { PiCornersOut, PiCornersIn } from "react-icons/pi";
//import "./aquatics.css";
import "./yearbook.css";

/* ============================================================
   REVEAL — same as homepage / aquatics
============================================================ */
function Reveal({ as: Tag = 'div', className = '', delay = 0, children, ...rest }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    let done = false;
    const reveal = () => { if (!done) { done = true; setVisible(true); } };
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const fallback = setTimeout(reveal, 1200);
    if (reduce || typeof IntersectionObserver === 'undefined') {
      reveal();
      return () => clearTimeout(fallback);
    }
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) reveal();
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { reveal(); io.unobserve(e.target); } }),
      { threshold: 0.05, rootMargin: '0px 0px -5% 0px' }
    );
    io.observe(el);
    return () => { io.disconnect(); clearTimeout(fallback); };
  }, []);

  return (
    <Tag
      ref={ref}
      className={`aq-reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={{ '--d': `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* ============================================================
   WAVE DIVIDER
============================================================ */
function WaveDivider() {
  return (
    <div className="aq-wave" aria-hidden="true">
      <svg viewBox="0 0 1200 40" preserveAspectRatio="none">
        <path className="aq-wave-path aq-wave-path-1"
          d="M0 20 Q 100 0 200 20 T 400 20 T 600 20 T 800 20 T 1000 20 T 1200 20 V40 H0 Z" />
        <path className="aq-wave-path aq-wave-path-2"
          d="M0 26 Q 100 6 200 26 T 400 26 T 600 26 T 800 26 T 1000 26 T 1200 26 V40 H0 Z" />
      </svg>
    </div>
  );
}

/* ============================================================
   YEARBOOK
============================================================ */
const Yearbook = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoaded, setIsLoaded]         = useState(false);
  const pdfUrl = `${process.env.PUBLIC_URL}/yearbook.pdf`;

  const toggleFullscreen = () => setIsFullscreen((f) => !f);

  /* lock body scroll in fullscreen */
  useEffect(() => {
    document.body.style.overflow = isFullscreen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isFullscreen]);

  /* ── FULLSCREEN OVERLAY ── */
  if (isFullscreen) {
    return (
      <div className="yb-fs-overlay">
        <button className="yb-fs-close" onClick={toggleFullscreen} aria-label="Exit fullscreen">
          <PiCornersIn size={20} />
          <span>Exit Fullscreen</span>
        </button>
        <iframe
          src={pdfUrl}
          title="Sports Yearbook 2024-25"
          className="yb-fs-iframe"
          onLoad={() => setIsLoaded(true)}
        >
          <p>Your browser does not support PDFs. <a href={pdfUrl}>Download the PDF</a>.</p>
        </iframe>
      </div>
    );
  }

  /* ── NORMAL VIEW ── */
  return (
    <div className="aq-root yb-root-overrides">

      {/* MASTHEAD */}
      <Reveal as="header" className="aq-masthead">
        <div className="aq-masthead-mark">
          <span className="aq-crest">S</span>
          <span>Institute Sports Council&nbsp;·&nbsp;Sports Yearbook</span>
        </div>
        <div className="aq-masthead-meta">
          {/* <span><strong>Powai</strong>&nbsp;·&nbsp;Mumbai</span>
          <span>Est.&nbsp;<strong>1958</strong></span> */}
          <span><strong>Until. Victory. Always.</strong></span>
        </div>
      </Reveal>

      <div className="aq-app">

        {/* HERO */}
        <Reveal as="section" className="aq-hero yb-hero">
          <div className="aq-hero-kicker">
            <span className="vol">Annual Publication</span>
            <span className="sep">§</span>
            <span>Academic Year 2024–25</span>
          </div>

          <div className="aq-hero-grid yb-hero-grid">
            <div>
              <h1 className="aq-hero-title">
                Sports
                <br />
                <span className="italic">Yearbook</span>.
              </h1>
              <p className="aq-hero-lede">
                A year in sport — every triumph, every milestone, every team that gave everything
                on the field. The IIT Bombay Sports Yearbook 2024–25 is a record of the athletes,
                coaches, and moments that defined this season. Browse the full edition below.
              </p>
            </div>

            <aside className="aq-hero-stats">
              <div className="aq-hero-stat">
                <span className="k">Edition</span>
                <span className="v"><em>2025</em>–26</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Published by</span>
                <span className="v" style={{ fontSize: '1.2rem', lineHeight: 1.3 }}>Institute Sports<em> Council</em></span>
              </div>
              {/* <div className="aq-hero-stat">
                <span className="k">Format</span>
                <span className="v" style={{ fontSize: '1.4rem' }}>PDF</span>
                <span className="c">Interactive</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Access</span>
                <span className="v" style={{ fontSize: '1.4rem' }}>Free</span>
                <span className="c">Open to all</span>
              </div> */}
            </aside>
          </div>
        </Reveal>

        <WaveDivider />

        {/* PDF VIEWER SECTION */}
        <Reveal as="section" className="aq-section">
          <div className="aq-eyebrow">
            <span className="num">§ 01</span>&nbsp;·&nbsp;Full Edition
            <span className="bar" />
          </div>
          <div className="aq-section-head">
            <h2 className="aq-section-title">
              Read the <span className="italic">Yearbook</span>.
            </h2>
            <p className="aq-section-sub">Scroll · Zoom · Fullscreen</p>
          </div>

          {/* Viewer card */}
          <div className="yb-viewer-card">

            {/* Toolbar */}
            <div className="yb-toolbar">
              <div className="yb-toolbar-left">
                <span className="yb-toolbar-label">Sports Yearbook 2024–25</span>
                <span className="yb-toolbar-sep">·</span>
                <span className="yb-toolbar-meta">IIT Bombay Sports Council</span>
              </div>
              <div className="yb-toolbar-right">
                <a href={pdfUrl} download className="yb-tool-btn" aria-label="Download PDF">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M8 1v9m0 0L5 7m3 3l3-3M2 13h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Download</span>
                </a>
                <button className="yb-tool-btn" onClick={toggleFullscreen} aria-label="Fullscreen">
                  <PiCornersOut size={14} />
                  <span>Fullscreen</span>
                </button>
              </div>
            </div>

            {/* iframe wrapper */}
            <div className="yb-iframe-wrap">
              {!isLoaded && (
                <div className="yb-loading">
                  <div className="yb-spinner" />
                  <span className="yb-loading-label">Loading yearbook…</span>
                </div>
              )}
              <iframe
                src={pdfUrl}
                title="Sports Yearbook 2024-25"
                className={`yb-iframe ${isLoaded ? 'is-loaded' : ''}`}
                onLoad={() => setIsLoaded(true)}
              >
                <p>Your browser does not support PDFs.{' '}
                  <a href={pdfUrl}>Download the PDF</a>.
                </p>
              </iframe>
            </div>

            {/* Footer bar */}
            <div className="yb-viewer-foot">
              <span>IIT Bombay · Sports Council · 2024–25</span>
              <a href={pdfUrl} download className="yb-dl-link">
                ↓ &nbsp;Download PDF
              </a>
            </div>
          </div>
        </Reveal>

        {/* FOOTER */}
        {/* <footer className="aq-footer">
          <span className="aq-footer-colophon">
            <em>Set in Fraunces &amp; JetBrains Mono.</em>
          </span>
          <span>IIT Bombay · Sports Council</span>
          <span>Until. Victory. Always.</span>
        </footer> */}

      </div>
    </div>
  );
};

export default Yearbook;