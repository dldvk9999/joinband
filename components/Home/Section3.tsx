import styles from "./Home.module.scss";
import Link from "next/link";

export default function Section3() {
    function pageTo() {
        if (localStorage["id"]) {
            return "/memberjoin";
        } else {
            return "/signup";
        }
    }

    return (
        <section>
            <Link href={pageTo()} className={styles.homeEnd}>
                <p>지금 좋은 사람들과 함께 시작하세요!</p>
            </Link>
        </section>
    );
}
