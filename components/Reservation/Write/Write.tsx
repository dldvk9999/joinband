import { useState } from "react";
import styles from "./Write.module.scss";
import { CityList } from "../../../data/CityList";

export default function Write() {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [place1, setPlace1] = useState("");
    const [place2, setPlace2] = useState("");
    const [price, setPrice] = useState("");
    const [link, setLink] = useState("");

    // 합주실 추가 취소
    function cancelContents() {
        if (confirm("기존 작성된 데이터는 저장되지 않습니다. \r\n취소하시겠습니까?")) {
            window.history.back();
        }
    }

    // 합주실 추가
    function addContents() {
        if (title === "" || body === "" || place1 === "" || place2 === "" || price === "" || link === "") {
            alert("모든 입력값을 빈칸없이 채워주세요!");
        } else {
            alert("합주실 등록 완료!");
            window.location.href = "/reservation";
        }
    }

    return (
        <main>
            <section className={styles.write}>
                <div>
                    <h1>합주실 추가</h1>
                    <input
                        type="text"
                        placeholder="제목을 입력하세요"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                    <hr />
                    <div className={styles.writePlace}>
                        <select onChange={(e) => setPlace1(e.target.value)}>
                            <option hidden>지역을 선택해주세요</option>
                            {Object.keys(CityList).map((item, i) => {
                                return (
                                    <option value={item} key={"reservation-write-city-" + i}>
                                        {item}
                                    </option>
                                );
                            })}
                        </select>
                        <select disabled={place1 === ""} onChange={(e) => setPlace2(e.target.value)}>
                            <option hidden>세부 지역을 선택해주세요</option>
                            {CityList[place1]?.map((item, i) => {
                                return (
                                    <option value={item} key={"reservation-write-city-sub-" + i}>
                                        {item}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <hr />
                    <input
                        type="text"
                        placeholder="시간당 가격을 입력하세요"
                        onChange={(e) => setPrice(e.target.value)}
                        value={BigInt(price.replaceAll(/[^\d]/gi, "")).toLocaleString() + "원"}
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
                    <hr />
                    <input
                        type="text"
                        placeholder="예약 링크를 입력하세요"
                        onChange={(e) => setLink(e.target.value)}
                        value={link}
                    />
                    <div className={styles.writeBtns}>
                        <button onClick={(_) => cancelContents()}>취소</button>
                        <button onClick={(_) => addContents()}>등록</button>
                    </div>
                </div>
            </section>
        </main>
    );
}
