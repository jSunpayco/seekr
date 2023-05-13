import styles from './jobs.module.scss';
import Navigation from "../../components/Navigation/navigation";

const Jobs = () => {

    return (
        <div className={styles.jobsContainer}>
            <Navigation></Navigation>
            <h1 className={styles.warning}>This page is currently under progress</h1>
        </div>
    )
}

export default Jobs;