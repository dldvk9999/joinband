import styles from "./Nav.module.scss";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { change } from "../../../store/modules/grouppage";
import { data } from "../../../data/MypageData";
import { useEffect, useState } from "react";

interface GroupType {
    id: number;
    name: string;
    introduce: string;
    user: Array<object>;
}

export default function Nav(props: { id: number }) {
    const dispatch = useDispatch();
    const handlePageIndexer = (index: number) => dispatch(change(index));
    const [useData, setUserData] = useState<GroupType>({
        id: -1,
        name: "",
        introduce: "",
        user: [],
    });

    useEffect(() => {
        if (!localStorage["id"] || localStorage["id"] === "") {
            alert("로그인을 먼저 해주세요.");
            window.location.href = "/login";
        } else {
            const groupData = data.group.filter((item) => item.id === props.id);
            if (groupData.length) {
                setUserData(groupData[0]);
            }
        }
    }, []);

    return (
        <section className={styles.nav}>
            <Image
                src={"/profile.webp"}
                alt={"profile"}
                width={200}
                height={200}
                priority
                className={styles.navProfile}
            />
            <p>
                <b>{useData.name}</b>
            </p>
            <p>{useData.introduce}</p>
            <hr />
            <div className={styles.navRouter}>
                <p onClick={() => handlePageIndexer(0)}>그룹 정보</p>
                <p onClick={() => handlePageIndexer(1)}>그룹 동영상</p>
                <p onClick={() => handlePageIndexer(2)}>그룹 탈퇴</p>
            </div>
        </section>
    );
}
