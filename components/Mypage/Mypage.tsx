import styles from "./Mypage.module.scss";
import Nav from "./Nav/Nav";
import Information from "./Information/Information";
import Video from "./Video/Video";
import ChangePassword from "./ChangePassword/ChangePassword";
import DeleteUser from "./DeleteUser/DeleteUser";
import { useSelector } from "react-redux";
import { RootState } from "../../store/configureStore";

export default function Mypage() {
    const counterValue = useSelector((state: RootState) => state.index.value);

    function pageView() {
        if (counterValue === 0) return <Information />;
        else if (counterValue === 2) return <ChangePassword />;
        else if (counterValue === 3) return <DeleteUser />;
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
