import styles from "./Memberjoin.module.scss";
import Image from "next/image";

const partList = ["드럼", "일렉기타", "통기타", "건반", "보컬", "Etc"];
const songType = ["클래식", "발라드", "락", "CCM", "블루스", "재즈", "컨트리", "디스코", "트로트", "EDM"];

export default function Memberjoin() {
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
    function printCard() {
        let result = [];
        for (let i = 0; i < 10; i++) {
            result.push(
                <div className={styles.memberjoinCards} key={"memberjoin-cards-" + i}>
                    <h2>밴드원 모집 중asdafasfassadasdasdasdas</h2>
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
            );
        }
        return result;
    }

    return (
        <main>
            <section className={styles.memberjoin}>{printCard()}</section>
        </main>
    );
}
