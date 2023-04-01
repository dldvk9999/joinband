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
    const [password, setPassword] = useState("");
    const [isDisabled, setDisabled] = useState(true);

    function saveInfo() {
        if (password === data.password) {
            data.email = email;
            data.name = name;
            data.nickname = nickname;
            data.part = part;
            data.live = place;
            alert("저장 완료!");
        } else {
            alert("비밀번호가 일치하지 않습니다.");
        }
    }

    useEffect(() => {
        if (data.id === props.id) {
            setEmail(data.email);
            setName(data.name);
            setNickname(data.nickname);
            setPart(partList.includes(data.part) ? data.part : "Etc");
            setPlace(data.live);
        } else {
            alert("등록되지 않은 id 입니다.");
            window.history.back();
        }
    }, []);

    useEffect(() => {
        if (
            [email, name, nickname, part, place].toString() !==
            [data.email, data.name, data.nickname, data.part, data.live].toString()
        ) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [email, name, nickname, part, place]);

    return (
        <section className={styles.information}>
            <h1>내 정보</h1>
            <hr />
            <div className={styles.informationList}>
                <div>
                    <button onClick={saveInfo} disabled={isDisabled}>
                        저장
                    </button>
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
                <div>
                    <p>현재 비밀번호</p>
                    <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
                </div>
            </div>
        </section>
    );
}
