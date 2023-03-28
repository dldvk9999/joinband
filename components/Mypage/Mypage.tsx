import styles from "./Mypage.module.scss";
import Nav from "./Nav/Nav";
import Information from "./Information/Information";
import Video from "./Video/Video";
import Band from "./Band/Band";
import ChangePassword from "./ChangePassword/ChangePassword";
import DeleteUser from "./DeleteUser/DeleteUser";
import { useSelector } from "react-redux";
import { RootState } from "../../store/configureStore";
import { useRouter } from "next/router";
import { data } from "../../data/MypageData";
import { useEffect, useState } from "react";

export default function Mypage() {
    const [mypage, setMypage] = useState<JSX.Element[]>([]);
    const pageIndex = useSelector((state: RootState) => state.index.value);
    const router = useRouter();
    const { params } = router.query;

    function pageView(id: number) {
        let result = [<Nav />];
        if (pageIndex === 0) result.push(<Information id={id} />);
        else if (pageIndex === 2) result.push(<Band id={id} />);
        else if (pageIndex === 3) result.push(<ChangePassword id={id} />);
        else if (pageIndex === 4) result.push(<DeleteUser id={id} />);
        else result.push(<Video id={id} />);
        setMypage(result);
    }

    useEffect(() => {
        if (params && data.id !== ~~params!) {
            alert("사용자가 존재하지 않습니다.");
            window.history.back();
        } else {
            pageView(~~params!);
        }
    }, [params]);

    useEffect(() => {
        pageView(~~params!);
    }, [pageIndex]);

    return (
        <main>
            <section className={styles.mypage}>{mypage}</section>
        </main>
    );
}
