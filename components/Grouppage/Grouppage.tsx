import styles from "./Grouppage.module.scss";
import Nav from "./Nav/Nav";
import Information from "./Information/Information";
import Video from "./Video/Video";
import DeleteUser from "./DeleteUser/DeleteUser";
import { data } from "../../data/MypageData";
import { useSelector } from "react-redux";
import { RootState } from "../../store/configureStore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Grouppage() {
    const [gpage, setGpage] = useState<JSX.Element[]>([]);
    const pageIndex = useSelector((state: RootState) => state.groupIndex.value);
    const router = useRouter();
    const { params } = router.query;

    function pageView(id: number) {
        let result = [<Nav key={"grouppage-nav-" + id} id={id} />];
        const key = "grouppage-contents-" + id;
        if (pageIndex === 0) result.push(<Information key={key} id={id} />);
        else if (pageIndex === 2) result.push(<DeleteUser key={key} id={id} />);
        else result.push(<Video key={key} id={id} />);
        setGpage(result);
    }

    useEffect(() => {
        const groupData = data.group.filter((item) => item.id === ~~params!);
        if (params && groupData.length === 0) {
            alert("해당 그룹이 존재하지 않습니다.");
            window.history.back();
        } else {
            pageView(~~params!);
        }
        pageView(~~params!);
    }, [params, pageIndex]);

    return (
        <main>
            <section className={styles.grouppage}>{gpage}</section>
        </main>
    );
}
