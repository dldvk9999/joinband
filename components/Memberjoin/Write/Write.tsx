import { useEffect, useState } from "react";
import styles from "./Write.module.scss";

const partList = ["드럼", "일렉기타", "통기타", "건반", "보컬", "Etc"];
const songType = ["클래식", "발라드", "락", "CCM", "블루스", "재즈", "컨트리", "디스코", "트로트", "EDM", "Etc"];

export default function Write() {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [selectPartList, setPartList] = useState<Array<string>>([]);
    const [selectSongType, setSongType] = useState<Array<string>>([]);
    const checkboxList = [
        {
            item: partList,
            title: "partList",
            title_kor: "구인 파트",
        },
        {
            item: songType,
            title: "songType",
            title_kor: "밴드 장르",
        },
    ];

    // 구인 파트와 밴드 장르 체크박스 상태를 저장해놓을 변수 관리
    function selectType(type: "partList" | "songType", item: string) {
        if (type === "partList") {
            const isFind = selectPartList.indexOf(item);
            if (isFind !== -1) {
                setPartList(selectPartList.filter((s) => s !== item));
            } else {
                setPartList((s) => [...s, item]);
            }
        } else {
            const isFind = selectSongType.indexOf(item);
            if (isFind !== -1) {
                setSongType(selectSongType.filter((s) => s !== item));
            } else {
                setSongType((s) => [...s, item]);
            }
        }
    }

    // 게시글 취소
    function cancelContents() {
        if (confirm("기존 작성된 데이터는 저장되지 않습니다. \r\n취소하시겠습니까?")) {
            window.history.back();
        }
    }

    // 게시글 추가
    function addContents() {
        alert("게시글 등록 완료!");
        window.location.href = "/memberjoin";
    }

    return (
        <main>
            <section className={styles.write}>
                <div>
                    <h1>회원모집 작성</h1>
                    <input
                        type="text"
                        placeholder="제목을 입력하세요"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                    <hr />
                    {checkboxList.map((list, i) => {
                        return (
                            <div className={styles.writeCheckbox} key={"checkbox-" + i}>
                                <p>
                                    <b>{list.title_kor}</b>
                                </p>
                                <div>
                                    {list.item.map((item, j) => {
                                        return (
                                            <div key={list.title + j}>
                                                <input
                                                    onClick={(e) =>
                                                        selectType(list.title as "partList" | "songType", item)
                                                    }
                                                    type="checkbox"
                                                    id={list.title + j}
                                                    name={item}
                                                />
                                                <label htmlFor={list.title + j}>{item}</label>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
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
