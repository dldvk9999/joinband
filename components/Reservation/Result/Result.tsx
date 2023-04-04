import { useEffect, useState } from "react";
import styles from "./Result.module.scss";
import { BandRoomList } from "../../../data/BandRoomList";

interface RoomsType {
    id: number;
    name: string;
    place1: string;
    place2: string;
    price: number;
}

export default function Result() {
    const [rooms, setRooms] = useState<Array<RoomsType>>();

    useEffect(() => {
        setRooms(BandRoomList);
    }, []);

    return (
        <section className={styles.result}>
            <h1>합주실 리스트</h1>
            <div className={styles.resultTable}>
                <div className={styles.resultTableHead}>
                    <p>번호</p>
                    <p>이름</p>
                    <p className={styles.resultTableSub}>시간 당 가격</p>
                </div>
                {rooms?.map((item, i) => {
                    return (
                        <div className={styles.resultTableBody} key={"result-result-" + i}>
                            <p>{i + 1}</p>
                            <p>{item.name}</p>
                            <p className={styles.resultTableSub}>{item.price.toLocaleString()}원</p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
