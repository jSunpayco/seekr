import styles from './jobs.module.scss';
import Navigation from "../../components/Navigation/navigation";

import { useState, useEffect } from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import Modal from '../../components/ModalStatus/modalstatus';
import ModalCreate from '../../components/ModalCreate/modalcreate';
import JobItemButton from '../../components/JobItemButton/jobitembutton';

const Jobs = () => {

    interface Job {
        JobID: number;
        Date: string;
        Category: string;
        Company: string;
        Location: string;
        Status: string;
        Title: string;
        Type: string;
        URL: string;
    }

    const statusLegend = ["In Progress", "Reject", "Offer"]
    const progressList = ['Sent', 'Assessment', 'Interviewing']
    const rejectedList = ['Resume Reject', 'Assessment Reject', 'Interview Reject']
    const offerList = ['Verbal Offer', 'Written Offer']

    const legendItems = () => {
        return statusLegend.map((item, index) => (
            <div key={`status${index}`} id={`status${index}`} className={styles.legendItem + " " + (item==="In Progress"?styles.legendColorProgress:item==="Reject"?styles.legendColorReject:styles.legendColorOffer)}>
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
            JobID:2,
            Date:"03/14/2023",
            Category:"SDET",
            Company:"Hip Sofwares",
            Location:"Boston, MA",
            Status:"Resume Reject",
            Title:"Entry Level Automation Test Engineer",
            Type:"Full Time",
            URL:"https://www.google.com/"
        },
        {
            JobID:3,
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
            JobID:4,
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
    const [jobSelected, setJobSelected] = useState(jobsSample[0])

    useEffect(() => {
        setModalOpen(false);
        setModalCreateOpen(false)
    }, [myJobs]);

    const updateJobItem = (jobID:number, jobStatus:string) => {
        const updatedJobs = myJobs.map(item => {
            if(item.JobID===jobID){
                return{...item, Status:jobStatus};
            }
            return item;
        })

        setMyJobs(updatedJobs);
    }

    const createJobItem = (jobItem:Job) => {
        setMyJobs(myJobs => [...myJobs, jobItem])
    }

    const jobsContainer = () => {
        return myJobs.map((item) => (
            <div key={`job${item.JobID}`} id={`job${item.JobID}`} className={styles.jobContainer}>
                <div>
                    <a href={item.URL} target="_blank" className={styles.jobTitle + " " + (offerList.includes(item.Status)?styles.legendColorOffer:rejectedList.includes(item.Status)?styles.legendColorReject:styles.legendColorProgress)} data-tooltip-id="status-tip" data-tooltip-content="Visit">{item.Title.substring(0, 39) + (item.Title.length>39 ? '...' : '')}</a>
                    <ReactTooltip id="status-tip" />
                    <p className={styles.jobInfo}>{item.Company}</p>
                    <p className={styles.jobInfo}>{item.Type} @ {item.Location}</p>
                    <p className={styles.jobInfo} style={{marginBottom:'20px'}}>{item.Date}</p>
                </div>
                <div className={styles.buttonContainer}>
                    <JobItemButton title='Update' onClickFunction={handleUpdateClick} jobInfo={item}/>
                    <JobItemButton title='Delete' onClickFunction={setModalOpen}/>
                </div>
            </div>
        ))
    }

    const [isModalOpen, setModalOpen] = useState<boolean>(false)
    const [isModalCreateOpen, setModalCreateOpen] = useState<boolean>(false)

    const handleUpdateClick = (jobItem:any) => {
        setJobSelected(jobItem)
        setModalOpen(true)
    }

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
            
            {isModalOpen && <Modal isOpen={isModalOpen} closeFunction={setModalOpen} currStatus='A' jobInfo={jobSelected} updateJobsFunction={updateJobItem}></Modal>}
            {isModalCreateOpen && <ModalCreate isOpen={isModalCreateOpen} closeFunction={setModalCreateOpen} currNumberOfJobs={myJobs.length} createJobFunction={createJobItem}></ModalCreate>}
        </div>
    )
}

export default Jobs;