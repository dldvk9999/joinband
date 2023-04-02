import { useState } from "react";
import styles from "./Write.module.scss";

export default function Write() {
    const [title, setTitle] = useState("");
    const [require, setRequire] = useState("");
    const [songType, setSongType] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [apply, setApply] = useState("");
    const [place, setPlace] = useState("");
    const [showStartDate, setShowStartDate] = useState("");
    const [showEndDate, setShowEndDate] = useState("");
    const [award, setAward] = useState("");
    const [poster, setPoster] = useState("");

    // 공연 모집 글 취소
    function cancelContents() {
        if (confirm("기존 작성된 데이터는 저장되지 않습니다. \r\n취소하시겠습니까?")) {
            window.history.back();
        }
    }

    // 공연 모집 글 추가
    function addContents() {
        alert("공연 모집 글 등록 완료!");
        window.location.href = "/invite";
    }

    return (
        <main>
            <section className={styles.write}>
                <div>
                    <h1>공연 모집 글 작성</h1>
                    <div className={styles.writeLine}>
                        <p>제목</p>
                        <input
                            type="text"
                            placeholder="제목을 입력하세요"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                        />
                    </div>
                    <div className={styles.writeLine}>
                        <p>자격 요건</p>
                        <input
                            type="text"
                            placeholder="대한민국 시민 누구나"
                            onChange={(e) => setRequire(e.target.value)}
                            value={require}
                        />
                    </div>
                    <div className={styles.writeLine}>
                        <p>장르</p>
                        <input
                            type="text"
                            placeholder="락, 트로트, 재즈 등"
                            onChange={(e) => setSongType(e.target.value)}
                            value={songType}
                        />
                    </div>
                    <div className={styles.writeLine}>
                        <p>모집 일정</p>
                        <div>
                            <input type="date" onChange={(e) => setStartDate(e.target.value)} value={startDate} />
                            <input type="date" onChange={(e) => setEndDate(e.target.value)} value={endDate} />
                        </div>
                    </div>
                    <div className={styles.writeLine}>
                        <p>신청 방법</p>
                        <input
                            type="text"
                            placeholder="example@gmail.com 을 통한 이메일 접수"
                            onChange={(e) => setApply(e.target.value)}
                            value={apply}
                        />
                    </div>
                    <div className={styles.writeLine}>
                        <p>장소</p>
                        <input
                            type="text"
                            placeholder="서울시 OO구"
                            onChange={(e) => setPlace(e.target.value)}
                            value={place}
                        />
                    </div>
                    <div className={styles.writeLine}>
                        <p>공연 일시</p>
                        <div>
                            <input
                                type="date"
                                onChange={(e) => setShowStartDate(e.target.value)}
                                value={showStartDate}
                            />
                            <input type="date" onChange={(e) => setShowEndDate(e.target.value)} value={showEndDate} />
                        </div>
                    </div>
                    <div className={styles.writeLine}>
                        <p>시상 유무</p>
                        <input
                            type="text"
                            placeholder="상금 최대 1000만원"
                            onChange={(e) => setAward(e.target.value)}
                            value={award}
                        />
                    </div>
                    <div className={styles.writeLine}>
                        <p>포스터 파일 업로드</p>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setPoster(e.target.value)}
                            value={poster}
                        />
                    </div>
                    <div className={styles.writeBtns}>
                        <button onClick={(_) => cancelContents()}>취소</button>
                        <button onClick={(_) => addContents()}>등록</button>
                    </div>
                </div>
            </section>
        </main>
    );
}
