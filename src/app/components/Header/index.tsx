import Link from "next/link";
import React from "react";
import styles from './Header.module.css'

const routes = [
  { path: "raid", label: "Raid Bosses spawn" },
  { path: "craft", label: "Craft S grade" },
];

const Header = () => {
  return (
    <header className={styles.navigation}>
        {routes.map((el, index) => (
            <Link key={index} href={el.path}>
              <p>{el.label}</p>
            </Link>
        ))}
    </header>
  );
};

export default Header;
