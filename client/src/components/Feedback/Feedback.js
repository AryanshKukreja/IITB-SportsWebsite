import React, { useState, useEffect, useRef } from 'react';
//import './aquatics.css';
import './Feedback.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://feedbackbackend-mlc8bmyp.b4a.run';

/* ============================================================
   REVEAL
============================================================ */
function Reveal({ as: Tag = 'div', className = '', delay = 0, children, ...rest }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    let done = false;
    const reveal = () => { if (!done) { done = true; setVisible(true); } };
    const reduce = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const fallback = setTimeout(reveal, 1200);
    if (reduce || typeof IntersectionObserver === 'undefined') { reveal(); return () => clearTimeout(fallback); }
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
    <Tag ref={ref} className={`aq-reveal ${visible ? 'is-visible' : ''} ${className}`} style={{ '--d': `${delay}ms` }} {...rest}>
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
   FEEDBACK FORM
============================================================ */
export const Feedback = ({ onSubmit }) => {
  const [name, setName]                       = useState('');
  const [rollNumber, setRollNumber]           = useState('');
  const [person1, setPerson1]                 = useState('');
  const [person2, setPerson2]                 = useState('');
  const [ldapId, setLdapId]                   = useState('');
  const [problemDescription, setProblemDescription] = useState('');
  const [image, setImage]                     = useState(null);
  const [imagePreview, setImagePreview]       = useState(null);
  const [contacts, setContacts]               = useState([]);
  const [loading, setLoading]                 = useState(true);
  const [submitting, setSubmitting]           = useState(false);
  const [errors, setErrors]                   = useState({});
  const [submitted, setSubmitted]             = useState(false);

  const MAX_FILE_SIZE     = 5 * 1024 * 1024;
  const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];

  useEffect(() => {
    let isMounted = true;
    const fetchContacts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/feedback/contacts`);
        if (response.ok) {
          const data = await response.json();
          if (isMounted) setContacts(data.contacts || []);
        } else {
          if (isMounted) setErrors(prev => ({ ...prev, contacts: 'Failed to load contacts' }));
        }
      } catch {
        if (isMounted) setErrors(prev => ({ ...prev, contacts: 'Network error while loading contacts' }));
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchContacts();
    return () => { isMounted = false; };
  }, []);

  const validateForm = () => {
    const e = {};
    if (!name.trim())               e.name               = 'Name is required';
    if (!rollNumber.trim())         e.rollNumber         = 'Roll number is required';
    if (!ldapId.trim())             e.ldapId             = 'LDAP ID is required';
    if (!problemDescription.trim()) e.problemDescription = 'Problem description is required';
    if (!person1)                   e.person1            = 'Please select at least one person to tag';
    if (!image)                     e.image              = 'Please upload an image';
    else {
      if (image.size > MAX_FILE_SIZE)              e.image = 'Image size must be less than 5MB';
      if (!ALLOWED_FILE_TYPES.includes(image.type)) e.image = 'Please upload a valid image file (JPEG, PNG, GIF, WebP)';
    }
    return e;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setErrors(prev => ({ ...prev, image: '' }));
    if (file.size > MAX_FILE_SIZE) {
      setErrors(prev => ({ ...prev, image: 'Image size must be less than 5MB' }));
      e.target.value = '';
      return;
    }
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      setErrors(prev => ({ ...prev, image: 'Please upload a valid image file (JPEG, PNG, GIF, WebP)' }));
      e.target.value = '';
      return;
    }
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({});
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      const firstErrorField = Object.keys(formErrors)[0];
      const errorElement = document.getElementById(firstErrorField === 'person1' ? 'fb-person-1' : firstErrorField);
      errorElement?.focus();
      return;
    }
    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('name', name.trim());
      formData.append('rollNumber', rollNumber.trim());
      formData.append('ldapId', ldapId.trim());
      formData.append('problemDescription', problemDescription.trim());
      const taggedPersons = [person1];
      if (person2) taggedPersons.push(person2);
      formData.append('taggedPersons', JSON.stringify(taggedPersons));
      if (image) formData.append('image', image);

      const response = await fetch(`${API_BASE_URL}/api/feedback/submit`, { method: 'POST', body: formData });
      if (response.ok) {
        const result = await response.json();
        setSubmitted(true);
        setName(''); setRollNumber(''); setLdapId(''); setProblemDescription('');
        setPerson1(''); setPerson2(''); setImage(null); setImagePreview(null); setErrors({});
        const fileInput = document.getElementById('image');
        if (fileInput) fileInput.value = '';
        if (onSubmit) onSubmit(result);
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.error || 'Failed to submit feedback';
        if (errorData.field) setErrors({ [errorData.field]: errorMessage });
        else setErrors({ submit: errorMessage });
      }
    } catch {
      setErrors({ submit: 'Network error. Please check your connection and try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  /* ── Loading state ── */
  if (loading) {
    return (
      <div className="aq-root fb-root-overrides">
        <div className="fb-loading-page">
          <div className="fb-spinner" />
          <span className="fb-loading-label">Loading contacts…</span>
          {errors.contacts && <p className="fb-field-error">{errors.contacts}</p>}
        </div>
      </div>
    );
  }

  /* ── Success state ── */
  if (submitted) {
    return (
      <div className="aq-root fb-root-overrides">
        <div className="aq-app">
          <Reveal as="div" className="fb-success-card">
            <div className="fb-success-icon">✓</div>
            <h2 className="fb-success-title">Feedback submitted.</h2>
            <p className="fb-success-body">
              Your report has been sent to the relevant person(s). The Sports Council will follow up shortly.
            </p>
            <button className="fb-submit-btn" onClick={() => setSubmitted(false)}>
              Submit another
            </button>
          </Reveal>
        </div>
      </div>
    );
  }

  /* ── Main form ── */
  return (
    <div className="aq-root fb-root-overrides">

      {/* MASTHEAD */}
      <Reveal as="header" className="aq-masthead">
        <div className="aq-masthead-mark">
          <span className="aq-crest">S</span>
          <span>IIT Bombay&nbsp;·&nbsp;Sports Council</span>
        </div>
        <div className="aq-masthead-meta">
          <span><strong>Powai</strong>&nbsp;·&nbsp;Mumbai</span>
          <span>Est.&nbsp;<strong>1958</strong></span>
          <span><strong>Until. Victory. Always.</strong></span>
        </div>
      </Reveal>

      <div className="aq-app">

        {/* HERO */}
        <Reveal as="section" className="aq-hero fb-hero">
          <div className="aq-hero-kicker">
            <span className="vol">Sports Council</span>
            <span className="sep">§</span>
            <span>Grievance &amp; Feedback Portal</span>
          </div>
          <div className="fb-hero-body">
            <h1 className="aq-hero-title">
              Feedback<br />
              <span className="italic">Form</span>.
            </h1>
            <p className="aq-hero-lede">
              Report a facility issue, flag a concern, or share feedback directly with the relevant
              Sports Council member. Every submission is reviewed and followed up on.
            </p>
          </div>
        </Reveal>

        <WaveDivider />

        {/* FORM SECTION */}
        <Reveal as="section" className="aq-section">
          <div className="aq-eyebrow">
            <span className="num">§ 01</span>&nbsp;·&nbsp;Submit a Report
            <span className="bar" />
          </div>
          <div className="aq-section-head">
            <h2 className="aq-section-title">
              Your <span className="italic">details</span>.
            </h2>
            <p className="aq-section-sub">All fields marked * are required.</p>
          </div>

          {errors.submit && (
            <div className="fb-banner-error">{errors.submit}</div>
          )}

          <form className="fb-form" onSubmit={handleSubmit} noValidate>

            {/* ── Row 1: Name + Roll ── */}
            <div className="fb-row">
              <div className="fb-field-wrap">
                <label className="fb-label" htmlFor="name">
                  Name <span className="fb-required">*</span>
                </label>
                <input
                  id="name" type="text"
                  className={`fb-input ${errors.name ? 'is-error' : ''}`}
                  value={name} onChange={(e) => setName(e.target.value)}
                  placeholder="Full name" disabled={submitting} required
                />
                {errors.name && <span className="fb-field-error">{errors.name}</span>}
              </div>

              <div className="fb-field-wrap">
                <label className="fb-label" htmlFor="rollNumber">
                  Roll Number <span className="fb-required">*</span>
                </label>
                <input
                  id="rollNumber" type="text"
                  className={`fb-input ${errors.rollNumber ? 'is-error' : ''}`}
                  value={rollNumber} onChange={(e) => setRollNumber(e.target.value)}
                  placeholder="e.g. 22B1234" disabled={submitting} required
                />
                {errors.rollNumber && <span className="fb-field-error">{errors.rollNumber}</span>}
              </div>
            </div>

            {/* ── LDAP ── */}
            <div className="fb-field-wrap">
              <label className="fb-label" htmlFor="ldapId">
                LDAP ID <span className="fb-required">*</span>
              </label>
              <input
                id="ldapId" type="text"
                className={`fb-input ${errors.ldapId ? 'is-error' : ''}`}
                value={ldapId} onChange={(e) => setLdapId(e.target.value)}
                placeholder="your.ldap" disabled={submitting} required
              />
              {errors.ldapId && <span className="fb-field-error">{errors.ldapId}</span>}
            </div>

            {/* ── Problem description ── */}
            <div className="fb-field-wrap">
              <label className="fb-label" htmlFor="problemDescription">
                Problem Description <span className="fb-required">*</span>
              </label>
              <textarea
                id="problemDescription"
                className={`fb-input fb-textarea ${errors.problemDescription ? 'is-error' : ''}`}
                value={problemDescription} onChange={(e) => setProblemDescription(e.target.value)}
                placeholder="Describe the issue in detail…" rows={5}
                disabled={submitting} required
              />
              {errors.problemDescription && <span className="fb-field-error">{errors.problemDescription}</span>}
            </div>

            {/* ── Tag persons ── */}
            <div className="fb-row">
              <div className="fb-field-wrap">
                <label className="fb-label" htmlFor="fb-person-1">
                  Tag Person 1 <span className="fb-required">*</span>
                </label>
                <select
                  id="fb-person-1"
                  className={`fb-input fb-select ${errors.person1 ? 'is-error' : ''}`}
                  value={person1} onChange={(e) => setPerson1(e.target.value)}
                  disabled={submitting} required
                >
                  <option value="">Select a person…</option>
                  {contacts.map((c) => (
                    <option key={c.ldapId} value={c.ldapId}>{c.entityName}</option>
                  ))}
                </select>
                {errors.person1 && <span className="fb-field-error">{errors.person1}</span>}
              </div>

              <div className="fb-field-wrap">
                <label className="fb-label" htmlFor="fb-person-2">
                  Tag Person 2 <span className="fb-optional">(optional)</span>
                </label>
                <select
                  id="fb-person-2"
                  className="fb-input fb-select"
                  value={person2} onChange={(e) => setPerson2(e.target.value)}
                  disabled={submitting}
                >
                  <option value="">Select a person…</option>
                  {contacts.map((c) => (
                    <option key={c.ldapId} value={c.ldapId}>{c.entityName}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* ── Image upload ── */}
            <div className="fb-field-wrap">
              <label className="fb-label" htmlFor="image">
                Upload Image <span className="fb-required">*</span>
              </label>

              <label className={`fb-dropzone ${errors.image ? 'is-error' : ''} ${imagePreview ? 'has-file' : ''}`} htmlFor="image">
                {imagePreview ? (
                  <div className="fb-preview-wrap">
                    <img src={imagePreview} alt="Preview" className="fb-preview-img" />
                    <span className="fb-preview-name">{image?.name}</span>
                  </div>
                ) : (
                  <>
                    <span className="fb-dropzone-icon">↑</span>
                    <span className="fb-dropzone-label">Click to upload an image</span>
                    <span className="fb-dropzone-hint">JPEG, PNG, GIF, WebP · Max 5 MB</span>
                  </>
                )}
                <input
                  id="image" type="file"
                  accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                  onChange={handleImageChange} disabled={submitting}
                  className="fb-file-input" required
                />
              </label>
              {errors.image && <span className="fb-field-error">{errors.image}</span>}
            </div>

            {/* ── Submit ── */}
            <div className="fb-submit-row">
              <button
                type="submit"
                className="fb-submit-btn"
                disabled={submitting || contacts.length === 0}
              >
                {submitting ? (
                  <><span className="fb-spinner-sm" /> Submitting…</>
                ) : (
                  'Submit Feedback →'
                )}
              </button>
            </div>

          </form>
        </Reveal>

        {/* FOOTER */}
        {/* <footer className="aq-footer">
          <span className="aq-footer-colophon"><em>Set in Fraunces &amp; JetBrains Mono.</em></span>
          <span>IIT Bombay · Sports Council</span>
          <span>Until. Victory. Always.</span>
        </footer> */}

      </div>
    </div>
  );
};

export default Feedback;