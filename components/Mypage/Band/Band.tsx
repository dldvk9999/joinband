import styles from "./Band.module.scss";
import { data } from "../../../data/MypageData";
import { useEffect, useState } from "react";
import Link from "next/link";

interface groupUserType {
    id: number;
    name: string;
    part: string;
}

interface groupType {
    id: number;
    name: string;
    user: Array<groupUserType>;
}

export default function Band(props: { id: number }) {
    const [myGroup, setGroup] = useState<Array<groupType>>([
        {
            id: 0,
            name: "",
            user: [],
        },
    ]);

    useEffect(() => {
        if (props.id === data.id) {
            setGroup(data.group);
        }
    }, []);

    return (
        <section className={styles.band}>
            <h1>내 밴드</h1>
            <hr />
            <div className={styles.bandList}>
                <div>
                    <button>추가</button>
                </div>
                {myGroup ? (
                    myGroup.map((mg, i) => {
                        return (
                            <Link
                                className={styles.bandLists}
                                key={"mypage-bandLists-" + i}
                                href={"/grouppage/" + (i + 1)}
                            >
                                <h2>{mg.name}</h2>
                                <div>
                                    {mg.user.map((item, j) => {
                                        return (
                                            <div className={styles.bandListsInfo} key={"mypage-bandListsInfo-" + j}>
                                                <p>{item.name}</p>
                                                <p>{item.part}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </Link>
                        );
                    })
                ) : (
                    <p>가입한 밴드가 없습니다.</p>
                )}
            </div>
        </section>
    );
}
