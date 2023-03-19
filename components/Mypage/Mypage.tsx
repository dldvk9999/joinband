import styles from "./Mypage.module.scss";
import Nav from "./Nav/Nav";
import Information from "./Information/Information";
import Video from "./Video/Video";
import Band from "./Band/Band";
import ChangePassword from "./ChangePassword/ChangePassword";
import DeleteUser from "./DeleteUser/DeleteUser";
import { useSelector } from "react-redux";
import { RootState } from "../../store/configureStore";

export default function Mypage() {
    const pageIndex = useSelector((state: RootState) => state.index.value);

    function pageView() {
        if (pageIndex === 0) return <Information />;
        else if (pageIndex === 2) return <Band />;
        else if (pageIndex === 3) return <ChangePassword />;
        else if (pageIndex === 4) return <DeleteUser />;
        else return <Video />;
    }

    return (
        <main>
            <section className={styles.mypage}>
                <Nav />
                {pageView()}
            </section>
        </main>
    );
}
