import styles from "./Memberjoin.module.scss";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import Link from "next/link";

const partList = ["드럼", "일렉기타", "통기타", "건반", "보컬", "Etc"];
const songType = ["클래식", "발라드", "락", "CCM", "블루스", "재즈", "컨트리", "디스코", "트로트", "EDM"];

export default function Memberjoin() {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState("Loading...");
    const page = useRef(0);
    const [ref, inView] = useInView();

    // 회원 모집 글 불러오기
    const getCards = useCallback(() => {
        try {
            if (page.current !== 10) {
                pushCard();
                page.current++;
            } else {
                setLoading("");
            }
        } catch (e) {
            console.log(e);
            alert("getCards Error");
        }
    }, []);

    // 랜덤한 모집 글 생성 (API 연동 시 삭제 예정)
    function random(type: "instru" | "song") {
        const randomType = type === "instru" ? partList : songType;
        let result = [];
        for (let i = 0; i < randomType.length; i++) {
            if (Math.round(Math.random())) {
                result.push(<p key={"random-" + i}>{randomType[i]}</p>);
            }
        }
        return result;
    }

    // 밴드 구인 카드 출력 (한번에 10개씩)
    function pushCard() {
        let result: any = [];
        for (let i = page.current * 10; i < page.current * 10 + 10; i++) {
            result.push(
                <Link href={"/memberjoin/" + i}>
                    <div className={styles.memberjoinCards} key={"memberjoin-cards-" + i}>
                        <h2>밴드원 모집 중</h2>
                        <Image
                            src={"/home/guitar.webp"}
                            alt={"recruit"}
                            width={100}
                            height={100}
                            priority
                            className={styles.memberjoinImg}
                        />
                        <div className={styles.memberjoinKeyword}>
                            {random("instru")}
                            <hr />
                            {random("song")}
                        </div>
                    </div>
                </Link>
            );
        }
        setCards((c) => c.concat(result));
    }

    useEffect(() => {
        if (inView) {
            getCards();
        }
    }, [fetch, inView]);

    useEffect(() => {
        getCards();
    }, []);

    return (
        <main>
            <div className={styles.memberjoin}>
                <div className={styles.memberjoinWrite}>
                    <Link href={"/memberjoinwrite"}>
                        <button>작성하기</button>
                    </Link>
                </div>
                <section className={styles.memberjoinSection}>{cards}</section>
            </div>
            <div ref={ref} className={styles.memberjoinLoading}>
                {loading}
            </div>
        </main>
    );
}
