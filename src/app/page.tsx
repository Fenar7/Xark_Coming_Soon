import Image from "next/image";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.pageContainer}>
      {/* Background Image Overlay */}
      <div className={styles.background}>
        <Image
          src="/assets/background.png"
          alt="Technical Background"
          fill
          priority
          style={{ objectFit: 'cover' }}
        />
      </div>

      {/* Main Content Layout */}
      <div className={styles.contentOverlay}>
        <header className={styles.header}>
          {/* Temporary inline SVG replacement for missing localhost logo */}
          <svg width="290" height="48" viewBox="0 0 290 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.logo}>
            <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#93d50a" fontSize="36" fontFamily="SF Pro Display, sans-serif" fontWeight="bold">
              XARK
            </text>
          </svg>
        </header>

        <main className={styles.mainWrapper}>
          <section className={styles.textContent}>
            <h1 className={styles.title}>
              Coming <span className={styles.highlight}>Soon</span>
            </h1>
            <p className={styles.subtitle}>
              XARK Technologies. RF components, antenna systems, and design services. Site goes live shortly.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}
