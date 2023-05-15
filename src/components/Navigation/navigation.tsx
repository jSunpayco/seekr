import styles from './navigation.module.scss';

const Navigation = () => {

    const filters = ['Category', 'Location', 'Month', 'Position', 'Status'];

    const filterContainers = () => {
        return filters.map( (item) =>(
            <div>
                <p className={styles.filterName}>{item}</p>
            </div>
        ))
    }

    return (
        <div className={styles.navigationContainer}>
            <div className={styles.navigationHeader}>
                <h1 className={styles.logo}>SeekR</h1>
                <div className={styles.filtersContainer}>
                    {filterContainers()}
                    <a href='/' className={styles.logoutButton}>Logout</a>
                </div>
                {/* <button className={styles.navigationCloseButton}>X</button> */}
            </div>
        </div>
    )
}

export default Navigation;