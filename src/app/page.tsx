import Image from "next/image";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.pageContainer}>
      {/* Background Image Overlay */}
      <div className={styles.background}>
        <Image
          src="/assets/bg-image.png"
          alt="Technical Background"
          fill
          priority
          style={{ objectFit: 'cover' }}
        />
      </div>

      {/* Main Content Layout */}
      <div className={styles.contentOverlay}>
        <header className={styles.header}>
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
