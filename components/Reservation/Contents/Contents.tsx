import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "./Contents.module.scss";
import { BandRoomList } from "../../../data/BandRoomList";

interface RoomsType {
    id: number;
    name: string;
    place1: string;
    place2: string;
    price: number;
    data: string;
    link: string;
}

export default function Contents() {
    const router = useRouter();
    const { params } = router.query;
    const [number, setNumber] = useState(1);
    const [contents, setContents] = useState<RoomsType>({
        id: 0,
        name: "",
        place1: "",
        place2: "",
        price: 0,
        data: "",
        link: "",
    });

    // 게시물 삭제
    function deleteContent() {
        if (confirm("게시물을 삭제하시겠습니까?")) {
            alert(number + " 삭제완료");
        }
    }

    useEffect(() => {
        if (BandRoomList[number - 1]) setContents(BandRoomList[number - 1]);
        else window.location.href = "/notfound";
    }, [number]);

    useEffect(() => {
        setNumber(~~params! ? ~~params! : 1);
    }, [params]);

    return (
        <main>
            <section className={styles.contents}>
                <div>
                    <div className={styles.contentHeader}>
                        <h1>{contents.name}</h1>
                        <div>
                            <p>{contents.place1}</p>
                            <p>{contents.place2}</p>
                            <p>시간당{contents.price.toLocaleString()}원</p>
                        </div>
                    </div>
                    <hr />
                    <div className={styles.contentsContent}>
                        <div className={styles.contentContentMenu}>
                            <button onClick={() => (window.location.href = "/reservation")}>목록</button>
                            <button onClick={deleteContent}>삭제</button>
                        </div>
                        {contents.data}
                    </div>
                    <div className={styles.contentBtn}>
                        <a href={contents.link} target="_black" rel="noreferrer noopener">
                            예약하러 가기
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}
