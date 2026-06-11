import React, { useState, useEffect } from 'react';
import './BlogsPage.css';

const POSTS = [
  { 
    tag: 'REPORT', month: 'SEPTEMBER 2024', date: 'SEP 18',
    title: 'Lakshya Sen Event',
    cover: { hue: 220, sport: 'BADMINTON · GUEST' }, 
    photoUrl: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=1200&q=80&auto=format&fit=crop',
    ex: "Lakshya Sen Electrifies IIT Bombay. The campus was buzzing this past August as we had the incredible opportunity to host one of India's finest badminton players. For an electrifying session, the event delivered on its promise of speed, precision, and power. Students, faculty, and badminton enthusiasts packed the Indoor Badminton Court to watch a master in action.",
    chips: ['LAKSHYA SEN', 'BLACKCATS SPIRIT'] 
  },
  { 
    tag: 'ORIENTATION', month: 'AUGUST 2024', date: 'AUG 04',
    title: 'UG Sports Orientation',
    cover: { hue: 30, sport: 'NEW UG BATCH' }, 
    photoUrl: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?w=1200&q=80&auto=format&fit=crop',
    ex: "UG Sports Orientation — The wait is finally over, and the new undergraduate batch has officially been welcomed to the vibrant world of sports at IIT Bombay! The event was a massive success, fully introducing the incoming students to the exciting athletic culture that defines the institute. The energy was high, complete with fun activities and surprises that helped break the ice and foster early connections.",
    chips: ['NEW UG BATCH', 'BLACKCATS SPIRIT'] 
  },
  { 
    tag: 'TOURNAMENT', month: 'JULY 2024', date: 'JUL 26',
    title: 'PG Mania 2025',
    cover: { hue: 12, sport: 'PG TOURNAMENT' }, 
    photoUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=1200&q=80&auto=format&fit=crop',
    ex: "PG Mania 2025: A Fierce Showdown of Skill and Spirit. The competitive spirit of IIT Bombay's postgraduate community was on full display as PG Mania 2025 wrapped up its successful run! IIT Bombay Sports delivered a truly power-packed series of weekend showdowns exclusively for PG students. The tournament was a massive success, achieving its goal to help students compete, connect, and conquer across a wide range of exciting sports events.",
    chips: ['PG MANIA', 'POSTGRADS'] 
  },
  { 
    tag: 'PROFILE',  month: 'JUNE 2024', date: 'JUN 30',
    title: 'Karan Joshi and the geometry of a left foot',
    cover: { hue: 280, sport: 'FOOTBALL · PROFILE' }, 
    photoUrl: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=1200&q=80&auto=format&fit=crop',
    ex: "Eleven goals in the GC. A left foot that bends the ball around three defenders. We spent a morning at training with the player every defence on campus has tried — and failed — to solve.",
    chips: ['FOOTBALL', 'INTERVIEW'] 
  },
  { 
    tag: 'COLUMN',   month: 'MAY 2024', date: 'MAY 21',
    title: 'Why the morning swim still wins, on most days',
    cover: { hue: 200, sport: 'AQUATICS · OPINION' }, 
    photoUrl: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=1200&q=80&auto=format&fit=crop',
    ex: "The pool has no opinions. Just resistance and time. Mira Pillai on why she chose the 6:30 AM slot, and what it taught her about everything else.",
    chips: ['AQUATICS', 'COLUMN'] 
  },
  { 
    tag: 'TUTORIAL', month: 'APRIL 2024', date: 'APR 11',
    title: 'How to actually book the squash court at 8pm',
    cover: { hue: 350, sport: 'EQUIPMENT CELL · TIPS' }, 
    photoUrl: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=1200&q=80&auto=format&fit=crop',
    ex: "A walk-through of the new turf booking system from the equipment cell — the bits that aren't obvious from the form, including the 14-day window and the cancellation penalty.",
    chips: ['BOOKING', 'TUTORIAL'] 
  }
];

const BlogsPage = () => {
  const [activeFilter, setActiveFilter] = useState('All posts');
  const filters = ['All posts', 'Reports', 'Profiles', 'Columns', 'Tutorials'];

  // Animation logic from layout.js
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
    if (activeFilter ===
