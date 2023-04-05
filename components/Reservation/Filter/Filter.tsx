import styles from "./Filter.module.scss";
import Image from "next/image";
import { CityList } from "../../../data/CityList";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { change } from "../../../store/modules/bandrooms";
import { RootState } from "../../../store/configureStore";
import { useSelector } from "react-redux";

interface CitiesType {
    [key: string]: Array<string>;
}

interface CitiesCheckType {
    [key: string]: Array<boolean>;
}

export default function Filter() {
    const [cities, setCities] = useState<CitiesType>({});
    const [isOpen, setOpen] = useState<Array<boolean>>([]);
    const [checkCities, setCheckCities] = useState<CitiesCheckType>({});
    const dispatch = useDispatch();
    const handleBandRooms = (arr: {}) => dispatch(change(arr));
    const bandRoom = useSelector((state: RootState) => state.bandRooms);

    // 배열 비교 함수
    function arrayCompare(arr: Array<boolean>, el: boolean) {
        return JSON.stringify(arr.slice(1)) === JSON.stringify(Array.from({ length: arr.length - 1 }, () => el));
    }

    // 필터 - 제목 필터 중립 값("-" 표시)
    function tabCheckStateIndeterminate(keyNumber: number, result: boolean) {
        if (keyNumber !== -1) {
            (document.querySelector("#area" + keyNumber)! as HTMLInputElement).indeterminate = result;
        }
    }

    // 필터 - 체크박스 상태 변경
    function tabCheckState(key: string, index: number, keyNumber: number = -1) {
        let tmp = checkCities[key];

        // 체크 상태 변환
        if (index === 0) {
            tmp = Array.from({ length: tmp.length }, () => !tmp[index]);
        } else {
            tmp[index] = !tmp[index];
        }

        // redux 변수 내 필터 배열 정리
        const tmpRedux: CitiesType = { ...bandRoom.value };
        if (tmp[index]) {
            if (tmpRedux[key]) {
                tmpRedux[key] = [...tmpRedux[key], cities[key][index - 1]];
            } else {
                tmpRedux[key] = [cities[key][index - 1]];
            }
        } else {
            tmpRedux[key] = tmpRedux[key].filter((el) => el !== cities[key][index - 1]);
        }

        // 세부 필터가 모두 같은 값일 때 제목 필터도 같은 값으로 변경
        if (arrayCompare(tmp, true)) {
            tmp[0] = true;
            tabCheckStateIndeterminate(keyNumber, false);
            tmpRedux[key] = [...CityList[key]];
        } else if (arrayCompare(tmp, false)) {
            tmp[0] = false;
            tabCheckStateIndeterminate(keyNumber, false);
            tmpRedux[key] = [];
        } else {
            tabCheckStateIndeterminate(keyNumber, true);
        }
        setCheckCities({ ...checkCities, [key]: tmp });

        // Redux 전역 변수 저장
        handleBandRooms(tmpRedux);

        // Redux Array 중 '서울: []' 같은 경우 '서울'에 대한 key 값 제거
        if (Object.keys(bandRoom.value).length) {
            let tmp: CitiesType = {};
            Object.keys(tmpRedux).map((item) => {
                if (tmpRedux[item].length !== 0) {
                    tmp[item] = [...tmpRedux[item]];
                }
            });
            handleBandRooms(tmp);
        }
    }

    // 필터 - 세부 필터 오픈 상태 변경
    function tabState(index: number) {
        setOpen(isOpen.map((item, i) => (i === index ? !item : item)));
    }

    useEffect(() => {
        setCities(CityList);
    }, []);

    useEffect(() => {
        setOpen(Array.from({ length: Object.keys(cities).length }, () => false));

        // 각 체크박스 초기화
        let tmp: CitiesCheckType = {};
        Object.keys(cities).map((item) => {
            tmp[item] = Array.from({ length: cities[item].length + 1 }, () => false);
        });
        setCheckCities(tmp);
    }, [cities]);

    return (
        <aside className={styles.filter}>
            <p>장소 필터(시/군)</p>
            <div>
                {Object.keys(cities).map((city, i) => {
                    return (
                        <div className={styles.filterList} key={"filter-" + i}>
                            <div className={styles.filterListTitle}>
                                <div>
                                    <input
                                        type="checkbox"
                                        id={"area" + i}
                                        onChange={() => tabCheckState(city, 0)}
                                        checked={Object.keys(checkCities).length ? checkCities[city][0] : false}
                                    />
                                    <label htmlFor={"area" + i}>{city}</label>
                                </div>
                                <button className={styles.filterDownArrow} onClick={() => tabState(i)}>
                                    <Image
                                        src={"/down-arrow.webp"}
                                        alt={"down arrow"}
                                        width={20}
                                        height={20}
                                        priority
                                        className={`${styles.filterTab} ${
                                            isOpen[i] ? styles.filterTabOpen : styles.filterTabClose
                                        }`}
                                    />
                                </button>
                            </div>
                            {cities[city].map((area, j) => {
                                return (
                                    <div
                                        className={`${styles.filterListSub} ${!isOpen[i] && styles.filterHidden}`}
                                        key={"filter-area-" + j}
                                    >
                                        <input
                                            type="checkbox"
                                            id="area-detail"
                                            checked={Object.keys(checkCities).length ? checkCities[city][j + 1] : false}
                                            onChange={() => tabCheckState(city, j + 1, i)}
                                        />
                                        <label htmlFor="area-detail">{area}</label>
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </aside>
    );
}
