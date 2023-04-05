import { useEffect, useState } from "react";
import styles from "./Result.module.scss";
import { BandRoomList } from "../../../data/BandRoomList";
import { RootState } from "../../../store/configureStore";
import { useSelector } from "react-redux";

interface RoomsType {
    id: number;
    name: string;
    place1: string;
    place2: string;
    price: number;
}

interface BandRoomType {
    [key: string]: Array<string>;
}

export default function Result() {
    const [rooms, setRooms] = useState<Array<RoomsType>>();
    const bandRoom = useSelector((state: RootState) => state.bandRooms);

    useEffect(() => {
        setRooms(BandRoomList);
    }, []);

    useEffect(() => {
        if (Object.keys(bandRoom.value).length && rooms) {
            const tmp: BandRoomType = { ...bandRoom.value };
            setRooms(rooms.filter((el) => tmp[el.place1] && tmp[el.place1].includes(el.place2)));
        } else {
            setRooms(BandRoomList);
        }
    }, [bandRoom]);

    return (
        <section className={styles.result}>
            <h1>검색 결과 {rooms ? rooms.length : 0}건</h1>
            <div className={styles.resultTable}>
                <div className={styles.resultTableHead}>
                    <p>번호</p>
                    <p>이름</p>
                    <p className={styles.resultTableSub}>시간 당 가격</p>
                </div>
                {rooms ? (
                    rooms.map((item, i) => {
                        return (
                            <div className={styles.resultTableBody} key={"result-result-" + i}>
                                <p>{i + 1}</p>
                                <p>
                                    {item.name}_{item.place1}_{item.place2}
                                </p>
                                <p className={styles.resultTableSub}>{item.price.toLocaleString()}원</p>
                            </div>
                        );
                    })
                ) : (
                    <div className={`${styles.resultTableBody} ${styles.resultTableNone}`}>
                        <p>검색 결과가 없습니다 :(</p>
                    </div>
                )}
            </div>
        </section>
    );
}
