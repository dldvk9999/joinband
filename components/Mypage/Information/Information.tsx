import { useEffect, useState } from "react";
import styles from "./Information.module.scss";
import { data } from "../../../data/MypageData";

const partList = ["드럼", "일렉기타", "통기타", "건반", "보컬", "Etc"];

export default function Information(props: { id: number }) {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [nickname, setNickname] = useState("");
    const [part, setPart] = useState("");
    const [place, setPlace] = useState("");

    useEffect(() => {
        setEmail(data.email);
        setName(data.name);
        setNickname(data.nickname);
        setPart(partList.includes(data.part) ? data.part : "Etc");
        setPlace(data.live);
    }, []);

    return (
        <section className={styles.information}>
            <h1>내 정보</h1>
            <hr />
            <div className={styles.informationList}>
                <div>
                    <button onClick={() => alert("수정 버튼 클릭")}>수정</button>
                </div>
                <div>
                    <p>이메일</p>
                    <input
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        placeholder={"example@naver.com"}
                    />
                </div>
                <div>
                    <p>이름</p>
                    <input type="text" onChange={(e) => setName(e.target.value)} value={name} placeholder={"홍길동"} />
                </div>
                <div>
                    <p>닉네임</p>
                    <input
                        type="text"
                        onChange={(e) => setNickname(e.target.value)}
                        value={nickname}
                        placeholder={"홍길동의 닉네임"}
                    />
                </div>
                <div>
                    <p>파트</p>
                    <select onChange={(e) => setPart(e.target.value)} value={part}>
                        <option value={""} hidden>
                            파트를 선택해주세요.
                        </option>
                        {partList.map((item, i) => {
                            return (
                                <option value={item} key={"login-partCategory-" + i}>
                                    {item}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <div>
                    <p>사는 곳</p>
                    <input
                        type="text"
                        onChange={(e) => setPlace(e.target.value)}
                        value={place}
                        placeholder={"서울시 OO구"}
                    />
                </div>
            </div>
        </section>
    );
}
