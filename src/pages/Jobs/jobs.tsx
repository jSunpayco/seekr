import styles from './jobs.module.scss';
import { BiSync, BiTrash } from "react-icons/bi";
import Navigation from "../../components/Navigation/navigation";

import { useState } from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import Modal from '../../components/ModalStatus/modalstatus';
import ModalCreate from '../../components/ModalCreate/modalcreate';
import JobItemButton from '../../components/JobItemButton/jobitembutton';

const Jobs = () => {

    const statusLegend = ["In Progress", "Reject", "Offer"]

    const legendItems = () => {
        return statusLegend.map((item, index) => (
            <div id={`status${index}`} className={styles.legendItem + " " + (item==="In Progress"?styles.legendColorProgress:item==="Reject"?styles.legendColorReject:styles.legendColorOffer)}>
                {item}
            </div>
        ))
    }

    const jobsSample = [
        {
            JobID:0,
            Date:"04/25/2023",
            Category:"SWE",
            Company:"Techie inc",
            Location:"Davis, CA",
            Status:"Sent",
            Title:"Junior Software Engineer",
            Type:"Full Time",
            URL:"https://www.google.com/"
        },
        {
            JobID:1,
            Date:"03/14/2023",
            Category:"SDET",
            Company:"Hip Sofwares",
            Location:"Boston, MA",
            Status:"Interviewing",
            Title:"Entry Level Automation Test Engineer",
            Type:"Full Time",
            URL:"https://www.google.com/"
        },
        {
            JobID:1,
            Date:"03/14/2023",
            Category:"SDET",
            Company:"Hip Sofwares",
            Location:"Boston, MA",
            Status:"Reject",
            Title:"Entry Level Automation Test Engineer",
            Type:"Full Time",
            URL:"https://www.google.com/"
        },
        {
            JobID:1,
            Date:"03/14/2023",
            Category:"SDET",
            Company:"Hip Sofwares",
            Location:"Boston, MA",
            Status:"Interviewing",
            Title:"Entry Level Automation Test Engineer",
            Type:"Full Time",
            URL:"https://www.google.com/"
        },
        {
            JobID:1,
            Date:"03/14/2023",
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
        return myJobs.map((item) => (
            <div id={`job${item.JobID}`} className={styles.jobContainer}>
                <a href={item.URL} target="_blank" className={styles.jobTitle + " " + (item.Status==="Offer"?styles.legendColorOffer:item.Status==="Reject"?styles.legendColorReject:styles.legendColorProgress)} data-tooltip-id="status-tip" data-tooltip-content="Visit">{item.Title}</a>
                <ReactTooltip id="status-tip" />
                <p className={styles.jobInfo}>{item.Company}</p>
                <p className={styles.jobInfo}>{item.Type} @ {item.Location}</p>
                <p className={styles.jobInfo} style={{marginBottom:'20px'}}>{item.Date}</p>
                <div className={styles.buttonContainer}>
                    <JobItemButton title='Update' onClickFunction={setModalOpen}/>
                    <JobItemButton title='Delete' onClickFunction={setModalOpen}/>
                </div>
            </div>
        ))
    }

    const [isModalOpen, setModalOpen] = useState<boolean>(false)
    const [isModalCreateOpen, setModalCreateOpen] = useState<boolean>(false)

    return (
        <div className={styles.jobsContainer}>
            <Navigation></Navigation>
            
            <h1 className={styles.pageTitle}>My Applications</h1>

            <h2 className={styles.legendTitle}>Legend</h2>
            <div className={styles.legendContainer}>{legendItems()}</div>

            <div className={styles.jobsGrid}>
                {jobsContainer()}
                <div className={styles.jobContainer + " " + styles.newJobContainer} onClick={()=>setModalCreateOpen(true)}>
                    <p className={styles.newJobButton}>+</p>
                </div>
            </div>
            
            {isModalOpen && <Modal isOpen={isModalOpen} closeFunction={setModalOpen} currStatus='A'></Modal>}
            {isModalCreateOpen && <ModalCreate isOpen={isModalCreateOpen} closeFunction={setModalCreateOpen}></ModalCreate>}
        </div>
    )
}

export default Jobs;