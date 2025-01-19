import Image from "next/image";
import styles from "./footer.module.css";

export default function Footer() {

  function handleWorkButton() {

    window.location.href = "/";
  }


  return (
    <footer className={styles.footer}>
      <section className={styles.footer__content}>
        <div className={styles.footer__hero}>
          <p className={styles.footer__heading}>Let's Talk!</p>
          <div className={styles.footer__subheading}>
            <Image
              className={styles.footer__arrowdown}
              src={`/icons/sub-arrow-right.svg`}
              alt="Arrow Down"
              width={20}
              height={20}
              loading="lazy"
            />
            <p className={styles.footer__email}>hello@johnlexter.com</p>
          </div>
        </div>
        <div className={styles.footer__about}>
          <div className={styles.footer__info}>
            <p className={styles.footer__tag}>Based In</p>
            <p className={styles.footer__value}>Mandaluyong, PH</p>
          </div>
          <div className={styles.footer__info}>
            <p className={styles.footer__tag} onClick={handleWorkButton}>Home</p>
            <p className={styles.footer__tag} onClick={handleWorkButton}>Works</p>
          </div>
          <div className={styles.footer__info}>
            <a
              className={styles.footer__tag}
              target="_blank"
              href="https://www.facebook.com/realjohnlexterlaguinday/"
            >
              <div className={styles.footer__link}>
                <p className={styles.footer__tag}>Facebook</p>
                <Image
                  className={styles.footer__arrownortheast}
                  src={`/icons/north-east.svg`}
                  alt="Arrow Down"
                  width={20}
                  height={20}
                  loading="lazy"
                />
              </div>
            </a>
            <a
              className={styles.footer__tag}
              target="_blank"
              href="https://www.instagram.com/johnlexterrr/"
            >
              <div className={styles.footer__link}>
                <p className={styles.footer__tag}>Instagram</p>
                <Image
                  className={styles.footer__arrownortheast}
                  src={`/icons/north-east.svg`}
                  alt="Arrow Down"
                  width={20}
                  height={20}
                  loading="lazy"
                />
              </div>
            </a>
            <a
              className={styles.footer__tag}
              target="_blank"
              href="https://www.youtube.com/channel/UCptN8_zEUK5Y2zNipGhU9cQ"
            >
              <div className={styles.footer__link}>
                <p className={styles.footer__tag}>Youtube</p>
                <Image
                  className={styles.footer__arrownortheast}
                  src={`/icons/north-east.svg`}
                  alt="Arrow Down"
                  width={20}
                  height={20}
                  loading="lazy"
                />
              </div>
            </a>
          </div>
        </div>
      </section>
      <section className={styles.footer__credit}>
        <p className={styles.credit__info}>© 2025. All Rights Reserved</p>
        <p className={styles.credit__info}>Developed by John Lexter Laguinday</p>
      </section>
    </footer>
  );
}
