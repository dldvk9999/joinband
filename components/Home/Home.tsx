import { useEffect, useState } from "react";
import Section1 from "./Section1";
import Section2 from "./Section2";

const SectionCount = 2;

export default function Home() {
    const [view, setView] = useState(Array.from({ length: SectionCount }, () => false));
    let vportY = 0;
    let pageChange = false;
    let page = 1;

    // 페이지 스크롤 시 Section 단위로 스크롤하기 위한 함수
    function scrollSection(e: WheelEvent) {
        e.preventDefault();

        if (!pageChange && window.location.pathname === "/") {
            pageChange = true;
            // 아래로 스크롤 했을 때
            if (e.deltaY > 0) {
                if (page !== 3) page++;
            }
            // 위로 스크롤 했을 때
            else {
                if (page !== 1) page--;
            }
            window.scrollTo({ top: vportY * (page - 1), behavior: "smooth" });
            setView(
                Array.from({ length: page }, () => true).concat(
                    Array.from({ length: SectionCount - page }, () => false)
                )
            );
            setTimeout(() => (pageChange = false), 800);
        }
    }

    useEffect(() => {
        vportY = window.innerHeight;
        window.scrollTo({ top: 0, behavior: "smooth" });
        setView((v) => {
            v[0] = true;
            return v;
        });
        window.addEventListener("wheel", (e) => scrollSection(e), { passive: false });

        return () => {
            window.removeEventListener("wheel", (e) => scrollSection(e), false);
        };
    }, []);

    return (
        <main>
            {/* 홈 - Carousel 부분 */}
            <Section1 />

            {/* 홈 - ICON 부분 */}
            <Section2 isView={view[1]} />
        </main>
    );
}
