import styles from "./ChangePassword.module.scss";

export default function ChangePassword() {
    return (
        <section className={styles.changepassword}>
            <h1>비밀번호 변경</h1>
            <hr />
            <div className={styles.changepasswordList}>
                <div>
                    <button onClick={(e) => alert("비밀번호 수정 버튼 클릭")}>수정</button>
                </div>
                <p>개발 중.</p>
            </div>
        </section>
    );
}
