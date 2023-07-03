import styles from './jobs.module.scss';
import Navigation from "../../components/Navigation/navigation";

import { useState, useEffect } from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip';

import Modal from '../../components/ModalStatus/modalstatus';
import ModalCreate from '../../components/ModalCreate/modalcreate';
import JobItemButton from '../../components/JobItemButton/jobitembutton';
import ModalDelete from '../../components/ModalDelete/modaldelete';
import SearchBar from '../../components/SearchBar/searchbar';

import { Job } from '../../interfaces/Job';

const Jobs = () => {
    
    const statusLegend = ["In Progress", "Reject", "Offer"];

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
            Month:"April",
            Category:"SWE",
            Company:"Sample Company",
            Location:"City, State",
            Status:"Sent",
            Statuses:[
                {
                    type: 'In Progress',
                    name: 'Sent',
                    date: '04/25/2023'
                }
            ],
            Title:"Junior Software Engineer",
            Type:"Full Time",
            URL:"https://www.google.com/"
        },
        {
            JobID:1,
            Date:"03/05/2023",
            Month:"March",
            Category:"Intern",
            Company:"Samples Companies",
            Location:"Quezon City, MetroMetroMetro",
            Status:"Resume Reject",
            Statuses:[
                {
                    type: 'In Progress',
                    name: 'Sent',
                    date: '03/05/2023'
                },
                {
                    type: 'Rejected',
                    name: 'Resume Reject',
                    date: '03/25/2023'
                }
            ],
            Title:"Another Samples Jobs Titles",
            Type:"Full Time",
            URL:"https://www.google.com/"
        }
    ]

    const [myInitialJobs, setMyInitialJobs] = useState<Job[]>(jobsSample)
    const [myJobs, setMyJobs] = useState<Job[]>(jobsSample)
    const [myJobsFiltered, setMyJobsFiltered] = useState<Job[]>(jobsSample)
    const [jobSelected, setJobSelected] = useState(jobsSample[0])

    const [currCategoryFilters, setCurrCategoryFilters] = useState<string[]>([])
    const [currLocationFilters, setCurrLocationFilters] = useState<string[]>([])
    const [currMonthFilters, setCurrMonthFilters] = useState<string[]>([])

    const [currTypeFilters, setCurrTypeFilters] = useState<string[]>([])
    const [currStatusFilters, setCurrStatusFilters] = useState<string[]>([])

    const handleCheckboxCick = (value:string, filter:string, checked:boolean) => {
        if(checked){
            switch(filter){
                case "Category":
                    setCurrCategoryFilters(currCategoryFilters => [...currCategoryFilters, value]);
                    break;
                case "Location":
                    setCurrLocationFilters(currLocationFilters => [...currLocationFilters, value]);
                    break;
                case "Month":
                    setCurrMonthFilters(currMonthFilters => [...currMonthFilters, value]);
                    break;
                case "Position":
                    setCurrTypeFilters(currTypeFilters => [...currTypeFilters, value]);
                    break;
                case "Status":
                    setCurrStatusFilters(currStatusFilters => [...currStatusFilters, value]);
                    break;
            }
        }else{
            switch(filter){
                case "Category":
                    setCurrCategoryFilters(currCategoryFilters => currCategoryFilters.filter(cat => cat !== value));
                    break;
                case "Location":
                    setCurrLocationFilters(currLocationFilters => currLocationFilters.filter(loc => loc !== value));
                    break;
                case "Month":
                    setCurrMonthFilters(currMonthFilters => currMonthFilters.filter(mon => mon !== value));
                    break;
                case "Position":
                    setCurrTypeFilters(currTypeFilters => currTypeFilters.filter(type => type !== value));
                    break;
                case "Status":
                    setCurrStatusFilters(currStatusFilters => currStatusFilters.filter(stat => stat !== value));
                    break;
            }
        }
    }

    const applyNavigationFilter = () => {
        let filtered = myInitialJobs.filter((item) => {
            if (currCategoryFilters.length > 0 && !currCategoryFilters.includes(item.Category))
              return false;
        
            if (currLocationFilters.length > 0 && !currLocationFilters.includes(item.Location))
              return false;
        
            if (currMonthFilters.length > 0 && !currMonthFilters.includes(item.Month))
              return false;
        
            if (currTypeFilters.length > 0 && !currTypeFilters.includes(item.Type))
              return false;
        
            if (currStatusFilters.length > 0 && !currStatusFilters.includes(item.Statuses[item.Statuses.length].name))
              return false;
        
            return true;
        });
        
        setMyJobs(filtered)
        applySearchFilter(filtered);
    }

    useEffect(() => {
        applyNavigationFilter();
    }, [currCategoryFilters, currLocationFilters, currMonthFilters, currTypeFilters, currStatusFilters]);

    const [searchValue, setSearchValue] = useState<string>('')

    const applySearchFilter = (jobs:Job[]) => {
        let filtered = jobs.filter((item) => item.Company.toLowerCase().includes(searchValue) || item.Title.toLowerCase().includes(searchValue));
        setMyJobsFiltered(filtered);
    }

    useEffect(() => {
        applySearchFilter(myJobs);
    }, [searchValue]);

    const updateJobItem = (jobID:number, jobStatus:string) => {
        let updatedJobs = myInitialJobs.map(item => {
            if(item.JobID===jobID){
                return{...item, Status:jobStatus};
            }
            return item;
        })

        setMyInitialJobs(updatedJobs);
        setMyJobs(updatedJobs);

        updatedJobs = myJobsFiltered.map(item => {
            if(item.JobID===jobID){
                return{...item, Status:jobStatus};
            }
            return item;
        })
        setMyJobsFiltered(updatedJobs);

        setModalOpen(false);
    }

    const createJobItem = (jobItem:Job) => {
        setMyInitialJobs(myInitialJobs => [...myInitialJobs, jobItem]);
        setMyJobs(myInitialJobs => [...myInitialJobs, jobItem]);
        setMyJobsFiltered(myJobsFiltered => [...myJobsFiltered, jobItem]);
        setModalCreateOpen(false);
    }

    const deleteJobItem = (jobId:number) => {
        setMyInitialJobs(myInitialJobs.filter(item => item.JobID !== jobId));
        setMyJobs(myInitialJobs.filter(item => item.JobID !== jobId));
        setMyJobsFiltered(myJobsFiltered.filter(item => item.JobID !== jobId));
        setModalDeleteOpen(false);
    }

    const jobsContainer = () => {
        return myJobsFiltered.map((item) => (
            <div key={`job${item.JobID}`} id={`job${item.JobID}`} className={styles.jobContainer}>
                <div>
                    <a href={item.URL} target="_blank" className={styles.jobTitle + " " + (item.Statuses[item.Statuses.length-1].type === 'Offer'?styles.legendColorOffer:item.Statuses[item.Statuses.length-1].type === 'Rejected'?styles.legendColorReject:styles.legendColorProgress)} data-tooltip-id="status-tip" data-tooltip-content="Visit">{item.Title}</a>
                    <ReactTooltip id="status-tip" />
                    <p className={styles.jobInfo}>{item.Company}</p>
                    <p className={styles.jobInfo}>{item.Type} @ {item.Location}</p>
                    <p className={styles.jobInfo}>{item.Date}</p>
                    <p className={styles.jobInfo} style={{marginBottom:'7px'}}>{item.Statuses[item.Statuses.length-1].name}</p>
                </div>
                <div className={styles.buttonContainer}>
                    <JobItemButton id={`update${item.JobID}`} title='Update' onClickFunction={handleUpdateClick} jobInfo={item}/>
                    <JobItemButton id={`delete${item.JobID}`} title='Delete' onClickFunction={handleDeleteClick} jobId={item.JobID}/>
                </div>
            </div>
        ))
    }

    const [isModalOpen, setModalOpen] = useState<boolean>(false)
    const [isModalCreateOpen, setModalCreateOpen] = useState<boolean>(false)
    const [isModalDeleteOpen, setModalDeleteOpen] = useState<boolean>(false)

    const handleUpdateClick = (jobItem:any) => {
        setJobSelected(jobItem)
        setModalOpen(true)
    }

    const [deleteIndex, setDeleteIndex] = useState<number>(0)

    const handleDeleteClick = (index:number) => {
        setDeleteIndex(index)
        setModalDeleteOpen(true)
    }    

    return (
        <div className={styles.jobsContainer}>
            <Navigation data={myInitialJobs} boxClick={handleCheckboxCick}></Navigation>
            
            <h1 className={styles.pageTitle}>My Applications</h1>

            <div className={styles.jobsMenu}>
                <div>
                    <h2 className={styles.legendTitle}>Legend</h2>
                    <div className={styles.legendContainer}>{legendItems()}</div>
                </div>
                <SearchBar valueFunction={setSearchValue}/>
            </div>

            <div className={styles.jobsGrid}>
                {jobsContainer()}
                <div id="newJobContainer" className={styles.jobContainer} onClick={()=>setModalCreateOpen(true)} style={{cursor:"pointer"}}>
                    <p className={styles.newJobButton}>+</p>
                </div>
            </div>
            
            {isModalOpen && <Modal isOpen={isModalOpen} closeFunction={setModalOpen} jobInfo={jobSelected} updateJobsFunction={updateJobItem} statusSuggestions={[...new Set(myInitialJobs.map(job => job.Status))]}></Modal>}
            {isModalCreateOpen && <ModalCreate isOpen={isModalCreateOpen} closeFunction={setModalCreateOpen} currNumberOfJobs={myJobs.length} createJobFunction={createJobItem} categories={[...new Set(myInitialJobs.map(job => job.Category))]} statuses={[...new Set(myInitialJobs.map(job => job.Status))]} jobtypes={[...new Set(myInitialJobs.map(job => job.Type))]} ></ModalCreate>}
            {isModalDeleteOpen && <ModalDelete isOpen={isModalDeleteOpen} closeFunction={setModalDeleteOpen} jobId={deleteIndex} deleteFunction={deleteJobItem} jobName={myJobs[deleteIndex].Title}></ModalDelete>}
        </div>
    )
}

export default Jobs;