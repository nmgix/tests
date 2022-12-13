import styles from "./_footer.module.scss";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <p>Double-click to edit a todo</p>
      <p>
        Created by{" "}
        <a href='https://github.com/nmgix' target={"_blank"}>
          nmgix
        </a>
      </p>
      <p>Part of test app</p>
    </footer>
  );
};
export default Footer;
