import { useEffect, useState } from "react";
import styles from "./Home.module.scss";
import Link from "next/link";

export default function Section3() {
    const [isLogin, setLogin] = useState(false);

    function pageTo() {
        if (isLogin) {
            return "/memberjoin";
        } else {
            return "/signup";
        }
    }

    useEffect(() => {
        setLogin(localStorage["id"] ? true : false);
    }, []);

    return (
        <section>
            <Link href={pageTo()} className={styles.homeEnd}>
                <p>지금 좋은 사람들과 함께 시작하세요!</p>
            </Link>
        </section>
    );
}
