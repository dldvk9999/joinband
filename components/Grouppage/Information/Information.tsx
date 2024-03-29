import { useEffect, useState } from "react";
import styles from "./Information.module.scss";
import { data } from "../../../data/MypageData";

interface usersType {
    id: number;
    name: string;
    email: string;
    part: string;
}

export default function Information(props: { id: number }) {
    const [users, setUsers] = useState<Array<usersType>>([]);

    // 그룹 유저 삭제
    function delUser(index: number, id: number, name: string) {
        if (index !== 0) {
            if (confirm(name + " 유저를 삭제하시겠습니까?")) {
                setUsers(users.filter((item) => item.id !== id));
                alert("삭제 완료되었습니다.");
            }
        }
    }

    // 그룹 초대 링크 보내기
    function invite() {
        const email = prompt("초대링크를 보낼 이메일을 입력해주세요.", "example@naver.com");
        if (email) {
            alert(email + " 전송 완료!");
        }
    }

    useEffect(() => {
        const groupData = data.group.filter((item) => item.id === props.id);
        if (groupData.length) {
            setUsers([{ id: 0, name: "이름", email: "이메일", part: "파트" }].concat(groupData[0].user));
        }
    }, []);

    return (
        <section className={styles.information}>
            <h1>그룹 정보</h1>
            <hr />
            <div className={styles.informationList}>
                <div>
                    <p>* 유저를 클릭하여 삭제할 수 있습니다.</p>
                    <button onClick={() => invite()}>초대</button>
                </div>
                {users.map((item, i) => {
                    return (
                        <div
                            className={`${styles.informationListUser} ${i === 0 && styles.informationListUserFirst}`}
                            onClick={() => delUser(i, item.id, item.name)}
                            key={"grouppage-info-" + i}
                        >
                            <p>{item.name}</p>
                            <p>{item.email}</p>
                            <p>{item.part}</p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
