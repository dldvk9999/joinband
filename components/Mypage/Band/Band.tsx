import styles from "./Band.module.scss";

export default function Band() {
    return (
        <section className={styles.band}>
            <h1>내 밴드</h1>
            <hr />
            <div className={styles.bandList}>
                <div>
                    <button>추가</button>
                </div>
                <p>가입한 밴드가 없습니다.</p>
            </div>
        </section>
    );
}
