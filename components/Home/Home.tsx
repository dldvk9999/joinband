import styles from "./Home.module.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
    let vportY = 0;
    let pageChange = false;
    let page = 1;

    // 홈 화면 캐러셀 이미지 출력
    function carousel() {
        let result = [];
        for (let i = 0; i < 5; i++) {
            result.push(
                <div key={"home-image-" + i}>
                    <img className={styles.homeCarouselImage} src={"/home/home" + (i + 1) + ".webp"} />
                </div>
            );
        }
        return result;
    }

    // 페이지 스크롤 시 Section 단위로 스크롤하기 위한 함수
    function scrollSection(e: WheelEvent) {
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
            window.scrollTo({ top: vportY * (page - 1), behavior: "smooth" });
            setTimeout(() => (pageChange = false), 800);
        }
    }

    useEffect(() => {
        vportY = window.innerHeight;
        window.scrollTo({ top: 0, behavior: "smooth" });
        window.addEventListener("wheel", (e) => scrollSection(e), { passive: false });

        return () => {
            window.removeEventListener("wheel", (e) => scrollSection(e));
        };
    }, []);

    return (
        <main>
            {/* 홈 - Carousel 부분 */}
            <section className={styles.homeCarousel}>
                <div className={styles.homeCarouselFront}>
                    <div className={styles.homeCarouselShadow}></div>
                    <div className={styles.homeCarouselTitle}>
                        <p>좋은 밴드, 좋은 합주, 좋은 공연</p>
                        <h1>JOINBAND</h1>
                    </div>
                </div>

                <Carousel
                    ariaLabel={"home image"}
                    interval={5000}
                    transitionTime={1000}
                    showStatus={false}
                    showIndicators={false}
                    showArrows={false}
                    showThumbs={false}
                    stopOnHover={false}
                    autoPlay
                    infiniteLoop
                >
                    {carousel()}
                </Carousel>
            </section>

            {/* 홈 - ICON 부분 */}
            <section className={styles.homeBand}>
                <div className={styles.homeBandImages}>
                    <Image src={"/home/guitar.webp"} alt={"guitar"} width={100} height={100}></Image>
                    <Image src={"/home/drum.webp"} alt={"drum"} width={100} height={100}></Image>
                    <Image src={"/home/mic.webp"} alt={"mic"} width={100} height={100}></Image>
                    <Image src={"/home/piano.webp"} alt={"piano"} width={100} height={100}></Image>
                </div>
            </section>
        </main>
    );
}
