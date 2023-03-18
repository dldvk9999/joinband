import styles from "./DeleteUser.module.scss";

export default function DeleteUser() {
    return (
        <section className={styles.deleteuser}>
            <h1>회원탈퇴</h1>
            <hr />
            <div className={styles.deleteuserList}>
                <div>
                    <button onClick={(e) => alert("회원탈퇴 버튼 클릭")}>탈퇴</button>
                </div>
                <p>개발 중.</p>
            </div>
        </section>
    );
}
