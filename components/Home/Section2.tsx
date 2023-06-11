import styles from "./Home.module.scss";
import Image from "next/image";
import { data } from "../../data/ReviewList";

export default function Section2(props: { isView: boolean }) {
    const reviewData = data.concat(data);

    // useEffect(() => {
    //     if (props.isView) {
    //     }
    // }, [props.isView]);

    return (
        <section className={styles.homeReview}>
            <div className={styles.homeReviewCards}>
                {reviewData.map((item, i) => {
                    return (
                        <div className={styles.homeReviewCard} key={"home-review-" + i}>
                            <div className={styles.homeReviewCardProfile}>
                                <div className={`${styles.homeReviewImage} ${styles[`homeReviewImage${i % 8}`]}`} />
                            </div>
                            <p>
                                <b>{item.name}</b>
                            </p>
                            <p>{item.review}</p>
                            <div className={styles.homeReviewRate}>
                                <Image
                                    src={"/home/rate.webp"}
                                    alt={"rate"}
                                    width={70}
                                    height={70}
                                    loading="lazy"
                                    className={styles.homeReviewRateImage}
                                />
                                <p>{item.rate}점</p>
                            </div>
                        </div>
                    );
                })}
            </div>
            <h2 className={styles.homeReviewFooter}>많은 사람들이 함께한 조인밴드!</h2>
        </section>
    );
}
