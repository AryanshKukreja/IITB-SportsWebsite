import React, { useEffect, useRef, useState } from 'react';
import './LogoIntro.css';

const SESSION_KEY = 'iitb-sports-intro-played';



export default function LogoIntro({ src, once = true, maxDuration = 6000, children }) {
  const videoRef = useRef(null);
  const [phase, setPhase] = useState('intro');

  const alreadyPlayed = once && typeof window !== 'undefined' && sessionStorage.getItem(SESSION_KEY);
  const reduceMotion =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const [skipIntro] = useState(Boolean(alreadyPlayed || reduceMotion));
  console.log('alreadyPlayed:', alreadyPlayed);
  console.log('reduceMotion:', reduceMotion);
  console.log('skipIntro:', skipIntro);
  console.log('phase:', phase);

//   const finish = () => {
//     setPhase('exiting');
//     if (once && typeof window !== 'undefined') {
//       sessionStorage.setItem(SESSION_KEY, 'true');
//     }
//     setTimeout(() => setPhase('done'), 600);
//   };
  const finish = (reason) => {
  console.log('finish called by:', reason);  // ADD THIS
  setPhase('exiting');
  if (once && typeof window !== 'undefined') {
    sessionStorage.setItem(SESSION_KEY, 'true');
  }
  setTimeout(() => setPhase('done'), 6000);
};

  useEffect(() => {
    if (skipIntro) {
      setPhase('done');
      return undefined;
    }
    const fallback = setTimeout(finish, maxDuration);
    return () => clearTimeout(fallback);
  }, [skipIntro, finish, maxDuration]);

  return (
    <>
      {children}
      {phase !== 'done' && (
        <div className={`li-overlay ${phase === 'exiting' ? 'is-exiting' : ''}`}>
          {/* <video
            ref={videoRef}
            className="li-video"
            src={src}
            autoPlay
            muted
            playsInline
            onEnded={finish}
            onError={finish}
          /> */}
          <video
            ref={videoRef}
            className="li-video"
            src={src}
            autoPlay
            muted
            playsInline
            onEnded={() => finish('onEnded')}
            onError={(e) => {
                console.log('video error:', e.target.error);  // ADD THIS
                finish('onError');
            }}
            />
          <button className="li-skip" onClick={finish}>
            Skip
          </button>
        </div>
      )}
    </>
  );
}