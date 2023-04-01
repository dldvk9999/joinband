import { useEffect, useState } from "react";
import styles from "./ChangePassword.module.scss";
import { data } from "../../../data/MypageData";

export default function ChangePassword(props: { id: number }) {
    const [oldPass, setOldPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const [newPass2, setNewPass2] = useState("");
    const [isDisabled, setDisabled] = useState(true);

    // 비밀번호 변경 로직
    function changePassword() {
        const password = /^[a-zA-Z0-9~!@#$%^&*()-_]{8,}$/;

        if (!oldPass || !newPass || !newPass2) {
            alert("기존 및 신규 비밀번호를 입력해주세요.");
        } else if (oldPass !== data.password) {
            alert("현재 비밀번호가 맞지 않습니다.");
        } else if (newPass !== newPass2) {
            alert("비밀번호가 일치하지 않습니다!");
        } else if (oldPass === newPass) {
            alert("기존 비밀번호와 일치할 수 없습니다!");
        } else if (!password.exec(newPass)) {
            alert("형식에 맞게 비밀번호를 설정해주세요.");
        } else {
            alert("비밀번호 수정 완료!");
            setOldPass("");
            setNewPass("");
            setNewPass2("");
            // 비밀번호 수정 API 전송
        }
    }

    useEffect(() => {
        if (data.id !== props.id) {
            alert("등록되지 않은 id 입니다.");
            window.history.back();
        }
    }, []);

    useEffect(() => {
        if (oldPass && newPass && newPass2) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [oldPass, newPass, newPass2]);

    return (
        <section className={styles.changepassword}>
            <h1>비밀번호 변경</h1>
            <hr />
            <div className={styles.changepasswordList}>
                <div>
                    <button onClick={changePassword} disabled={isDisabled}>
                        수정
                    </button>
                </div>
                <div>
                    <p>현재 비밀번호</p>
                    <input type="password" onChange={(e) => setOldPass(e.target.value)} value={oldPass} minLength={8} />
                </div>
                <div>
                    <p>신규 비밀번호</p>
                    <input type="password" onChange={(e) => setNewPass(e.target.value)} value={newPass} minLength={8} />
                </div>
                <div>
                    <p>신규 비밀번호 확인</p>
                    <input
                        type="password"
                        onChange={(e) => setNewPass2(e.target.value)}
                        value={newPass2}
                        minLength={8}
                    />
                </div>
                <p className={styles.changePasswordText}>
                    * 반드시 영문자, 숫자, 특수문자(~!@#$%^&*()-_) 포함 8자리 이상이어야 합니다.
                </p>
            </div>
        </section>
    );
}
