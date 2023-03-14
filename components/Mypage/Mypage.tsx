import styles from "./Mypage.module.scss";
import Nav from "./Nav/Nav";
import Video from "./Video/Video";

export default function Mypage() {
    return (
        <main>
            <section className={styles.mypage}>
                <Nav />
                <Video />
            </section>
        </main>
    );
}
