import styles from './navigation.module.scss';

const Navigation = () => {

    return (
        <div className={styles.navigationContainer}>
            <div className={styles.navigationHeader}>
                <h1 className={styles.logo}>SeekR</h1>
                <button className={styles.navigationCloseButton}>X</button>
            </div>
        </div>
    )
}

export default Navigation;