import styles from "./_header.module.scss";

const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      <h3 className={styles.title}>todos</h3>
    </div>
  );
};

export default Header;
