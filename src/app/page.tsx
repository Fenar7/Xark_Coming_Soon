'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import styles from './page.module.scss';
import LoadingScreen from './components/LoadingScreen';

export default function Home() {
  const [loading, setLoading] = useState(true);

  // Refs for intro animations
  const bgRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const word1Ref = useRef<HTMLSpanElement>(null);
  const word2Ref = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  const handleLoadingComplete = useCallback(() => {
    setLoading(false);
  }, []);

  // Run page intro animations once loading screen exits
  useEffect(() => {
    if (!loading) {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl
          // Background zooms from 1.18 → 1.0
          .to(bgRef.current, {
            scale: 1,
            duration: 1.6,
            ease: 'power2.out',
          }, 0)

          // Logo slides down from top
          .to(headerRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.7,
          }, 0.05)

          // Title words slide up, staggered
          .to(word1Ref.current, {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: 'power4.out',
          }, 0.15)
          .to(word2Ref.current, {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: 'power4.out',
          }, 0.3)

          // Subtitle fades up
          .to(subtitleRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
          }, 0.5);
      });

      return () => ctx.revert();
    }
  }, [loading]);

  return (
    <>
      {loading && <LoadingScreen onComplete={handleLoadingComplete} />}

      <div className={styles.pageContainer}>
        {/* Background (starts zoomed in, animates out on load) */}
        <div className={styles.background} ref={bgRef}>
          <Image
            src="/assets/bg-image.png"
            alt="Technical Background"
            fill
            priority
            style={{ objectFit: 'cover' }}
          />
        </div>

        {/* Main content */}
        <div className={styles.contentOverlay}>
          <header className={styles.header} ref={headerRef}>
            <Image
              src="/assets/xark-green-logo.png"
              alt="XARK Technologies Logo"
              width={290}
              height={48}
              className={styles.logo}
              priority
            />
          </header>

          <main className={styles.mainWrapper}>
            <section className={styles.textContent}>
              <h1 className={styles.title}>
                <span ref={word1Ref} className={styles.word}>Coming </span>
                <span ref={word2Ref} className={`${styles.word} ${styles.highlight}`}>Soon</span>
              </h1>
              <p ref={subtitleRef} className={styles.subtitle}>
                XARK Technologies. RF components, antenna systems, and design services. Site goes live shortly.
              </p>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
