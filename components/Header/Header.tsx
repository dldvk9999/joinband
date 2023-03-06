import styles from "./Header.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Header에서 접속 가능한 각 페이지 이름과 링크 주소
const HeaderRouter = ["게시판", "회원모집", "합주실예약", "공연모집"];
const HeaderLink = ["board", "memberjoin", "reservation", "invite"];

export default function Header() {
    const [isLogin, setLogin] = useState(false);

    return (
        <header className={styles.header}>
            {/* 로고, 메뉴 */}
            <div>
                <div className={styles.headerLogo}>
                    <Link href={"/"}>
                        <b>JOINBAND</b>
                    </Link>
                </div>
                {HeaderRouter.map((item, index) => {
                    return (
                        <Link href={"/" + HeaderLink[index]} key={"HeaderRouter-" + index}>
                            {item}
                        </Link>
                    );
                })}
            </div>

            {/* 로그인/로그아웃, 회원가입 */}
            <div>
                {isLogin ? (
                    <>
                        <Link href={"/logout"}>로그아웃</Link>
                        <Image src={"/profile.webp"} alt={"logo"} width={40} height={40} priority></Image>
                    </>
                ) : (
                    <>
                        <Link href={"/login"}>로그인</Link>
                        <Link href={"/signup"}>회원가입</Link>
                    </>
                )}
            </div>
        </header>
    );
}
