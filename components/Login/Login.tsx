import { useState } from "react";
import styles from "./Login.module.scss";
import Image from "next/image";

export default function Login() {
    const [email, setEmail] = useState("");
    const [pass1, setPass1] = useState("");

    return (
        <main>
            <section className={`${styles.login} ${styles.loginLogin}`}>
                <Image
                    src={"/home/home1.webp"}
                    alt={"background image"}
                    width={100}
                    height={100}
                    loading={"lazy"}
                ></Image>
                <form action="/">
                    <h1>로그인</h1>
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
                    <button type="submit">로그인</button>
                </form>
            </section>
        </main>
    );
}
