import styles from "./Show.module.scss";
import { ShowList } from "../../data/ShowList";
import { useEffect, useState } from "react";
import Link from "next/link";

interface BoardListType {
    number: number;
    title: string;
    writer: string;
    date: string;
    view: number;
}

export default function Show() {
    const [show, setShow] = useState<Array<BoardListType>>([]);
    const [viewCount, setViewCount] = useState(10);
    const [viewStart, setViewStart] = useState(0);

    function calculatePageNumber() {
        let result = ~~(viewStart / viewCount) + 1;
        return ~~(result / 11) * 10 + 1;
    }

    // 게시판의 게시글 출력
    function pagingContent(start: number, end: number) {
        let result = [];
        for (let i = start; i < end; i++) {
            if (show[i]) {
                result.push(
                    <tr
                        key={"show-" + i}
                        className={styles.boardTableBodyContent}
                        onClick={(_) => (window.location.href = "/invite/" + show[i].number)}
                    >
                        <td>{show[i].number}</td>
                        <td>{show[i].title}</td>
                        <td>{show[i].writer}</td>
                        <td>{show[i].date}</td>
                        <td>{show[i].view}</td>
                    </tr>
                );
            }
        }
        return result;
    }

    // 게시판의 페이지 수 파악
    function pagingCount() {
        const result = Math.ceil(show.length / viewCount) - calculatePageNumber();
        return result + 1;
    }

    useEffect(() => {
        setShow(ShowList);
    }, []);

    useEffect(() => {
        pagingContent(viewStart, viewStart + viewCount);
    }, [viewStart, viewCount]);

    return (
        <main>
            <section className={styles.show}>
                <div>
                    <div>
                        <h1>공연 모집</h1>
                        <div>
                            <select onChange={(e) => setViewCount(~~e.target.value)} value={viewCount}>
                                <option value="10" defaultChecked>
                                    10개씩 보기
                                </option>
                                <option value="20">20개씩 보기</option>
                                <option value="50">50개씩 보기</option>
                                <option value="100">100개씩 보기</option>
                            </select>
                            <Link href={"/invitewrite"}>
                                <button>작성하기</button>
                            </Link>
                        </div>
                    </div>
                    <table className={styles.showTable}>
                        <thead className={styles.showTableHead}>
                            <tr>
                                <th>번호</th>
                                <th>제목</th>
                                <th>작성자</th>
                                <th>작성일</th>
                                <th>조회</th>
                            </tr>
                        </thead>

                        <tbody className={styles.showTableBody}>
                            {pagingContent(viewStart, viewStart + viewCount)}
                        </tbody>
                    </table>

                    <div className={styles.showTableFoot}>
                        <button
                            onClick={() => setViewStart((v) => v - viewCount)}
                            disabled={~~(viewStart / viewCount) === 0}
                        >
                            &lt;
                        </button>
                        {Array.from({ length: Math.min(10, pagingCount()) }, () => calculatePageNumber()).map(
                            (item, i) => {
                                return (
                                    <button
                                        key={"show-paging-" + i}
                                        onClick={() => setViewStart(item * viewCount + i * viewCount - viewCount)}
                                    >
                                        {~~(viewStart / viewCount) + 1 === item + i ? (
                                            <b>{item + i}</b>
                                        ) : (
                                            <>{item + i}</>
                                        )}
                                    </button>
                                );
                            }
                        )}
                        <button
                            onClick={() => setViewStart((v) => v + viewCount)}
                            disabled={~~(viewStart / viewCount) + 1 === Math.ceil(show.length / viewCount)}
                        >
                            &gt;
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
}
