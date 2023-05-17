import styles from './jobs.module.scss';
import Navigation from "../../components/Navigation/navigation";

import { useState } from 'react';

const Jobs = () => {

    const jobsSample = [
        {
            jobid:0,
            date:"04/25/2023",
            Category:"SWE",
            Company:"Techie inc",
            Location:"Davis, CA",
            Status:"Sent",
            Title:"Junior Software Engineer",
            Type:"Full Time",
            URL:"https://www.google.com/"
        },
        {
            jobid:1,
            date:"03/14/2023",
            Category:"SDET",
            Company:"Hip Sofwares",
            Location:"Boston, MA",
            Status:"Interviewing",
            Title:"Entry Level Automation Test Engineer",
            Type:"Full Time",
            URL:"https://www.google.com/"
        },
        {
            jobid:1,
            date:"03/14/2023",
            Category:"SDET",
            Company:"Hip Sofwares",
            Location:"Boston, MA",
            Status:"Interviewing",
            Title:"Entry Level Automation Test Engineer",
            Type:"Full Time",
            URL:"https://www.google.com/"
        },
        {
            jobid:1,
            date:"03/14/2023",
            Category:"SDET",
            Company:"Hip Sofwares",
            Location:"Boston, MA",
            Status:"Interviewing",
            Title:"Entry Level Automation Test Engineer",
            Type:"Full Time",
            URL:"https://www.google.com/"
        },
        {
            jobid:1,
            date:"03/14/2023",
            Category:"SDET",
            Company:"Hip Sofwares",
            Location:"Boston, MA",
            Status:"Interviewing",
            Title:"Entry Level Automation Test Engineer",
            Type:"Full Time",
            URL:"https://www.google.com/"
        }
    ]

    const [myJobs, setMyJobs] = useState(jobsSample)

    const jobsContainer = () => {
        return myJobs.map((item, index) => (
            <div className={styles.jobContainer}></div>
        ))
    }

    return (
        <div className={styles.jobsContainer}>
            <Navigation></Navigation>
            <h1 className={styles.pageTitle}>My Applications</h1>
            <h1 className={styles.warning}>This page is currently under progress</h1>
            <div className={styles.jobsGrid}>
                {jobsContainer()}
            </div>
        </div>
    )
}

export default Jobs;