import { useState } from "react";
import styles from "./DeleteUser.module.scss";

export default function DeleteUser(props: { id: number }) {
    const [oldPass, setOldPass] = useState("");

    // 회원탈퇴 로직
    function deleteUser() {
        const password = /^[a-zA-Z0-9~!@#$%^&*()-_]{8,}$/;

        if (!password.exec(oldPass)) {
            alert("회원탈퇴 완료");
            // 로그아웃 로직
            window.location.href = "/";
        }
    }

    return (
        <section className={styles.deleteuser}>
            <h1>회원탈퇴</h1>
            <hr />
            <div className={styles.deleteuserList}>
                <div>
                    <button onClick={deleteUser}>탈퇴</button>
                </div>
                <p>회원 탈퇴 하시겠습니까?</p>
                <p>현재 비밀번호 입력 후 탈퇴 버튼을 클릭해주세요.</p>
                <input type="password" onChange={(e) => setOldPass(e.target.value)} value={oldPass} />
            </div>
        </section>
    );
}
