import styles from "./_footer.module.scss";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <p>Double-click to edit a todo</p>
      <p>
        Copied by{" "}
        <a href='https://github.com/nmgix' target={"_blank"} rel='noreferrer'>
          nmgix
        </a>
      </p>
      <p>Part of test app</p>
    </footer>
  );
};
export default Footer;
