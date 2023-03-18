import styles from "./Information.module.scss";

export default function Information() {
    return (
        <section className={styles.video}>
            <h1>내 정보</h1>
            <hr />
            <div className={styles.videoList}>
                <div>
                    <button onClick={(e) => alert("수정 버튼 클릭")}>수정</button>
                </div>
                <h2>이메일</h2>
                <input type="email" />
                <h2>이름</h2>
                <input type="text" />
                <h2>현재 비밀번호</h2>
                <input type="password" />
                <h2>비밀번호 수정</h2>
                <input type="password" />
                <h2>파트</h2>
                <input type="text" />
                <h2>사는 곳</h2>
                <input type="text" />
            </div>
        </section>
    );
}
