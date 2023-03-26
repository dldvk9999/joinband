import styles from "./Header.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// Header에서 접속 가능한 각 페이지 이름과 링크 주소
const HeaderRouter = ["게시판", "회원모집", "합주실예약", "공연모집"];
const HeaderLink = ["board", "memberjoin", "reservation", "invite"];
const StandardMobileWidth = 730;

export default function Header() {
    const [isLogin, setLogin] = useState(false);
    const [isMobile, setMobile] = useState(false);
    const nav = useRef<HTMLElement>(null);

    // nav open
    function openNav(nav: any) {
        nav.current!.classList.add("active");
    }

    // nav close
    function closeNav(nav: any) {
        nav.current!.classList.remove("active");
    }

    function logout() {
        localStorage.removeItem("id");
        window.location.href = "/";
    }

    useEffect(() => {
        // 로그인 상태 체크
        setLogin(localStorage["id"] && localStorage["id"] !== "");

        // Viewport width가 (StandardMobileWidth)px 이하일 경우 모바일로 간주
        setMobile(window.innerWidth < StandardMobileWidth);
        window.addEventListener("resize", () => setMobile(window.innerWidth < StandardMobileWidth));

        return () => {
            window.removeEventListener("resize", () => setMobile(window.innerWidth < StandardMobileWidth));
        };
    }, []);

    return (
        <header className={styles.header}>
            {/* 로고, 메뉴 */}
            <div>
                <div className={styles.headerLogo}>
                    <Link href={"/"}>
                        <b>JOINBAND</b>
                    </Link>
                </div>
                {!isMobile &&
                    HeaderRouter.map((item, index) => {
                        return (
                            <Link href={"/" + HeaderLink[index]} key={"HeaderRouter-" + index}>
                                {item}
                            </Link>
                        );
                    })}
            </div>

            {/* 로그인/로그아웃, 회원가입 */}
            {!isMobile ? (
                <div>
                    {isLogin ? (
                        <>
                            <Link href={"/mypage"}>마이페이지</Link>
                            <Link href={"/"} onClick={logout}>
                                로그아웃
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link href={"/login"}>로그인</Link>
                            <Link href={"/signup"}>회원가입</Link>
                        </>
                    )}
                </div>
            ) : (
                <>
                    <div>
                        <button className={styles.headerNavBtn} onClick={() => openNav(nav)} aria-label="menu">
                            <svg viewBox="0 0 24 24" width="24" height="24">
                                <path d="M 2 5 L 2 7 L 22 7 L 22 5 L 2 5 z M 2 11 L 2 13 L 22 13 L 22 11 L 2 11 z M 2 17 L 2 19 L 22 19 L 22 17 L 2 17 z" />
                            </svg>
                        </button>
                    </div>

                    <nav ref={nav} aria-label="네비게이션 메뉴">
                        <div className={styles.headerNavClose}>
                            <button
                                className={styles.headerNavBtn}
                                onClick={() => closeNav(nav)}
                                aria-label="navigation close button"
                            >
                                <svg viewBox="0 0 120.64 122.88" width="17" height="17">
                                    <path d="M66.6,108.91c1.55,1.63,2.31,3.74,2.28,5.85c-0.03,2.11-0.84,4.2-2.44,5.79l-0.12,0.12c-1.58,1.5-3.6,2.23-5.61,2.2 c-2.01-0.03-4.02-0.82-5.55-2.37C37.5,102.85,20.03,84.9,2.48,67.11c-0.07-0.05-0.13-0.1-0.19-0.16C0.73,65.32-0.03,63.19,0,61.08 c0.03-2.11,0.85-4.21,2.45-5.8l0.27-0.26C20.21,37.47,37.65,19.87,55.17,2.36C56.71,0.82,58.7,0.03,60.71,0 c2.01-0.03,4.03,0.7,5.61,2.21l0.15,0.15c1.57,1.58,2.38,3.66,2.41,5.76c0.03,2.1-0.73,4.22-2.28,5.85L19.38,61.23L66.6,108.91 L66.6,108.91z M118.37,106.91c1.54,1.62,2.29,3.73,2.26,5.83c-0.03,2.11-0.84,4.2-2.44,5.79l-0.12,0.12 c-1.57,1.5-3.6,2.23-5.61,2.21c-2.01-0.03-4.02-0.82-5.55-2.37C89.63,101.2,71.76,84.2,54.24,67.12c-0.07-0.05-0.14-0.11-0.21-0.17 c-1.55-1.63-2.31-3.76-2.28-5.87c0.03-2.11,0.85-4.21,2.45-5.8C71.7,38.33,89.27,21.44,106.8,4.51l0.12-0.13 c1.53-1.54,3.53-2.32,5.54-2.35c2.01-0.03,4.03,0.7,5.61,2.21l0.15,0.15c1.57,1.58,2.38,3.66,2.41,5.76 c0.03,2.1-0.73,4.22-2.28,5.85L71.17,61.23L118.37,106.91L118.37,106.91z" />
                                </svg>
                            </button>
                        </div>
                        <div className={styles.headerNavList}>
                            <div>
                                {HeaderRouter.map((item, index) => {
                                    return (
                                        <Link href={"/" + HeaderLink[index]} key={"HeaderRouter-" + index}>
                                            {item}
                                        </Link>
                                    );
                                })}
                                <hr />
                                {isLogin ? (
                                    <>
                                        <Link href={"/logout"}>로그아웃</Link>
                                        <Image
                                            src={"/profile.webp"}
                                            alt={"logo"}
                                            width={40}
                                            height={40}
                                            priority
                                        ></Image>
                                    </>
                                ) : (
                                    <>
                                        <Link href={"/login"}>로그인</Link>
                                        <Link href={"/signup"}>회원가입</Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </nav>
                </>
            )}
        </header>
    );
}
