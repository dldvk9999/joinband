import styles from "./Home.module.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Section1() {
    const [deferredPrompt, setDeferredPrompt] = useState<any>();

    const handleInstall = () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();

            deferredPrompt.userChoice.then((choiceResult: { outcome: string }) => {
                if (choiceResult.outcome === "accepted") {
                    // console.log("사용자가 앱 설치를 동의했습니다.");
                } else {
                    // console.log("사용자가 앱 설치를 동의하지 않았습니다.");
                }
                setDeferredPrompt(null);
            });
        }
    };

    const handleBeforeInstallPrompt = (e: Event) => {
        e.preventDefault();
        setDeferredPrompt(e);
    };

    // 홈 화면 캐러셀 이미지 출력
    function carousel() {
        let result = [];
        for (let i = 0; i < 5; i++) {
            result.push(
                <div key={"home-image-" + i}>
                    <Image
                        className={styles.homeCarouselImage}
                        src={"/home/home" + (i + 1) + ".webp"}
                        alt={"home carousel image"}
                        width={100}
                        height={100}
                        priority
                    />
                </div>
            );
        }
        return result;
    }

    useEffect(() => {
        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        };
    }, []);

    return (
        <section className={styles.homeCarousel}>
            <div className={styles.homeCarouselFront}>
                <div className={styles.homeCarouselShadow}></div>
                <div className={styles.homeCarouselTitle}>
                    <p>좋은 밴드, 좋은 합주, 좋은 공연</p>
                    <h1>JOINBAND</h1>
                    {deferredPrompt && (
                        <i className={styles.homeInstall} onClick={handleInstall}>
                            Install
                        </i>
                    )}
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
