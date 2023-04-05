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
    const [rooms, setRooms] = useState<Array<RoomsType>>([]);
    const [sorting, setSorting] = useState(0);
    const [filterReady, setFilterReady] = useState(false);
    const bandRoom = useSelector((state: RootState) => state.bandRooms);

    // sorting 로직
    function sortingRooms(room: Array<RoomsType>, type: number) {
        let sortRooms = [...room];
        switch (type) {
            case 0:
                sortRooms.sort((a, b) => a.id - b.id); // 번호 낮은 순
                break;
            case 1:
                sortRooms.sort((a, b) => b.id - a.id); // 번호 높은 순
                break;
            case 2:
                sortRooms.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0)); // 이름 낮은 순
                break;
            case 3:
                sortRooms.sort((a, b) => (a.name > b.name ? -1 : a.name < b.name ? 1 : 0)); // 이름 높은 순
                break;
            case 4:
                sortRooms.sort((a, b) => a.price - b.price); // 가격 낮은 순
                break;
            case 5:
                sortRooms.sort((a, b) => b.price - a.price); // 가격 높은 순
                break;
            default: // 번호 낮은 순 (디폴트)
                sortRooms.sort((a, b) => a.id - b.id);
                break;
        }
        setSorting(type);
        setRooms(sortRooms);
    }

    useEffect(() => {
        setRooms(BandRoomList);
    }, []);

    // Redux Array가 변경될 때마다 Result 값 필터링
    useEffect(() => {
        let filteredRooms = [];
        if (Object.keys(bandRoom.value).length) {
            const tmp: BandRoomType = { ...bandRoom.value };
            filteredRooms = BandRoomList.filter((el) => tmp[el.place1] && tmp[el.place1].includes(el.place2));
        } else {
            filteredRooms = BandRoomList;
        }

        if (filterReady) {
            sortingRooms(filteredRooms, sorting);
        } else {
            setFilterReady(true);
        }
    }, [bandRoom]);

    return (
        <section className={styles.result}>
            <div className={styles.resultTitle}>
                <h1>검색 결과 {rooms ? rooms.length : 0}건</h1>
                <div>
                    <select onChange={(e) => sortingRooms(rooms, ~~e.target.value)} value={sorting}>
                        <option value={0}>번호 낮은순</option>
                        <option value={1}>번호 높은순</option>
                        <option value={2}>이름 낮은순</option>
                        <option value={3}>이름 높은순</option>
                        <option value={4}>가격 낮은순</option>
                        <option value={5}>가격 높은순</option>
                    </select>
                    <button>등록하기</button>
                </div>
            </div>
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
                                <p>{item.id}</p>
                                <p>
                                    {item.name}
                                    <span>{item.place1}</span>
                                    <span>{item.place2}</span>
                                </p>
                                <p className={styles.resultTableSub}>{item.price?.toLocaleString()}원</p>
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
