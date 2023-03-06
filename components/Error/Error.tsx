import Image from "next/image";
import styles from "./Error.module.scss";

export default function Error(props: { type: string }) {
    return (
        <main>
            <section className={styles.error}>
                <Image
                    src={"/notfound.webp"}
                    alt={!props.type ? "error" : "notfound"}
                    width={200}
                    height={200}
                    priority
                />
                {!props.type ? (
                    <>
                        <p>에러가 발생했습니다.</p>
                        <p>다시 시도해주시고 에러가 재발할 경우 사이트 운영자에게 문의해주십시오.</p>
                    </>
                ) : (
                    <>
                        <p>페이지를 개발 중입니다.</p>
                        <p>업데이트를 기다려주세요.</p>
                    </>
                )}
                <p>
                    <a href="mailto:dldvk9999@maver.com?Subject=사이트 문의드립니다." target="_top">
                        <b>개발자에게 메일 보내기</b>
                    </a>
                </p>
            </section>
        </main>
    );
}
