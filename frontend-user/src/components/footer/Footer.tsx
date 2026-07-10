import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>© 2026 All rights reserved</p>
      <p>
        <a href="https://github.com/eudooyoung/odin-blog-api.git">
          <i className="devicon-github-original colored"></i>
        </a>
      </p>
    </footer>
  );
};

export default Footer;
