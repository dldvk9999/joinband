import styles from "./Video.module.scss";
import { useEffect, useState } from "react";
import YouTube from "react-youtube";
import { data } from "../../../data/MypageData";

interface videoLinkType {
    id: number;
    link: string;
}

export default function Video(props: { id: number }) {
    const [linkList, setLinkList] = useState<Array<videoLinkType>>([]);
    const [isView, setView] = useState(Array.from({ length: linkList.length }, () => false));

    function videoView(index: number) {
        let tmp = [...isView];
        tmp[index] = !tmp[index];
        setView(tmp);
    }

    // 비디오 링크 수정
    function editLink(id: number, index: number) {
        const link = prompt("수정할 비디오 링크 입력", "https://www.youtube.com/watch?v=비디오링크");
        const rest = linkList.splice(index, 1, { id: id, link: link ? link : "" });
        rest.shift();
        setLinkList((links) => links.concat(rest));
    }

    // 비디오 링크 삭제
    function delLink(id: number) {
        if (confirm("삭제하시겠습니까?")) {
            setLinkList((links) => links.filter((item) => item.id !== id));
            setView((views) => views.filter((_, i) => i !== id));
        }
    }

    // 새 링크 업로드 (앞에서부터 적재)
    function upload() {
        const link = prompt("비디오 링크 입력", "https://www.youtube.com/watch?v=비디오링크");
        setLinkList((links) => [
            {
                id: 5,
                link: link ? link : "",
            },
            ...links,
        ]);
        setView([...isView, false]);
    }

    useEffect(() => {
        setLinkList(data.video);
    }, []);

    return (
        <section className={styles.video}>
            <h1>내 동영상</h1>
            <hr />
            <div className={styles.videoList}>
                <div>
                    <button onClick={upload}>업로드</button>
                </div>
                {linkList ? (
                    <div className={styles.videoListLink}>
                        {linkList.map((item, i) => {
                            return (
                                <div className={styles.videoYoutube} key={"mypage-video-" + i}>
                                    {isView[i] ? (
                                        <YouTube
                                            videoId={item.link.split("=")[1]}
                                            opts={{
                                                width: "100%",
                                                height: "360px",
                                                playerVars: {
                                                    autoplay: 0,
                                                    rel: 0,
                                                    modestbranding: 1,
                                                },
                                            }}
                                        />
                                    ) : (
                                        <div className={`${styles.videoYoutubeBtn} ${styles.videoYoutubeHide}`}>
                                            <button onClick={() => videoView(i)}>보기</button>
                                        </div>
                                    )}
                                    <div className={styles.videoYoutubeBtn}>
                                        <button onClick={() => delLink(item.id)}>삭제</button>
                                        <button onClick={() => editLink(item.id, i)}>수정</button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <p>내 동영상이 없습니다.</p>
                )}
            </div>
        </section>
    );
}
