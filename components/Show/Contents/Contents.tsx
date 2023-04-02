import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "./Contents.module.scss";
import { ShowList } from "../../../data/ShowList";
import Link from "next/link";
import Image from "next/image";

interface ShowListType {
    number: number;
    title: string;
    content: string;
    writer: string;
    date: string;
    view: number;
}

export default function Contents() {
    const router = useRouter();
    const { params } = router.query;
    const [number, setNumber] = useState(1);
    const [contents, setContents] = useState<ShowListType>({
        number: 0,
        title: "",
        content: "",
        writer: "",
        date: "",
        view: 0,
    });

    // 공연 모집 글 삭제
    function deleteContent() {
        if (confirm("공연 모집 글을 삭제하시겠습니까?")) {
            alert(number + " 삭제완료");
        }
    }

    useEffect(() => {
        if (ShowList[number - 1]) setContents(ShowList[number - 1]);
        else window.location.href = "/notfound";
    }, [number]);

    useEffect(() => {
        setNumber(~~params! ? ~~params! : 1);
    }, [params]);

    useEffect(() => {
        console.log(contents.content);
    }, [contents]);

    return (
        <main>
            <section className={styles.contents}>
                <div>
                    <div className={styles.contentHeader}>
                        <h1>{contents.title}</h1>
                        <div>
                            <p>{contents.date}</p>
                            <p>
                                <Link href={"/mypage/" + contents.number}>
                                    <b>{contents.writer}</b>
                                </Link>
                            </p>
                            <p>조회수 {contents.view}</p>
                        </div>
                    </div>
                    <hr />
                    <div className={styles.contentsContent}>
                        <div className={styles.contentContentMenu}>
                            <button onClick={() => (window.location.href = "/invite")}>목록</button>
                            <button onClick={deleteContent}>삭제</button>
                        </div>
                        <div className={styles.contentContentImage}>
                            <Image
                                src={contents.content}
                                alt={"Show Image"}
                                width={100}
                                height={200}
                                priority
                                className={styles.contentImage}
                            />
                        </div>
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
