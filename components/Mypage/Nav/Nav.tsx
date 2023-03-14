import styles from "./Nav.module.scss";
import Image from "next/image";

export default function Nav() {
    return (
        <section className={styles.nav}>
            <Image src={"/profile.webp"} alt={"profile"} width={200} height={200} className={styles.navProfile}></Image>
            <p>
                <b>이름</b>
            </p>
            <p>한줄 자기소개</p>
            <hr />
            <div className={styles.navRouter}>
                <p>내 정보</p>
                <p>내 동영상</p>
                <p>비밀번호 변경</p>
                <p>회원탈퇴</p>
            </div>
        </section>
    );
}
