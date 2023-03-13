import { useState } from "react";
import styles from "./Write.module.scss";

export default function Write() {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    // 게시글 취소
    function cancelContents() {
        if (confirm("기존 작성된 데이터는 저장되지 않습니다. \r\n취소하시겠습니까?")) {
            window.history.back();
        }
    }

    // 게시글 추가
    function addContents() {
        alert("게시글 등록 완료!");
        window.location.href = "/board";
    }

    return (
        <main>
            <section className={styles.write}>
                <div>
                    <h1>게시글 작성</h1>
                    <input
                        type="text"
                        placeholder="제목을 입력하세요"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                    <hr />
                    <textarea
                        cols={30}
                        rows={10}
                        placeholder={"내용을 입력해주세요"}
                        onChange={(e) => setBody(e.target.value)}
                        className={styles.writeTextarea}
                        value={body}
                    ></textarea>
                    <div className={styles.writeBtns}>
                        <button onClick={(_) => cancelContents()}>취소</button>
                        <button onClick={(_) => addContents()}>등록</button>
                    </div>
                </div>
            </section>
        </main>
    );
}
