import React, { useState, useEffect, useRef, useCallback } from 'react';
import './aquatics.css';
import Timel from './timeline';
import p1 from '../assets/p1.jpeg';
import p2 from '../assets/p2.jpg';
import p3 from '../assets/p3.jpg';
import p4 from '../assets/p4.jpg';
import p5 from '../assets/p5.JPG';
import p6 from '../assets/p6.JPG';
import pool3 from '../assets/pool3.jpeg';
import pool4 from '../assets/pool4.jpeg';
import user from '../assets/user.jpg';

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
      className={`aq-reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={{ '--d': `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* ============================================================
   COUNT-UP — animated stat numbers
============================================================ */
function useCountUp(target, durationMs = 900) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let raf;
    let start;
    let cancelled = false;
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setValue(target);
      return undefined;
    }
    const tick = (t) => {
      if (cancelled) return;
      if (start === undefined) start = t;
      const p = Math.min((t - start) / durationMs, 1);
      setValue(Math.round(p * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [target, durationMs]);
  return value;
}

/* ============================================================
   WAVE DIVIDER — the recurring water-ripple signature motif
============================================================ */
function WaveDivider() {
  return (
    <div className="aq-wave" aria-hidden="true">
      <svg viewBox="0 0 1200 40" preserveAspectRatio="none">
        <path
          className="aq-wave-path aq-wave-path-1"
          d="M0 20 Q 100 0 200 20 T 400 20 T 600 20 T 800 20 T 1000 20 T 1200 20 V40 H0 Z"
        />
        <path
          className="aq-wave-path aq-wave-path-2"
          d="M0 26 Q 100 6 200 26 T 400 26 T 600 26 T 800 26 T 1000 26 T 1200 26 V40 H0 Z"
        />
      </svg>
    </div>
  );
}

/* ============================================================
   PHOTO BREAK — full-bleed pause between sections
============================================================ */
function PhotoBreak({ image, caption, tag }) {
  return (
    <Reveal as="div" className="aq-photobreak">
      <img src={image} alt={caption} className="aq-photobreak-img" />
      <div className="aq-photobreak-caption">
        <span>{tag}</span>
        <span>{caption}</span>
      </div>
    </Reveal>
  );
}

/* ============================================================
   DATA
============================================================ */
const facilities = [
  {
    title: 'Swimming Pool',
    image: pool3,
    bullets: [
      'A 50m x 25m swimming pool with all the modern facilities.',
      'Kickboards, flippers, pull buoys and pedals are available for members.',
      'Regular camps for beginners and intermediate swimmers run throughout the year.',
    ],
  },
  {
    title: 'Baby Pool',
    image: pool4,
    bullets: [
      'A 15m x 10m pool for leisure and for those learning to swim.',
      "We're planning to expand it to 25m x 10m to meet growing demand.",
    ],
  },
  {
    title: 'Water Polo',
    image: p1,
    bullets: ['All the necessary equipment for water polo training is available on site.'],
  },
  {
    title: 'Gym',
    image: p2,
    bullets: [
      'A multi-station gym with dumbbells and free rods.',
      'Members can warm up and strengthen before getting in the water.',
    ],
  },
];

/* Rule categories — same facts as before, restructured into scannable
   cards with a short headline per rule. Swap in real photography per
   category via the `image` field whenever you have it. */
const ruleCategories = [
  {
    key: 'info',
    label: 'Info',
    items: [
      {
        head: 'Slot Authority',
        body: 'Gymkhana/Coach can use any slot for student camps, inter-hostel meets, Inter IIT camps, or any program approved by Chairman (Sports)/Dean (SA).',
      },
      {
        head: 'Off-Season Flexibility',
        body: 'Slots are strictly enforced during summer. At other times, if fewer than 30 swimmers are in the big pool, ladies slots may be shared.',
      },
      {
        head: 'Reaching the Swimming Pool',
        body: 'The pool is located just opposite Hostel 2, beside the Indoor SAC.',
      },
      {
        head: 'Making the Membership Card',
        body: 'A membership card is a must for swimming at the pool. Biometric entry-exit is coming soon.',
      },
      {
        head: 'Getting Your Swimming Pool Card',
        steps: [
          "Take a green form from the swimming pool counter/office, 5:00 PM to 8:00 PM.",
          'One passport photo for the form, one more for the card.',
          "Get the form signed and stamped by the General Physician at IIT Hospital — you'll be checked for chlorine sensitivity, skin issues, ear infections etc.",
          'Submit the form to the Swimming Pool office with 2 passport photos.',
          'Processing takes a day or two — collect your card from the pool office after that.',
          'The Swimming Pool office is to your right after you enter.',
        ],
      },
    ],
  },
  {
    key: 'general',
    label: 'General Rules',
    items: [
      { head: 'Card Required', body: 'Swimming is prohibited without a membership card.' },
      { head: 'Non-Transferable', body: 'The membership card is not transferable — violating this cancels membership.' },
      { head: 'Log Your Entry', body: 'Make an entry in the register and keep your card in the glass board.' },
      { head: 'Ladies Slot', body: 'No male member is permitted during the ladies slot; female members may use general slots any time.' },
      { head: "Don't Distract Lifeguards", body: "Members shouldn't move around the pool deck or distract lifeguards during pool hours." },
      { head: 'Viewers in Gallery', body: 'All viewers should remain in the gallery only.' },
      { head: 'Shared Lanes', body: 'No member may use a separate lane during general slots.' },
      { head: 'Slot Priority', body: 'Student Gymkhana/coach can use any slot for camps, inter-hostel meets, or committee-approved activity.' },
    ],
  },
  {
    key: 'safety',
    label: 'Safety Rules',
    items: [
      { head: 'Lifeguard Required', body: 'Swimming is strictly prohibited in the absence of a lifeguard.' },
      { head: 'No Solo Swimming', body: 'Swimming or diving cannot be done alone.' },
      { head: 'Beginners & Kids', body: 'Beginners stay at the shallow end and wear a red cap. Under-12s must be accompanied by a parent.' },
      { head: 'Diving Rules', body: 'Diving only in the presence of a coach or lifeguard, with the diving area clear of swimmers.' },
      { head: 'No Food or Smoking', body: 'Drinking, smoking and eating is prohibited in the pool and the paved area around it.' },
      { head: 'No Horseplay', body: "Never push anyone into the pool — horseplay isn't permitted, and never swim beyond your capacity." },
      { head: 'Photography Permission', body: 'Photography in the pool premises needs prior permission.' },
      { head: 'No Metal Objects', body: 'Never swim with metallic objects like rings, watches, or neck chains.' },
      { head: 'Leave Valuables Home', body: "The club/gymkhana isn't responsible for lost belongings — don't bring valuables." },
      { head: "Lifeguards Don't Train", body: "Lifeguards can't teach or train members during general slots — approaching them to do so risks accidents." },
      { head: 'Zero Tolerance', body: 'Violating any of these rules cancels your membership.' },
    ],
  },
  {
    key: 'guest',
    label: 'Guest Rules',
    items: [
      { head: 'Guest Fee', body: 'Guest charges are Rs 20/- per dip, for Institute Staff only.' },
      { head: 'Peak Hour Limit', body: 'No guests during peak hours once 30 or more members are in the pool.' },
      { head: 'Not a Regular', body: 'A guest cannot be a regular visitor to the pool.' },
      { head: 'Primary Members Only', body: 'Only the primary member may bring a guest — dependents/school children cannot.' },
      { head: 'Weekly Limit', body: 'Guests are allowed once or twice a week.' },
      { head: 'Paperwork', body: 'Fill the guest form each time, and log entry in both the guest book and the main entry book.' },
      { head: 'Always Accompanied', body: 'The guest must always be accompanied by the primary member.' },
    ],
  },
  {
    key: 'hygiene',
    label: 'Hygiene Rules',
    items: [
      { head: 'Proper Swimwear', body: 'Costumes are mandatory — non-transparent and not white in colour.' },
      { head: 'Cap for Long Hair', body: 'Anyone with long hair must wear a cap, tied securely before entering.' },
      { head: 'Health Check', body: 'No entry with open cuts, wounds, eye infections, or communicable disease.' },
      { head: 'Sober Only', body: "Anyone under the influence of alcohol, drugs, or other intoxicants can't enter the pool premises." },
      { head: 'Cloak Room', body: "Leave possessions and footwear in the cloak room — the club isn't responsible for losses." },
      { head: 'Shower First', body: 'Shower and rinse thoroughly before entering; use soap to remove oils from hair or skin.' },
      { head: 'Keep it Clean', body: 'Use the scum gutter for spitting or blowing — keep the pool clean and respect other users.' },
    ],
  },
];

const eventImages = [p3, p4, p5, p6, p1, p2];

const cards = [
  {
    title: 'Camps',
    content:
      'Every summer, by popular demand, our coach, Ritesh Guchhait, holds camps in swimming at the beginners, intermediate and advanced levels. Camps are also held for IIT students during the semester.The beginners camps are held separately for children, ladies, students and staff. The duration is normally 15-20 days, and there is a demonstration for parents and families on the last day, when certificates are handed out. There are also intermediate camps for students looking to train in strokes such as breaststroke, butterfly and backstroke.',
  },
  {
    title: 'NSO',
    content:
      'The Government of India, through its National Sports Organization, provides a scheme in all IITs, where all incoming, i.e. first year students, must sign up for a particular sport, and undergo training. This scheme, popularly called NSO, is available to IIT students for training in various sports, such as swimming, hockey, basketball, squash, badminton, tennis, athletics, table tennis, football etc. Swimming, is a much sought after option, and since the number of students that can be accommodated in a given sport is limited, it is not surprising to see students, at the beginning of every academic year, crowding around the coach at the poolside, to give their trials and try to get in. What is extremely encouraging, is that students often develop a new interest in swimming, and continue to attend advanced coaching throughout the year, all through their college life, and not just the first year. The NSO swim training functions two evenings a week.',
  },
  {
    title: 'Swimmathon',
    content:
      'Swimathon is the largest Event organised by IIT Bombay Swimming Club and is held annually during the end of Spring season. Swimathon started in 1989 and has a duration of 6 hours. Its open to everyone on campus, and one can see hoards of IIT students participating quite happily along with kids, professors and middle-aged ladies. Over the years, Swimathon has grown exponentially and now attracts 100+ participants every year.',
  },
  {
    title: 'Swimming GC',
    content:
      "Every year we have an Inter hostel swimming competition - The Swimming General Championship, with assorted supporters crying themselves hoarse in support of their hostel mates, irrespective of the level of swimming. It's an ideal platform to flaunt your swimming skills and make your hostel proud! With no restrictions on participation, the swimming pool is the place to be during the days of the swimming GC.",
  },
  {
    title: 'Triathlon GC',
    content:
      'The IIT Swimming club holds triathlon competition every year. This tri sport of event includes swimming, cycling, and running. The event is organized in two categories: Team Triathlon- Team of 3 (at least one female member) & Individual Triathlon.',
  },
  {
    title: 'Waterpolo GC',
    content:
      'Every year we have an inter hostel water polo general championship where all the hostels battle to prove their supremacy in the sport. The GC is organized according to the rules of FINA. ',
  },
];

const galleryImages = [p1, p2, p3, p4, p5, pool4, p6];

/* ============================================================
   MAIN COMPONENT
============================================================ */
const Aquatics = () => {
  const [expandedCard, setExpandedCard] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDir, setSlideDir] = useState('next');
  const [activeCategory, setActiveCategory] = useState('general');
  const timelineWrapRef = useRef(null);
  const [timelineVisible, setTimelineVisible] = useState(false);

  const toggleContent = (cardIndex) => {
    setExpandedCard((prev) => (prev === cardIndex ? null : cardIndex));
  };

  const handlePrev = useCallback(() => {
    setSlideDir('prev');
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? galleryImages.length - 1 : prevIndex - 1));
  }, []);

  const handleNext = useCallback(() => {
    setSlideDir('next');
    setCurrentIndex((prevIndex) => (prevIndex === galleryImages.length - 1 ? 0 : prevIndex + 1));
  }, []);

  useEffect(() => {
    const el = timelineWrapRef.current;
    if (!el) return undefined;

    let done = false;
    const reveal = () => {
      if (!done) {
        done = true;
        setTimelineVisible(true);
      }
    };

    const fallback = setTimeout(reveal, 1200);

    if (typeof IntersectionObserver === 'undefined') {
      reveal();
      return () => clearTimeout(fallback);
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
      { threshold: 0.05 }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  const coachCount = useCountUp(2, 800);
  const fixtureCount = useCountUp(cards.length, 800);

  const activeItems = ruleCategories.find((c) => c.key === activeCategory)?.items || [];

  return (
    <div className="aq-root">
      {/* MASTHEAD */}
      <Reveal as="header" className="aq-masthead">
        <div className="aq-masthead-mark">
          <span className="aq-crest">A</span>
          <span>IIT Bombay Aquatics&nbsp;/&nbsp;The Pool Report</span>
        </div>
        <div className="aq-masthead-meta">
          <span>
            Coached by <strong>Ritesh Guchhait</strong>
          </span>
          <span>
            <strong>Olympic-Sized</strong> Pool
          </span>
          <span>
            <strong>Powai</strong> · IIT Bombay
          </span>
        </div>
      </Reveal>

      <div className="aq-app">
        {/* HERO */}
        <Reveal as="section" className="aq-hero">
          <div className="aq-hero-kicker">
            <span className="vol">Dossier No. 01</span>
            <span className="sep">§</span>
            <span>Swimming &amp; Water Polo</span>
          </div>

          <div className="aq-hero-grid">
            <div>
              <h1 className="aq-hero-title">
                <span className="italic">Aquatics</span>
                <br />
                at IIT Bombay.
              </h1>
              <p className="aq-hero-lede">
                Comprising of Swimming and Water Polo, Aquatics is one of the most widely
                practiced sports at IIT Bombay. The magnificent Olympic-sized pool, newly built
                and impeccably maintained, welcomes anyone seeking recreation or competitive
                glory. Owing to the coaches Reddy Sir (Retd.) and Ritesh Sir, IIT Bombay Aquatics
                has witnessed a tremendous growth over the years. With several exciting events
                spread throughout the year to cater to all levels of players, IITB Aquatics
                functions with the sole aim of promoting Swimming and Water Polo. Fueled by
                exceptional coaching and unwavering commitment, IIT Bombay's Swimming and Water
                Polo teams have built a legacy of excellence at the Inter-IIT Aquatics Meet.
              </p>
            </div>

            <aside className="aq-hero-stats">
              <div className="aq-hero-stat">
                <span className="k">Main Pool</span>
                <span className="v">50×25</span>
                <span className="c">Metres</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Baby Pool</span>
                <span className="v">15×10</span>
                <span className="c">Metres</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Coaches</span>
                <span className="v">
                  <em>{coachCount}</em>
                </span>
                <span className="c">Reddy Sir · Ritesh Sir</span>
              </div>
              <div className="aq-hero-stat">
                <span className="k">Fixtures</span>
                <span className="v">{fixtureCount}</span>
                <span className="c">Annual events</span>
              </div>
            </aside>
          </div>

          <div className="aq-hero-photo">
            <img src={pool3} alt="IIT Bombay swimming pool" />
          </div>
        </Reveal>

        <WaveDivider />

        {/* FACILITIES */}
        <Reveal as="section" className="aq-section">
          <div className="aq-eyebrow">
            <span className="num">§ 01</span> &nbsp;·&nbsp; Facilities
            <span className="bar" />
          </div>
          <div className="aq-section-head">
            <h2 className="aq-section-title">
              What's <span className="italic">on offer</span>.
            </h2>
            <p className="aq-section-sub">Four spaces. One membership card.</p>
          </div>

          <div className="aq-facility-grid">
            {facilities.map((f, i) => (
              <Reveal as="div" key={f.title} className="aq-facility-card" delay={i * 90}>
                <div className="aq-facility-photo">
                  <img src={f.image} alt={f.title} />
                </div>
                <h3 className="aq-facility-title">{f.title}</h3>
                <ul className="aq-facility-bullets">
                  {f.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </Reveal>

        <PhotoBreak image={pool4} tag="Fig. A" caption="The baby pool, built for first strokes." />

        {/* POOL TIMING */}
        <Reveal as="section" className="aq-section">
          <div className="aq-eyebrow">
            <span className="num">§ 02</span> &nbsp;·&nbsp; Pool Timing
            <span className="bar" />
          </div>

          <div className="aq-table-wrap">
            <table className="aq-table">
              <thead>
                <tr>
                  <th colSpan={2}>Swimming Pool Timing</th>
                </tr>
                <tr>
                  <th>
                    <span className="aq-pill aq-pill-morning">Morning</span>
                  </th>
                  <th>
                    <span className="aq-pill aq-pill-evening">Evening</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>7:15 AM to 8:00 AM</td>
                  <td>6:15 PM to 7:00 PM</td>
                </tr>
                <tr>
                  <td>8:00 AM to 8:45 AM</td>
                  <td>7:05 PM to 7:50 PM</td>
                </tr>
                <tr>
                  <td>8:50 AM to 9:30 AM</td>
                  <td>7:55 PM to 8:30 PM</td>
                </tr>
                <tr>
                  <td>9:30 AM to 10:15 AM</td>
                  <td>8:30 PM to 9:00 PM</td>
                </tr>
                <tr>
                  <td className="aq-section-header" rowSpan={2}>
                    Ladies Slots
                  </td>
                  <td>6:30 AM to 7:15 AM</td>
                </tr>
                <tr>
                  <td>5:20 PM to 6:15 PM</td>
                </tr>
                <tr>
                  <td className="aq-section-header">Campus Kids Training</td>
                  <td>4:00 PM to 5:15 PM</td>
                </tr>
                <tr>
                  <td className="aq-section-header">NSO (Mon &amp; Wed)</td>
                  <td>5:45 PM to 7:00 PM</td>
                </tr>
                <tr>
                  <td className="aq-section-header">Inter IIT Practice</td>
                  <td>7:30 PM to 9:00 PM</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Reveal>

        {/* RULES & INFO — tabbed card browser */}
        <Reveal as="section" className="aq-section">
          <div className="aq-eyebrow">
            <span className="num">§ 03</span> &nbsp;·&nbsp; Rules &amp; Info
            <span className="bar" />
          </div>
          <div className="aq-section-head">
            <h2 className="aq-section-title">
              Know before you <span className="italic">dive in</span>.
            </h2>
            <p className="aq-section-sub">Pick a category — every rule in one glance.</p>
          </div>

          <nav className="aq-tabs" aria-label="Rule categories">
            {ruleCategories.map((cat) => (
              <button
                key={cat.key}
                className={`aq-tab ${activeCategory === cat.key ? 'is-active' : ''}`}
                onClick={() => setActiveCategory(cat.key)}
              >
                {cat.label}
              </button>
            ))}
          </nav>

          <div className="aq-cardgrid" key={activeCategory}>
            {activeItems.map((item, i) => (
              <div className="aq-rulecard" key={item.head} style={{ '--d': `${i * 45}ms` }}>
                <h4 className="aq-rulecard-head">{item.head}</h4>
                {item.steps ? (
                  <ol className="aq-rulecard-steps">
                    {item.steps.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ol>
                ) : (
                  <p className="aq-rulecard-body">{item.body}</p>
                )}
              </div>
            ))}
          </div>
        </Reveal>

        <PhotoBreak image={p3} tag="Fig. B" caption="Inter-hostel meets bring the whole pool deck to life." />

        {/* EVENTS */}
        <Reveal as="section" className="aq-section">
          <div className="aq-eyebrow">
            <span className="num">§ 04</span> &nbsp;·&nbsp; Events
            <span className="bar" />
          </div>
          <div className="aq-section-head">
            <h2 className="aq-section-title">
              The <span className="italic">fixtures</span>.
            </h2>
            <p className="aq-section-sub">Six columns. Tap a headline to read the full brief.</p>
          </div>

          <div className="aq-story-columns">
            {cards.map((card, index) => {
              const isOpen = expandedCard === index;
              return (
                <div
                  key={card.title}
                  className={`aq-story ${isOpen ? 'is-open' : ''}`}
                  role="button"
                  tabIndex={0}
                  onClick={() => toggleContent(index)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleContent(index);
                    }
                  }}
                  aria-expanded={isOpen}
                >
                  <div className="aq-story-photo">
                    <img src={eventImages[index % eventImages.length]} alt={card.title} />
                  </div>
                  <span className="aq-story-no">N&deg; {String(index + 1).padStart(2, '0')}</span>
                  <h3 className="aq-story-title">{card.title}</h3>
                  <p className={`aq-story-content ${isOpen ? 'is-full' : 'is-clamped'}`}>
                    {card.content}
                  </p>
                  <span className="aq-story-toggle">{isOpen ? 'Close —' : 'Continue reading →'}</span>
                </div>
              );
            })}
          </div>
        </Reveal>

        {/* ACHIEVEMENTS */}
        <Reveal as="section" className="aq-section">
          <div className="aq-eyebrow">
            <span className="num">§ 05</span> &nbsp;·&nbsp; Achievements
            <span className="bar" />
          </div>
          <div
            ref={timelineWrapRef}
            className={`aq-timeline-wrap ${timelineVisible ? 'is-visible' : ''}`}
          >
            <Timel />
          </div>
        </Reveal>

        {/* CONTACT */}
        <Reveal as="section" className="aq-section">
          <div className="aq-eyebrow">
            <span className="num">§ 06</span> &nbsp;·&nbsp; Contact
            <span className="bar" />
          </div>
          <div className="aq-contact-grid">
            <div className="aq-contact-card">
              <img alt="Ritesh Guchhait" src={user} className="aq-contact-img" />
              <p className="aq-contact-name">Ritesh Guchhait</p>
              <p className="aq-contact-role">Coach, Sports Officer</p>
            </div>
            <div className="aq-contact-card">
              <img alt="Meet Vanja" src={user} className="aq-contact-img" />
              <p className="aq-contact-name">Meet Vanja</p>
              <p className="aq-contact-role">Institute Aquatics Secretary</p>
              <p className="aq-contact-detail">+91 93235 87701</p>
            </div>
          </div>
        </Reveal>

        {/* GALLERY */}
        <Reveal as="section" className="aq-section aq-gallery-section">
          <div className="aq-eyebrow">
            <span className="num">§ 07</span> &nbsp;·&nbsp; Gallery
            <span className="bar" />
          </div>

          <div className="aq-strip">
            <img
              key={currentIndex}
              src={galleryImages[currentIndex]}
              alt={`Aquatics gallery ${currentIndex + 1}`}
              className={`aq-strip-image aq-slide-${slideDir}`}
            />
            <div className="aq-strip-caption">
              <span>
                Fig. {String(currentIndex + 1).padStart(2, '0')} / {String(galleryImages.length).padStart(2, '0')}
              </span>
              <span>Aquatics · Poolside</span>
            </div>
            <button className="aq-strip-btn aq-strip-prev" onClick={handlePrev} aria-label="Previous photo">
              ←
            </button>
            <button className="aq-strip-btn aq-strip-next" onClick={handleNext} aria-label="Next photo">
              →
            </button>
          </div>

          <div className="aq-strip-thumbs">
            {galleryImages.map((image, index) => (
              <button
                key={index}
                className={`aq-strip-thumb ${index === currentIndex ? 'is-active' : ''}`}
                onClick={() => {
                  setSlideDir(index > currentIndex ? 'next' : 'prev');
                  setCurrentIndex(index);
                }}
                aria-label={`Go to photo ${index + 1}`}
              >
                <img src={image} alt="" />
              </button>
            ))}
          </div>
        </Reveal>

        {/* LOCATION */}
        <Reveal as="section" className="aq-section">
          <div className="aq-eyebrow">
            <span className="num">§ 08</span> &nbsp;·&nbsp; Location
            <span className="bar" />
          </div>
          <div className="aq-location">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1884.6801509832069!2d72.91331199999999!3d19.135699499999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b808367d7489%3A0x5936f3009b0ecd48!2sBaby%20Swimming%20Pool.%20IIT%20Bombay!5e0!3m2!1sen!2sin!4v1719689561544!5m2!1sen!2sin"
              width="700"
              height="450"
              className="aq-map"
              allowFullScreen=""
              loading="lazy"
              title="pool location"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>

        {/* FOOTER */}
        <footer className="aq-footer">
          <span className="aq-footer-colophon">
            <em>Set in Fraunces &amp; JetBrains Mono.</em>
          </span>
          <span>IIT Bombay · Aquatics · Swimming &amp; Water Polo</span>
          <span>Print / Digital · Final Edition</span>
        </footer>
      </div>
    </div>
  );
};

export default Aquatics;