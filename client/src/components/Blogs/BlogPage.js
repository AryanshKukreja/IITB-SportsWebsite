import React, { useState } from 'react';
import './BlogsPage.css';

const POSTS = [
  { 
    tag: 'REPORT', month: 'SEPTEMBER 2024', date: 'SEP 18',
    title: 'Lakshya Sen Event',
    coverHue: 220, sport: 'BADMINTON',
    ex: "Lakshya Sen Electrifies IIT Bombay. The campus was buzzing this past August as we had the incredible opportunity to host one of India's finest badminton players.",
    chips: ['LAKSHYA SEN', 'BLACKCATS SPIRIT'] 
  },
  { 
    tag: 'ORIENTATION', month: 'AUGUST 2024', date: 'AUG 04',
    title: 'UG Sports Orientation',
    coverHue: 30, sport: 'NEW UG BATCH',
    ex: "The wait is finally over, and the new undergraduate batch has officially been welcomed to the vibrant world of sports at IIT Bombay!",
    chips: ['NEW UG BATCH', 'BLACKCATS SPIRIT'] 
  },
  { 
    tag: 'TOURNAMENT', month: 'JULY 2024', date: 'JUL 26',
    title: 'PG Mania 2025',
    coverHue: 12, sport: 'PG TOURNAMENT',
    ex: "The competitive spirit of IIT Bombay's postgraduate community was on full display as PG Mania 2025 wrapped up its successful run!",
    chips: ['PG MANIA', 'POSTGRADS'] 
  },
  { 
    tag: 'PROFILE', month: 'JUNE 2024', date: 'JUN 30',
    title: 'Karan Joshi and the geometry of a left foot',
    coverHue: 280, sport: 'FOOTBALL',
    ex: "Eleven goals in the GC. A left foot that bends the ball around three defenders. We spent a morning at training with the player every defence has tried to solve.",
    chips: ['FOOTBALL', 'INTERVIEW'] 
  },
  { 
    tag: 'COLUMN', month: 'MAY 2024', date: 'MAY 21',
    title: 'Why the morning swim still wins, on most days',
    coverHue: 200, sport: 'AQUATICS',
    ex: "The pool has no opinions. Just resistance and time. Mira Pillai on why she chose the 6:30 AM slot, and what it taught her about everything else.",
    chips: ['AQUATICS', 'COLUMN'] 
  },
  { 
    tag: 'TUTORIAL', month: 'APRIL 2024', date: 'APR 11',
    title: 'How to actually book the squash court at 8pm',
    coverHue: 350, sport: 'EQUIPMENT CELL',
    ex: "A walk through of the new turf booking system from the equipment cell, including the 14 day window and the cancellation penalty.",
    chips: ['BOOKING', 'TUTORIAL'] 
  }
];

const BlogsPage = () => {
  const [activeFilter, setActiveFilter] = useState('All posts');
  const filters = ['All posts', 'Reports', 'Profiles', 'Columns', 'Tutorials'];

  const filteredPosts = POSTS.filter(post => {
    if (activeFilter === 'All posts') return true;
    if (activeFilter === 'Reports') return post.tag === 'REPORT';
    if (activeFilter === 'Profiles') return post.tag === 'PROFILE';
    if (activeFilter === 'Columns') return post.tag === 'COLUMN';
    if (activeFilter === 'Tutorials') return post.tag === 'TUTORIAL';
    return true;
  });

  return (
    <main className="blogs-page-container">
      <section className="blog-hero">
        <span className="kicker">CELEBRATING SPORTS EXCELLENCE MONTH BY MONTH</span>
        <h1>Event Highlights.</h1>
        <p className="sub">Match reports, athlete profiles, councils diaries and the occasional sharply worded column. Updated weekly by athletes, coaches and the web team.</p>
      </section>

      <section className="section">
        <div className="section-inner">
          <div className="blog-header-row">
            <div>
              <span className="kicker"><span className="dot"></span>WEEKLY • 24 ARTICLES THIS SEASON</span>
              <h2 className="section-title">Our journey through <span className="it">sports.</span></h2>
              <p className="section-sub">Explore the remarkable events organised by the Sports Council throughout the year.</p>
            </div>
            
            <div className="filter-buttons">
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
              <article key={index} className="blog-article">
                <div 
                  className="blog-cover" 
                  style={{
                    background: `linear-gradient(180deg, rgba(8,7,10,0) 40%, rgba(8,7,10,0.7) 100%), linear-gradient(135deg, hsl(${post.coverHue}, 60%, 28%), hsl(${(post.coverHue + 40) % 360}, 50%, 14%))`
                  }}
                >
                  <span className="tag">{post.tag}</span>
                  <div className="cover-sport">{post.sport}</div>
                </div>
                <div className="blog-body">
                  <div className="meta">{post.month} • {post.date}</div>
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
  );
};

export default BlogsPage;
