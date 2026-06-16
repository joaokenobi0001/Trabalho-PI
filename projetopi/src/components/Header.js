import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/components.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.headerContent}>
          <Link to="/" className={styles.logo}>
            <span className={styles.logoIcon}></span>
            <span>PsiMatch</span>
          </Link>
          <nav className={styles.nav}>
            <Link to="/" className={styles.navLink}>Home</Link>
            <Link to="/cadastro" className={styles.navLink}>Cadastrar Psicólogo</Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;