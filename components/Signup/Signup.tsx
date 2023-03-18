import styles from "./Signup.module.scss";
import Image from "next/image";
import { MouseEvent, useState } from "react";

const partList = ["드럼", "일렉기타", "통기타", "건반", "보컬", "Etc"];

export default function Signup() {
    const [email, setEmail] = useState("");
    const [pass1, setPass1] = useState("");
    const [pass2, setPass2] = useState("");
    const [name, setName] = useState("");
    const [nickname, setNickname] = useState("");
    const [birthYear, setBirthYear] = useState("");
    const [birthMonth, setBirthMonth] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [part, setPart] = useState("");
    const [place, setPlace] = useState("");
    const today = new Date();

    // 닉네임 중복 확인 함수
    function nicknameCheck(e: MouseEvent) {
        e.preventDefault();
        alert("닉네임 확인");
    }

    return (
        <main>
            <section className={`${styles.login} ${styles.loginSignup}`}>
                <Image
                    src={"/home/home1.webp"}
                    alt={"background image"}
                    width={100}
                    height={100}
                    loading={"lazy"}
                ></Image>
                <form action="/">
                    <h1>회원가입</h1>
                    <input
                        type="text"
                        placeholder="이름을 입력하세요"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                    <input
                        type="email"
                        placeholder="이메일을 입력하세요"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    <input
                        type="password"
                        placeholder="비밀번호를 입력하세요"
                        minLength={8}
                        onChange={(e) => setPass1(e.target.value)}
                        value={pass1}
                    />
                    <div className={styles.loginPasswordCheck}>
                        {pass1 === pass2 ? (
                            <p className={`${styles.loginPasswordTrue} ${styles.loginP}`}>
                                {pass1 && pass2 ? "일치" : ""}
                            </p>
                        ) : (
                            <p className={`${styles.loginPasswordFalse} ${styles.loginP}`}>{pass2 ? "불일치" : ""}</p>
                        )}
                        <input
                            type="password"
                            placeholder="비밀번호를 다시 입력하세요"
                            minLength={8}
                            onChange={(e) => setPass2(e.target.value)}
                            value={pass2}
                        />
                    </div>
                    <div className={styles.loginNicknameCheck}>
                        <button className={styles.loginNicknameCheckBtn} onClick={(e) => nicknameCheck(e)}>
                            중복확인
                        </button>
                        <input
                            type="text"
                            placeholder="닉네임을 입력하세요"
                            onChange={(e) => setNickname(e.target.value)}
                            value={nickname}
                        />
                    </div>
                    <div className={styles.loginBirth}>
                        <p className={`${styles.loginBirthTitle} ${styles.loginP}`}>생년월일</p>
                        <div>
                            <label htmlFor="birthYear">연도</label>
                            <input
                                name="birthYear"
                                type="number"
                                min="1900"
                                max={today.getFullYear()}
                                step="1"
                                value={birthYear ? birthYear : today.getFullYear()}
                                onChange={(e) => setBirthYear(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="birthMonth">월</label>
                            <input
                                name="birthMonth"
                                type="number"
                                min="1"
                                max="12"
                                step="1"
                                value={birthMonth ? birthMonth : today.getMonth() + 1}
                                onChange={(e) => setBirthMonth(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="birthDate">일</label>
                            <input
                                name="birthDate"
                                type="number"
                                min="1"
                                max="31"
                                step="1"
                                value={birthDate ? birthDate : today.getDate()}
                                onChange={(e) => setBirthDate(e.target.value)}
                            />
                        </div>
                    </div>
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
                    <input
                        type="text"
                        placeholder="사는 곳을 입력하세요 (ex. 서울시 OO구)"
                        onChange={(e) => setPlace(e.target.value)}
                        value={place}
                    />
                    <button type="submit">회원가입</button>
                </form>
            </section>
        </main>
    );
}
