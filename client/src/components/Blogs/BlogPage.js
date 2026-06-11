import React, { useState, useEffect } from 'react';
import './BlogsPage.css';

const POSTS = [
  { tag: 'REPORT', month: 'SEPTEMBER 2024', date: 'SEP 18', title: 'Lakshya Sen Event', cover: { hue: 220, sport: 'BADMINTON · GUEST' }, photoUrl: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=1200&q=80&auto=format&fit=crop', ex: "Lakshya Sen Electrifies IIT Bombay. The campus was buzzing this past August as we had the incredible opportunity to host one of India's finest badminton players. For an electrifying session, the event delivered on its promise of speed, precision, and power. Students, faculty, and badminton enthusiasts packed the Indoor Badminton Court to watch a master in action.", chips: ['LAKSHYA SEN', 'BLACKCATS SPIRIT'] },
  { tag: 'ORIENTATION', month: 'AUGUST 2024', date: 'AUG 04', title: 'UG Sports Orientation', cover: { hue: 30, sport: 'NEW UG BATCH' }, photoUrl: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?w=1200&q=80&auto=format&fit=crop', ex: "UG Sports Orientation — The wait is finally over, and the new undergraduate batch has officially been welcomed to the vibrant world of sports at IIT Bombay! The event was a massive success, fully introducing the incoming students to the exciting athletic culture that defines the institute. The energy was high, complete with fun activities and surprises that helped break the ice and foster early connections.", chips: ['NEW UG BATCH', 'BLACKCATS SPIRIT'] },
  { tag: 'TOURNAMENT', month: 'JULY 2024', date: 'JUL 26', title: 'PG Mania 2025', cover: { hue: 12, sport: 'PG TOURNAMENT' }, photoUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1200&q=80&auto=format&fit=crop', ex: "PG Mania 2025: A Fierce Showdown of Skill and Spirit. The competitive spirit of IIT Bombay's postgraduate community was on full display as PG Mania 2025 wrapped up its successful run! IIT Bombay Sports delivered a truly power-packed series of weekend showdowns exclusively for PG students. The tournament was a massive success, achieving its goal to help students compete, connect, and conquer across a wide range of exciting sports events.", chips: ['PG MANIA', 'POSTGRADS'] },
  { tag: 'PROFILE', month: 'JUNE 2024', date: 'JUN 30', title: 'Karan Joshi and the geometry of a left foot', cover: { hue: 280, sport: 'FOOTBALL · PROFILE' }, photoUrl: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=1200&q=80&auto=format&fit=crop', ex: "Eleven goals in the GC. A left foot that bends the ball around three defenders. We spent a morning at training with the player every defence on campus has tried — and failed — to solve.", chips: ['FOOTBALL', 'INTERVIEW'] },
  { tag: 'COLUMN', month: 'MAY 2024', date: 'MAY 21', title: 'Why the morning swim still wins, on most days', cover: { hue: 200, sport: 'AQUATICS · OPINION' }, photoUrl: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=1200&q=80&auto=format&fit=crop', ex: "The pool has no opinions. Just resistance and time. Mira Pillai on why she chose the 6:30 AM slot, and what it taught her about everything else.", chips: ['AQUATICS', 'COLUMN'] },
  { tag: 'TUTORIAL', month: 'APRIL 2024', date: 'APR 11', title: 'How to actually book the squash court at 8pm', cover: { hue: 350, sport: 'EQUIPMENT CELL · TIPS' }, photoUrl: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=1200&q=80&auto=format&fit=crop', ex: "A walk-through of the new turf booking system from the equipment cell — the bits that aren't obvious from the form, including the 14-day window and the cancellation penalty.", chips: ['BOOKING', 'TUTORIAL'] }
];

const BlogsPage = () => {
  const [activeFilter, setActiveFilter] = useState('All posts');
  const filters = ['All posts', 'Reports', 'Profiles', 'Columns', 'Tutorials'];

  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [activeFilter]);

  const filteredPosts = POSTS.filter(post => {
    if (activeFilter === 'All posts') return true;
    if (activeFilter === 'Reports') return post.tag === 'REPORT';
    if (activeFilter === 'Profiles') return post.tag === 'PROFILE';
    if (activeFilter === 'Columns') return post.tag === 'COLUMN';
    if (activeFilter === 'Tutorials') return post.tag === 'TUTORIAL';
    return true;
  });

  return (
    <div className="blogs-wrapper">
      <main>
        <section className="blog-hero">
          <span className="kicker">CELEBRATING SPORTS EXCELLENCE MONTH BY MONTH</span>
          <h1>Event Highlights.</h1>
          <p className="sub">Match reports, athlete profiles, councils diaries and the occasional sharply-worded column. Updated weekly by athletes, coaches and the web team.</p>
        </section>

        <section className="section">
          <div className="section-inner">
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px', gap: '24px', flexWrap: 'wrap'}}>
              <div>
                <span className="kicker"><span className="dot"></span>WEEKLY · 24 ARTICLES THIS SEASON</span>
                <h2 className="section-title" style={{marginTop: '8px'}}>Our journey through <span className="it" style={{color: 'var(--accent)', fontStyle: 'italic'}}>sports.</span></h2>
                <p className="section-sub" style={{marginTop: '14px'}}>Explore the remarkable events organised by the Sports Council throughout the year.</p>
              </div>
              
              <div style={{display: 'flex', gap: '8px', flexWrap: 'wrap'}}>
                {filters.map(filter => (
                  <button 
                    key={filter}
                    className={`btn ${activeFilter === filter ? 'btn-primary' : ''}`}
                    onClick={() => setActiveFilter(filter)}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            <div className="blog-feed">
              {filteredPosts.map((post, index) => (
                <article key={index} className="blog-article reveal">
                  <div 
                    className={`blog-cover ${post.photoUrl ? 'is-photo' : ''}`} 
                    style={{
                      backgroundImage: `linear-gradient(180deg, rgba(5,13,20,0.15) 30%, rgba(5,13,20,0.85) 100%), url("${post.photoUrl}")`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    <span className="tag">{post.tag}</span>
                    <div style={{position: 'absolute', bottom: '14px', left: '14px', right: '14px', fontFamily: 'var(--mono)', fontSize: '10px', color: 'rgba(255,255,255,0.85)', letterSpacing: '0.14em', zIndex: 2}}>
                      {post.cover.sport}
                    </div>
                  </div>
                  <div className="blog-body">
                    <div className="meta">{post.month} · {post.date}</div>
                    <div className="ttl">{post.title}</div>
                    <div className="ex">{post.ex}</div>
                    <div className="foot">
                      <div className="chips">
                        {post.chips.map((chip, cIndex) => (
                          <span key={cIndex} className="c">{chip}</span>
                        ))}
                      </div>
                      <span className="arr">→</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default BlogsPage;
