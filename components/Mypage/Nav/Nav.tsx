import styles from "./Nav.module.scss";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { change } from "../../../store/modules/mypage";

export default function Nav() {
    const dispatch = useDispatch();
    const handlePluseCounter = (index: number) => dispatch(change(index));

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
                <p onClick={() => handlePluseCounter(0)}>내 정보</p>
                <p onClick={() => handlePluseCounter(1)}>내 동영상</p>
                <p onClick={() => handlePluseCounter(2)}>비밀번호 변경</p>
                <p onClick={() => handlePluseCounter(3)}>회원탈퇴</p>
            </div>
        </section>
    );
}
