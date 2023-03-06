import styles from "./Footer.module.scss";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            Developed by
            <span>
                <a href="https://github.com/dldvk9999/joinband" target="_blank" rel="noopener noreferrer">
                    JongGeun
                </a>
            </span>
            <p>Copyright © 2023 JongGeun. All rights reserved.</p>
        </footer>
    );
}
