import styles from "./Home.module.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

export default function Section1() {
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

    return (
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
    );
}
