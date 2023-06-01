import styles from './modalcreate.module.scss';
import FormButton from '../FormButton/formbutton';

import { Dispatch, SetStateAction, useState, useRef, useEffect, ChangeEvent } from 'react';

import {useMediaQuery} from '@mui/material';

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

interface Props {
    isOpen: boolean;
    closeFunction: Dispatch<SetStateAction<boolean>>;
    currNumberOfJobs:number;
    createJobFunction:(jobItem: Job) => void;
}

const ModalCreate = (props:Props) => {

    const isScreenSmall = useMediaQuery('(max-width: 560px)');

    const inputReference = useRef<HTMLInputElement>(null);
    const [inputWidth, setInputWidth] = useState<string | number>('auto');

    useEffect(() => {
        if (inputReference.current) {
          const width = inputReference.current.offsetWidth;
          setInputWidth(width);
        }
        
        const handleKeyDown = (event:KeyboardEvent) => {
          if (event.key === 'Escape') {
            props.closeFunction(false)
          }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
          document.removeEventListener('keydown', handleKeyDown);
        };
      }, []);

    const [currentTitle, setCurrentTitle] = useState('')
    const [currentCompany, setCurrentCompany] = useState('')
    const [currentLocation, setCurrentLocation] = useState('')
    const [currentDate, setCurrentDate] = useState('')
    const [currentUrl, setCurrentUrl] = useState('')

    const handleDateChange = (currDate:string) => {
        let parts = currDate.split('-');
        setCurrentDate(`${parts[1]}/${parts[2]}/${parts[0]}`)
    }

    const [isJobTypeFocused, setJobTypeFocused] = useState<boolean>(false)
    const [isCategoryFocused, setCategoryFocused] = useState<boolean>(false)
    
    const jobTypes = ['full time', 'internship', 'temporary'];
    const [jobTypeSuggestions, setJobTypeSuggestions] = useState<string[]>(jobTypes);
    const [currentJobType, setCurrentJobType] = useState<string>('')

    const categories = ['swe', 'sdet', 'qa', 'support']
    const [categoriesSuggestions, setCategoriesSuggestions] = useState<string[]>(categories);
    const [currentCategory, setCurrentCategory] = useState<string>('')

    const handleDataListChange = (event: ChangeEvent<HTMLInputElement>, defaultOptions:string[], currentItemFunction:Dispatch<SetStateAction<string>>, optionsFunction:Dispatch<SetStateAction<string[]>>) => {
        currentItemFunction(event.target.value)
        if(event.target.value !== ''){
            let input = event.target.value;

            let newSuggestions = defaultOptions.filter((item) => item.toLowerCase().startsWith(input.toLowerCase()))
            optionsFunction(newSuggestions)
        }
        else
            optionsFunction(defaultOptions)
    }

    const handleOptionsVisibility = (listFunction:Dispatch<SetStateAction<boolean>>) => {
        setTimeout(() => {
            listFunction(false);
        }, 100);
    }

    const datalistOptions = (options:string[], currentFunction:Dispatch<SetStateAction<string>>, title:string) => {
        return options.map((item, index) => (
            <p key={`datalistOptions${title}${index}`} className={styles.datalistOption} onClick={()=>currentFunction(item.toUpperCase())}>{item.toUpperCase()}</p>
        ))
    }

    const halfDatalists = (title1:string, isFocused1:boolean, focusFunction1:Dispatch<SetStateAction<boolean>>, currInput1:string, setCurrInput1:Dispatch<SetStateAction<string>>, defaultOptions1:string[], options1:string[], setOptions1:Dispatch<SetStateAction<string[]>>, title2:string, isFocused2:boolean, focusFunction2:Dispatch<SetStateAction<boolean>>, currInput2:string, setCurrInput2:Dispatch<SetStateAction<string>>, defaultOptions2:string[], options2:string[], setOptions2:Dispatch<SetStateAction<string[]>>) => {
        return (
            <div key={`halfDatalists${title1}${title2}`} className={styles.halfinputFieldsContainer}>
                <input id='dateInput' placeholder={title1.toUpperCase()} className={`${styles.fullInputField} ${styles.halfInputField}`} ref={inputReference} onFocus={()=>focusFunction1(true)} onBlur={()=>handleOptionsVisibility(focusFunction1)} value={currInput1} onChange={(e)=>handleDataListChange(e, defaultOptions1, setCurrInput1, setOptions1)}></input>
                <div className={styles.datalistContainer} style={{width:inputWidth, visibility:(isFocused1?'visible':'hidden')}}>
                    {datalistOptions(options1, setCurrInput1, title1)}
                </div>

                <input placeholder={title2.toUpperCase()} className={`${styles.fullInputField} ${styles.halfInputField}`} ref={inputReference} onFocus={()=>focusFunction2(true)} onBlur={()=>handleOptionsVisibility(focusFunction2)} value={currInput2} onChange={(e)=>handleDataListChange(e, defaultOptions2, setCurrInput2, setOptions2)}></input>
                <div className={`${styles.datalistContainer} ${(isScreenSmall?styles.dataListMobileSecond:'')}`} style={{right:'8.4%', width:inputWidth, visibility:(isFocused2?'visible':'hidden')}}>
                    {datalistOptions(options2, setCurrInput2, title2)}
                </div>
            </div>
        )
    }

    const dateInputStyling = {
        paddingLeft:'2%', 
        paddingRight:'1.3%',
        fontSize:'23px',
        cursor:'pointer'
    }

    const [isStatusFocused, setStatusFocused] = useState<boolean>(false)
    const statuses = ["Sent", "Assessing", "Interviewing", "Resume Reject", "Assessment Reject", "Interview Reject", "Verbal Offer", "Written Offer"];
    const [statusSuggestions, setStatusSuggestions] = useState<string[]>(statuses);
    const [currentStatus, setCurrentStatus] = useState<string>('')

    const dateAndDrop = (title:string, isFocused:boolean, focusFunction:Dispatch<SetStateAction<boolean>>, currInput:string, setCurrInput:Dispatch<SetStateAction<string>>, defaultOptions:string[], options:string[], setOptions:Dispatch<SetStateAction<string[]>>) => {
        return (
            <div key={`dateAndDrop${title}`} className={styles.halfinputFieldsContainer}>
                <input type='date' id='dateInput' max={new Date().toISOString().split('T')[0]} className={`${styles.fullInputField} ${styles.halfInputField}`} style={dateInputStyling} onChange={(e)=>handleDateChange(e.target.value)}></input>
                <input placeholder={title.toUpperCase()} className={`${styles.fullInputField} ${styles.halfInputField}`} ref={inputReference} onFocus={()=>focusFunction(true)} onBlur={()=>handleOptionsVisibility(focusFunction)} value={currInput} onChange={(e)=>handleDataListChange(e, defaultOptions, setCurrInput, setOptions)}></input>
                <div className={`${styles.datalistContainer} ${(isScreenSmall?styles.dataListMobileSecond:'')}`} style={{right:'8.4%', width:inputWidth, visibility:(isFocused?'visible':'hidden')}}>
                    {datalistOptions(options, setCurrInput, title)}
                </div>
            </div>
        )
    }

    const halfInputField = (title1:string, currInput1:string, setCurrInput1:Dispatch<SetStateAction<string>>, title2:string, currInput2:string, setCurrInput2:Dispatch<SetStateAction<string>>) => {
        return (
            <div key={`halfInputField${title1}${title2}`} className={styles.halfinputFieldsContainer}>
                <input className={`${styles.fullInputField} ${styles.halfInputField}`} placeholder={title1.toUpperCase()} value={currInput1} onChange={(e)=>setCurrInput1(e.target.value)}></input>
                <input className={`${styles.fullInputField} ${styles.halfInputField}`} placeholder={title2.toUpperCase()} value={currInput2} onChange={(e)=>setCurrInput2(e.target.value)}></input>
            </div>
        )
    }

    const greyAreaClickFunction = (event:React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget)
            props.closeFunction(false)
    }

    return (
        <div className={styles.modalGreyScreen} onClick={(e)=>greyAreaClickFunction(e)}>
            <form className={styles.modalContainer}>
                <div className={styles.modalHeader}>
                    <h1 className={styles.modalTitle}>New Job</h1>
                    <button className={styles.modalClose} onClick={()=>props.closeFunction(false)}>X</button>
                </div>
                
                <div className={styles.inputFieldsContainer}>
                    <input className={styles.fullInputField} placeholder='TITLE' style={{margin:'auto'}} value={currentTitle} onChange={(e)=>setCurrentTitle(e.target.value)}></input>
                    {halfInputField('company', currentCompany, setCurrentCompany, 'location', currentLocation, setCurrentLocation)}
                    {halfDatalists('category', isCategoryFocused, setCategoryFocused, currentCategory, setCurrentCategory, categories, categoriesSuggestions, setCategoriesSuggestions, 'Job type', isJobTypeFocused, setJobTypeFocused, currentJobType, setCurrentJobType, jobTypes, jobTypeSuggestions, setJobTypeSuggestions)}
                    {dateAndDrop('status', isStatusFocused, setStatusFocused, currentStatus, setCurrentStatus, statuses, statusSuggestions, setStatusSuggestions)}
                    <input className={styles.fullInputField} placeholder='URL' style={{margin:'auto', marginTop:'20px'}} onChange={(e)=>setCurrentUrl(e.target.value)} value={currentUrl}></input>
                </div>
                
                <div onClick={()=>props.createJobFunction({JobID: props.currNumberOfJobs,Date: currentDate,Category: currentCategory,Company: currentCompany,Location: currentLocation,Status: currentStatus,Title: currentTitle,Type: currentJobType.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),URL: "https://www.google.com/",})}>
                    <FormButton position={{margin:'auto', marginTop:'20px'}} title='Submit' titleColor='black'></FormButton>
                </div>
            </form>
        </div>
    )
}

export default ModalCreate;