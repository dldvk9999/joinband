import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "./Contents.module.scss";
import { BoardList } from "../../../data/BoardList";
import Link from "next/link";
import Image from "next/image";

interface BoardCommentListType {
    commentId: number;
    userId: number;
    user: string;
    time: string;
    data: string;
}

interface BoardListType {
    number: number;
    title: string;
    content: string;
    writer: string;
    date: string;
    view: number;
    comment: Array<BoardCommentListType>;
}

export default function Contents() {
    const router = useRouter();
    const { params } = router.query;
    const [number, setNumber] = useState(1);
    const [comment, setComment] = useState("");
    const [myId, setMyId] = useState(0);
    const [contents, setContents] = useState<BoardListType>({
        number: 0,
        title: "",
        content: "",
        writer: "",
        date: "",
        view: 0,
        comment: [],
    });

    // 댓글 추가
    function addComment() {
        const TIME_ZONE = 9 * 60 * 60 * 1000;
        const date = new Date();
        const commentData = {
            commentId: contents.comment.length,
            userId: 1,
            user: "Admin",
            time: new Date(date.getTime() + TIME_ZONE).toISOString().replace("T", " ").slice(0, -5).toString(),
            data: comment,
        };
        setContents((con) => ({ ...con, comment: con.comment.concat(commentData) }));
        setComment("");
    }

    // 댓글 삭제
    function deleteComment(commentId: number) {
        if (confirm("댓글을 삭제하시겠습니까?")) {
            let commentList = [...contents.comment];
            commentList = commentList.filter((item) => item.commentId !== commentId);
            setContents((con) => ({ ...con, comment: commentList }));
            alert("삭제완료");
        }
    }

    // 게시물 삭제
    function deleteContent() {
        if (confirm("게시물을 삭제하시겠습니까?")) {
            alert(number + " 삭제완료");
        }
    }

    useEffect(() => {
        if (BoardList[number - 1]) setContents(BoardList[number - 1]);
        else window.location.href = "/notfound";
    }, [number]);

    useEffect(() => {
        setNumber(~~params! ? ~~params! : 1);
    }, [params]);

    useEffect(() => {
        setMyId(~~localStorage["userid"]);
    }, []);

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
                            <button onClick={() => (window.location.href = "/board")}>목록</button>
                            <button onClick={deleteContent}>삭제</button>
                        </div>
                        {contents.content}
                    </div>
                    <hr />
                    <div className={styles.contentWrite}>
                        <textarea
                            className={styles.contentWriteComment}
                            placeholder={"댓글을 입력해주세요"}
                            onChange={(e) => setComment(e.target.value)}
                            value={comment}
                        ></textarea>
                        <button onClick={addComment}>댓글달기</button>
                    </div>
                    {contents.comment.map((item, i) => {
                        return (
                            <div className={styles.contentComment} key={"board-comment-" + i}>
                                <Link href={"/mypage/" + item.userId}>
                                    <Image
                                        src={"/profile.webp"}
                                        alt={"profile"}
                                        width={50}
                                        height={50}
                                        loading="lazy"
                                    />
                                    <p>{item.user}</p>
                                </Link>
                                <div>
                                    <div>
                                        <p>{item.time}</p>
                                        <p onClick={() => deleteComment(item.commentId)} hidden={item.userId !== myId}>
                                            삭제
                                        </p>
                                    </div>
                                    <p>{item.data}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>
        </main>
    );
}
