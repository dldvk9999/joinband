import styles from "./Nav.module.scss";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { change } from "../../../store/modules/mypage";

export default function Nav() {
    const dispatch = useDispatch();
    const handlePageIndexer = (index: number) => dispatch(change(index));

    return (
        <section className={styles.nav}>
            <Image
                src={"/profile.webp"}
                alt={"profile"}
                width={200}
                height={200}
                priority
                className={styles.navProfile}
            ></Image>
            <p>
                <b>이름</b>
            </p>
            <p>한줄 자기소개</p>
            <hr />
            <div className={styles.navRouter}>
                <p onClick={() => handlePageIndexer(0)}>내 정보</p>
                <p onClick={() => handlePageIndexer(1)}>내 동영상</p>
                <p onClick={() => handlePageIndexer(2)}>내 밴드</p>
                <p onClick={() => handlePageIndexer(3)}>비밀번호 변경</p>
                <p onClick={() => handlePageIndexer(4)}>회원탈퇴</p>
            </div>
        </section>
    );
}
