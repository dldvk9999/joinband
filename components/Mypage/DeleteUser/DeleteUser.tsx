import { useEffect, useState } from "react";
import styles from "./DeleteUser.module.scss";
import { data } from "../../../data/MypageData";

export default function DeleteUser(props: { id: number }) {
    const [oldPass, setOldPass] = useState("");
    const [isDisabled, setDisabled] = useState(true);

    // 회원탈퇴 로직
    function deleteUser() {
        const password = /^[a-zA-Z0-9~!@#$%^&*()-_]{8,}$/;

        if (!password.exec(oldPass)) {
            alert("회원탈퇴 완료");
            // 로그아웃 로직
            window.location.href = "/";
        }
    }

    useEffect(() => {
        if (data.id !== props.id) {
            alert("등록되지 않은 id 입니다.");
            window.history.back();
        }
    }, []);

    useEffect(() => {
        if (oldPass) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [oldPass]);

    return (
        <section className={styles.deleteuser}>
            <h1>회원탈퇴</h1>
            <hr />
            <div className={styles.deleteuserList}>
                <div>
                    <button onClick={deleteUser} disabled={isDisabled}>
                        탈퇴
                    </button>
                </div>
                <p>회원 탈퇴 하시겠습니까?</p>
                <p>현재 비밀번호 입력 후 탈퇴 버튼을 클릭해주세요.</p>
                <input
                    type="password"
                    onChange={(e) => setOldPass(e.target.value)}
                    value={oldPass}
                    placeholder="비밀번호 입력"
                />
            </div>
        </section>
    );
}
