import { useEffect, useRef, useState } from "react";
import Section1 from "./Section1";
import Section2 from "./Section2";
import Section3 from "./Section3";

const SectionCount = 2;

export default function Home() {
    const [view, setView] = useState(Array.from({ length: SectionCount }, () => false));
    let vportY = useRef(0);
    let pageChange = false;
    let page = 1;

    // 페이지 스크롤 시 Section 단위로 스크롤하기 위한 함수
    function scrollSection(e: WheelEvent) {
        if (window.location.pathname === "/") {
            e.preventDefault();

            if (!pageChange) {
                pageChange = true;
                // 아래로 스크롤 했을 때
                if (e.deltaY > 0) {
                    if (page !== 3) page++;
                }
                // 위로 스크롤 했을 때
                else {
                    if (page !== 1) page--;
                }
                window.scrollTo({ top: vportY.current * (page - 1), behavior: "smooth" });
                setView(
                    Array.from({ length: page }, () => true).concat(
                        Array.from({ length: SectionCount - page }, () => false)
                    )
                );
                setTimeout(() => (pageChange = false), 800);
            }
        }
    }

    useEffect(() => {
        vportY.current = window.innerHeight;
        window.scrollTo({ top: 0, behavior: "smooth" });
        setView((v) => {
            v[0] = true;
            return v;
        });
        window.addEventListener("wheel", (e) => scrollSection(e), { passive: false });

        return () => {
            window.removeEventListener("wheel", (e) => scrollSection(e));
        };
    }, []);

    return (
        <main>
            {/* 홈 - Carousel 부분 */}
            <Section1 />

            {/* 홈 - ICON 부분 */}
            <Section2 isView={view[1]} />

            {/* 홈 - 모든 게시판 출력 */}
            <Section3 />
        </main>
    );
}
