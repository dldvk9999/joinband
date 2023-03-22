import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "./Contents.module.scss";
import Link from "next/link";

export default function Contents() {
    const router = useRouter();
    const { params } = router.query;
    const [number, setNumber] = useState(1);

    // 게시물 삭제
    function deleteContent() {
        if (confirm("게시물을 삭제하시겠습니까?")) {
            alert(number + " 삭제완료");
        }
    }

    useEffect(() => {
        setNumber(~~params! ? ~~params! : 1);
    }, [params]);

    return (
        <main>
            <section className={styles.contents}>
                <div>
                    <div className={styles.contentHeader}>
                        <h1>밴드 구인</h1>
                        <div>
                            <p>2023.01.01</p>
                            <p>
                                <Link href={"/user/admin"}>
                                    <b>Admin</b>
                                </Link>
                            </p>
                            <p>조회수 1234</p>
                        </div>
                    </div>
                    <hr />
                    <div className={styles.contentsContent}>
                        <div className={styles.contentContentMenu}>
                            <button onClick={() => (window.location.href = "/memberjoin")}>목록</button>
                            <button onClick={deleteContent}>삭제</button>
                        </div>
                        밴드 구인합니다. 많은 지원 부탁드립니다.
                    </div>
                    <hr />
                    <div className={styles.contentWrite}>
                        <textarea className={styles.contentWriteComment} placeholder={"댓글을 입력해주세요"}></textarea>
                        <button>댓글달기</button>
                    </div>
                </div>
            </section>
        </main>
    );
}
