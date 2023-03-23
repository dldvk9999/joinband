import styles from "./Memberjoin.module.scss";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { MemberjoinList } from "../../data/MemberjoinList";

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

    // 밴드 구인 카드 출력 (한번에 10개씩)
    function pushCard() {
        let result: any = [];
        for (let i = page.current * 10; i < page.current * 10 + 10; i++) {
            result.push(
                <Link href={"/memberjoin/" + MemberjoinList[i].number}>
                    <div className={styles.memberjoinCards} key={"memberjoin-cards-" + i}>
                        <h2>{MemberjoinList[i].title}</h2>
                        <Image
                            src={"/home/guitar.webp"}
                            alt={"recruit"}
                            width={100}
                            height={100}
                            priority
                            className={styles.memberjoinImg}
                        />
                        <div className={styles.memberjoinKeyword}>
                            {MemberjoinList[i].instrument.map((item) => item)}
                            <hr />
                            {MemberjoinList[i].songType.map((item) => item)}
                        </div>
                    </div>
                </Link>
            );
        }
        setCards((c) => c.concat(result));
    }

    // 맨 아래 Loading 이 보일 때 getCards() 호출
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
