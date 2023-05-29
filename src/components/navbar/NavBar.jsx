import React from "react";
import styles from "../../styles/NavBar.module.css";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className={styles["navbar"]}>
      <ul className={styles["nav-list"]}>
        <div className="left">
          <li className={styles["nav-item"]}>
            <Link to="/movies" className={styles["nav-link"]}>
              Watch Later
            </Link>
          </li>
        </div>
        <div className={styles["right"]}>
          <li className={styles["nav-item"]}>
            <Link to="/favourite-movies" className={styles["nav-link"]}>
              Favourites
            </Link>
          </li>
          <li className={styles["nav-item"]}>
            <Link to="/about" className={styles["nav-link"]}>
              About
            </Link>
          </li>
        </div>
      </ul>
    </nav>
  );
}
