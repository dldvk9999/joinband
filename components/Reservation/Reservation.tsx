import styles from "./Reservation.module.scss";
import Result from "./Result/Result";
import Filter from "./Filter/Filter";

export default function Reservation() {
    return (
        <main>
            <section className={styles.reservation}>
                <Filter />
                <Result />
            </section>
        </main>
    );
}
