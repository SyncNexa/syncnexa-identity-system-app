import Link from "next/link";
import styles from "./style.module.css";
import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className={styles.layout}>
      <aside className={styles.left_panel}>
        <div>
          <h1>
            Linking Minds <br />
            Building Futures
          </h1>
        </div>
      </aside>
      <div className={styles.right_panel}>
        <div className={styles.topBar}>
          <h1>Login</h1>
          <Link href="/signup" className={styles.loginLink}>
            Sign up
          </Link>
        </div>
        {children}
        <small className={styles.copyright}>
          © SyncNexa 2025. All Rights Reserved.
        </small>
      </div>
    </main>
  );
}

export default Layout;
