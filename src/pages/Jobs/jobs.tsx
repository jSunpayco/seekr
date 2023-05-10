import styles from './jobs.module.scss';
import Navigation from "../../components/Navigation/navigation";

const Jobs = () => {

    return (
        <div className={styles.jobsContainer}>
            <Navigation></Navigation>
        </div>
    )
}

export default Jobs;