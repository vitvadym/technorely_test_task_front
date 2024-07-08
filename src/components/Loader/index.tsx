import styles from "./Loader.module.scss";

const Loader = () => {
  return (
    <div className={styles.loader_overlay}>
      <span className={styles.loader_spinner}></span>
    </div>
  );
};

export default Loader;
