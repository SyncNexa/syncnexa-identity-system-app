import Xmark from "@/assets/icons/Xmark";
import styles from "./styles/Modal.module.css";

function Modal({ title = "Modal Title", children, visible, onClose }: Modal) {
  return (
    <section className={`${styles.modal} ${visible ? styles.visible : ""}`}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          {typeof title === "string" ? <h4>{title}</h4> : title}

          <button onClick={onClose}>
            <Xmark />
          </button>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </section>
  );
}

export default Modal;
