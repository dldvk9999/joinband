import styles from "./Video.module.scss";

export default function Video() {
    return (
        <section className={styles.video}>
            <h1>내 동영상</h1>
            <hr />
            <div className={styles.videoList}>
                <div>
                    <button onClick={(e) => alert("업로드 버튼 클릭")}>업로드</button>
                </div>
                <p>내 동영상이 없습니다.</p>
            </div>
        </section>
    );
}
