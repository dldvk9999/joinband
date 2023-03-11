import styles from "./Board.module.scss";
import { BoardList } from "../../data/BoardList";
import { useEffect, useState } from "react";

interface BoardListType {
    number: number;
    title: string;
    writer: string;
    date: string;
    view: number;
}

export default function Board() {
    const [board, setBoard] = useState<Array<BoardListType>>([]);
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
            if (board[i]) {
                result.push(
                    <tr key={"board-" + i}>
                        <td>{board[i].number}</td>
                        <td>{board[i].title}</td>
                        <td>{board[i].writer}</td>
                        <td>{board[i].date}</td>
                        <td>{board[i].view}</td>
                    </tr>
                );
            }
        }
        return result;
    }

    // 게시판의 페이지 수 파악
    function pagingCount() {
        const result = Math.ceil(board.length / viewCount) - calculatePageNumber();
        return result + 1;
    }

    useEffect(() => {
        setBoard(BoardList);
    }, []);

    useEffect(() => {
        pagingContent(viewStart, viewStart + viewCount);
    }, [viewCount]);

    return (
        <main>
            <section className={styles.board}>
                <div>
                    <div>
                        <h1>자유 게시판</h1>
                        <select onChange={(e) => setViewCount(~~e.target.value)} value={viewCount}>
                            <option value="10" defaultChecked>
                                10개씩 보기
                            </option>
                            <option value="20">20개씩 보기</option>
                            <option value="50">50개씩 보기</option>
                            <option value="100">100개씩 보기</option>
                        </select>
                    </div>
                    <table className={styles.boardTable}>
                        <thead className={styles.boardTableHead}>
                            <tr>
                                <th>번호</th>
                                <th>제목</th>
                                <th>작성자</th>
                                <th>작성일</th>
                                <th>조회</th>
                            </tr>
                        </thead>

                        <tbody className={styles.boardTableBody}>
                            {pagingContent(viewStart, viewStart + viewCount)}
                        </tbody>
                    </table>

                    <div className={styles.boardTableFoot}>
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
                                        key={"board-paging-" + i}
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
                            disabled={~~(viewStart / viewCount) + 1 === Math.ceil(board.length / viewCount)}
                        >
                            &gt;
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
}
