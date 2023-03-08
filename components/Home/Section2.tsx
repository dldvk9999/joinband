import styles from "./Home.module.scss";
import Image from "next/image";
import { useEffect, useState } from "react";

const Instument = ["guitar", "drum", "mic", "piano"];
const MaxLevel = Instument.length + 1;

export default function Section2(props: { isView: boolean }) {
    const [level, setLevel] = useState(Array.from({ length: MaxLevel }, () => false));

    function slideImage(state: boolean, index: number) {
        const transformIcon = [
            styles.homeBandTransform1,
            styles.homeBandTransform2,
            styles.homeBandTransform3,
            styles.homeBandTransform4,
        ];
        return state ? styles.homeBandTransformCenter : transformIcon[index];
    }

    useEffect(() => {
        if (props.isView)
            for (let i = 0; i < MaxLevel; i++) {
                setTimeout(
                    () =>
                        setLevel(
                            Array.from({ length: i + 1 }, () => true).concat(
                                Array.from({ length: MaxLevel - i - 1 }, () => false)
                            )
                        ),
                    500 * i + 500
                );
            }
        else setLevel(Array.from({ length: MaxLevel }, () => false));
    }, [props.isView]);

    return (
        <section className={styles.homeBand}>
            <div className={`${styles.homeBandImages} ${level[MaxLevel - 1] && styles.homeBandShowBorder}`}>
                {Instument.map((item, index) => {
                    return (
                        <Image
                            src={"/home/" + item + ".webp"}
                            alt={item}
                            width={100}
                            height={100}
                            className={`${level[index] && styles.homeBandSlide} ${
                                level[MaxLevel - 1] && styles.homeBandHideBorder
                            } ${slideImage(level[index], index)}`}
                            key={"instrument-" + index}
                        />
                    );
                })}
            </div>
        </section>
    );
}
