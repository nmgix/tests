import styles from "./_header.module.scss";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <h3 className={styles.title}>todos</h3>
    </header>
  );
};

export default Header;
