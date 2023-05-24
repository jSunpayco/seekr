import styles from './modalcreate.module.scss';
import FormButton from '../FormButton/formbutton';
import { BiChevronDown } from "react-icons/bi";

import { Dispatch, SetStateAction, useState } from 'react';

interface Props {
    isOpen: boolean;
    closeFunction: Dispatch<SetStateAction<boolean>>;
}

const ModalCreate = (props:Props) => {

    const [isStatusOpen, setStatusOpen] = useState<boolean>(false);
    const statuses = ["Sent", "Assessing", "Interviewing", "Resume Reject", "Assessment Reject", "Interview Reject", "Verbal Offer", "Written Offer"];
    
    const jobTypes = [""];

    const dropDowns = (title1:string, title2:string) => {
        return (
            <div className={styles.halfinputFieldsContainer}>
                <div className={`${styles.fullInputField} ${styles.dropdownContainer}`} style={{width:'45%'}}>
                    <p style={{userSelect:'none'}}>{title1.toUpperCase()}</p>
                    <BiChevronDown className={styles.menuArrow} style={{marginRight:'5%'}}/>
                </div>
                <div className={`${styles.fullInputField} ${styles.dropdownContainer}`} style={{width:'45%'}}>
                    <p style={{userSelect:'none'}}>{title2.toUpperCase()}</p>
                    <BiChevronDown className={styles.menuArrow} style={{marginRight:'5%'}}/>
                </div>
            </div>
        )
    }

    const halfInputField = (title1:string, title2:string) => {
        return (
            <div className={styles.halfinputFieldsContainer}>
                <input className={styles.fullInputField} style={{width:'45%'}} placeholder={title1.toUpperCase()}></input>
                <input className={styles.fullInputField} style={{width:'45%'}} placeholder={title2.toUpperCase()}></input>
            </div>
        )
    }

    return (
        <div className={styles.modalGreyScreen}>
            <form className={styles.modalContainer}>
                <div className={styles.modalHeader}>
                    <h1 className={styles.modalTitle}>New Job</h1>
                    <button className={styles.modalClose} onClick={()=>props.closeFunction(false)}>X</button>
                </div>
                
                <div className={styles.inputFieldsContainer}>
                    <input className={styles.fullInputField} placeholder='Title' style={{margin:'auto'}}></input>
                    {halfInputField('company', 'location')}
                    {halfInputField('category', 'job type')}
                    {dropDowns('date added', 'status')}
                    <input className={styles.fullInputField} placeholder='URL' style={{margin:'auto', marginTop:'20px'}}></input>
                </div>
                
                <FormButton position={{margin:'auto', marginTop:'20px'}} title='Submit' titleColor='black'></FormButton>
            </form>
        </div>
    )
}

export default ModalCreate;