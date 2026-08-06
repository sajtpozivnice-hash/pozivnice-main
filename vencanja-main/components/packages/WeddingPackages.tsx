"use client";

import PackageBox from "./PackageBox";
import { packages } from "@/data/data";
import styles from "./Packages.module.css";

const ListedPackages = () => {
  return (
    <div className={styles.cardsContainer}>
      {packages.map((pack, index) => (
        <div key={pack.id} className={styles.cardShell}>
          <PackageBox {...pack} index={index} />
        </div>
      ))}
    </div>
  );
};

export default ListedPackages;
