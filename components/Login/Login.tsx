import styles from "./Login.module.scss";

export default function Login(props: { type: "login" | "signup" }) {
    return (
        <main>
            <section>This is Login{"(" + props.type + ")"} page.</section>
        </main>
    );
}
