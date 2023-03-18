import styles from "./Mypage.module.scss";
import { useEffect } from "react";
import Nav from "./Nav/Nav";
import Information from "./Information/Information";
import Video from "./Video/Video";
import ChangePassword from "./ChangePassword/ChangePassword";
import DeleteUser from "./DeleteUser/DeleteUser";
import { useSelector } from "react-redux";
import { RootState } from "../../store/configureStore";
import { useDispatch } from "react-redux";
import { change } from "../../store/modules/mypage";

export default function Mypage() {
    const pageIndex = useSelector((state: RootState) => state.index.value);
    const dispatch = useDispatch();
    const handlePageIndexer = (index: number) => dispatch(change(index));

    function pageView() {
        if (pageIndex === 0) return <Information />;
        else if (pageIndex === 2) return <ChangePassword />;
        else if (pageIndex === 3) return <DeleteUser />;
        else return <Video />;
    }

    useEffect(() => {
        if (pageIndex !== 1) handlePageIndexer(1);
    }, [pageIndex]);

    return (
        <main>
            <section className={styles.mypage}>
                <Nav />
                {pageView()}
            </section>
        </main>
    );
}
