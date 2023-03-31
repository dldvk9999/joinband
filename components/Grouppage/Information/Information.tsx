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
                    <button onClick={() => alert("수정 버튼 클릭")}>수정</button>
                </div>
                {users.map((item, i) => {
                    return (
                        <div
                            className={`${styles.informationListUser} ${styles.informationListUserFirst}`}
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
