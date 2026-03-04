'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import styles from './LoadingScreen.module.scss';

interface LoadingScreenProps {
    onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
    const overlayRef = useRef<HTMLDivElement>(null);
    const logoWrapperRef = useRef<HTMLDivElement>(null);
    const scanBeamRef = useRef<HTMLDivElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);
    const counterRef = useRef<HTMLSpanElement>(null);
    const statusRef = useRef<HTMLSpanElement>(null);
    const ring1Ref = useRef<HTMLDivElement>(null);
    const ring2Ref = useRef<HTMLDivElement>(null);
    const ring3Ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const onCompleteRef = onComplete;
        const progress = { val: 0 };

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                delay: 0.15,
                onComplete: onCompleteRef,
            });

            // ── Phase 1: scanBeam fades in at top ──────────────────────
            tl.to(scanBeamRef.current, {
                opacity: 1,
                duration: 0.25,
                ease: 'none',
            })
                // ── Phase 2: Beam sweeps down + logo clip-path reveals ──
                .to(
                    scanBeamRef.current,
                    { top: '100%', duration: 1.5, ease: 'power1.inOut' },
                    '+=0.05'
                )
                .to(
                    logoWrapperRef.current,
                    {
                        clipPath: 'inset(0% 0% 0% 0%)',
                        duration: 1.5,
                        ease: 'power1.inOut',
                    },
                    '<' // synced with scan beam
                )

                // ── Phase 3: Progress bar + counter ──────────────────────
                .to(
                    progressBarRef.current,
                    { scaleX: 1, duration: 1.7, ease: 'power2.inOut' },
                    0.3
                )
                .to(
                    progress,
                    {
                        val: 100,
                        duration: 1.7,
                        ease: 'power2.inOut',
                        onUpdate: () => {
                            if (counterRef.current) {
                                counterRef.current.textContent = Math.round(progress.val)
                                    .toString()
                                    .padStart(3, '0');
                            }
                        },
                    },
                    0.3
                )

                // ── Phase 4: Logo glow pulse ──────────────────────────────
                .to(logoWrapperRef.current, {
                    filter: 'brightness(1.5) drop-shadow(0 0 22px rgba(147,213,10,0.85))',
                    duration: 0.25,
                    ease: 'power2.out',
                })
                .call(() => {
                    if (statusRef.current) {
                        statusRef.current.textContent = 'SIGNAL ACQUIRED';
                        statusRef.current.style.color = 'rgba(147, 213, 10, 0.95)';
                    }
                })
                .to(logoWrapperRef.current, {
                    filter: 'brightness(1) drop-shadow(0 0 8px rgba(147,213,10,0.35))',
                    duration: 0.5,
                    ease: 'power2.in',
                })

                // ── Phase 5: Rings burst outward ─────────────────────────
                .set([ring1Ref.current, ring2Ref.current, ring3Ref.current], {
                    opacity: 0.8,
                    scale: 0.5,
                })
                .to(
                    [ring1Ref.current, ring2Ref.current, ring3Ref.current],
                    {
                        scale: 3,
                        opacity: 0,
                        stagger: 0.12,
                        duration: 0.8,
                        ease: 'power2.out',
                    },
                    '-=0.1'
                )

                // ── Phase 6: Overlay slides up ────────────────────────────
                .to(
                    overlayRef.current,
                    { yPercent: -105, duration: 0.95, ease: 'power4.inOut' },
                    '+=0.2'
                );
        });

        return () => ctx.revert();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div ref={overlayRef} className={styles.overlay}>
            <div className={styles.center}>
                {/* Signal rings container */}
                <div className={styles.ringsContainer}>
                    <div ref={ring1Ref} className={`${styles.ring} ${styles.ring1}`} />
                    <div ref={ring2Ref} className={`${styles.ring} ${styles.ring2}`} />
                    <div ref={ring3Ref} className={`${styles.ring} ${styles.ring3}`} />
                </div>

                {/* Logo area: scan beam + clipped logo */}
                <div className={styles.logoArea}>
                    <div ref={scanBeamRef} className={styles.scanBeam} />
                    <div ref={logoWrapperRef} className={styles.logoWrapper}>
                        <Image
                            src="/assets/xark-green-logo.png"
                            alt="XARK Technologies"
                            width={290}
                            height={48}
                            priority
                            className={styles.logoImage}
                        />
                    </div>
                </div>

                <p className={styles.tagline}>RF · Antenna · Design</p>
            </div>

            {/* Bottom HUD */}
            <div className={styles.bottom}>
                <span ref={statusRef} className={styles.status}>SIGNAL ACQUIRING</span>
                <div className={styles.progressTrack}>
                    <div ref={progressBarRef} className={styles.progressBar} />
                </div>
                <span ref={counterRef} className={styles.counter}>000</span>
            </div>
        </div>
    );
}
