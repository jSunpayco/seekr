import styles from './modalcreate.module.scss';
import FormButton from '../FormButton/formbutton';

import { Dispatch, SetStateAction, useState, useRef, useEffect, ChangeEvent } from 'react';

import {useMediaQuery} from '@mui/material';

import { useForm, SubmitHandler } from 'react-hook-form';


type FormInputs = {
    Date: string;
    Category: string;
    Company: string;
    Location: string;
    Status: string;
    Title: string;
    Type: string;
    URL: string;
};

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

    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();

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
                <div className={styles.halfInputField}>
                    <input {...register('Category', { required: true })} id='dateInput' placeholder={title1.toUpperCase()} className={`${styles.fullInputField}`} style={{width:'100%'}} ref={inputReference} onFocus={()=>focusFunction1(true)} onBlur={()=>handleOptionsVisibility(focusFunction1)} value={currInput1} onChange={(e)=>handleDataListChange(e, defaultOptions1, setCurrInput1, setOptions1)}></input>
                    <div className={styles.datalistContainer} style={{width:inputWidth, visibility:(isFocused1?'visible':'hidden')}}>
                        {datalistOptions(options1, setCurrInput1, title1)}
                    </div>
                    {errors.Category && <span className={styles.error}>Error</span>}
                </div>
                <div className={styles.halfInputField}>
                    <input {...register('Type', { required: true })} placeholder={title2.toUpperCase()} className={`${styles.fullInputField}`} style={{width:'100%'}} ref={inputReference} onFocus={()=>focusFunction2(true)} onBlur={()=>handleOptionsVisibility(focusFunction2)} value={currInput2} onChange={(e)=>handleDataListChange(e, defaultOptions2, setCurrInput2, setOptions2)}></input>
                    <div className={`${styles.datalistContainer} ${(isScreenSmall?styles.dataListMobileSecond:'')}`} style={{right:'8.4%', width:inputWidth, visibility:(isFocused2?'visible':'hidden')}}>
                        {datalistOptions(options2, setCurrInput2, title2)}
                    </div>
                    {errors.Type && <span className={styles.error}>Error</span>}
                </div>
            </div>
        )
    }

    const dateInputStyling = {
        paddingLeft:'10px', 
        paddingRight:'10px',
        fontSize:'23px',
        cursor:'pointer',
        width:'100%'
    }

    const [isStatusFocused, setStatusFocused] = useState<boolean>(false)
    const statuses = ["Sent", "Assessing", "Interviewing", "Resume Reject", "Assessment Reject", "Interview Reject", "Verbal Offer", "Written Offer"];
    const [statusSuggestions, setStatusSuggestions] = useState<string[]>(statuses);
    const [currentStatus, setCurrentStatus] = useState<string>('')

    const dateAndDrop = (title:string, isFocused:boolean, focusFunction:Dispatch<SetStateAction<boolean>>, currInput:string, setCurrInput:Dispatch<SetStateAction<string>>, defaultOptions:string[], options:string[], setOptions:Dispatch<SetStateAction<string[]>>) => {
        return (
            <div key={`dateAndDrop${title}`} className={styles.halfinputFieldsContainer}>
                <div className={styles.halfInputField}>
                    <input {...register('Date', { required: true })} type='date' id='dateInput' max={new Date().toISOString().split('T')[0]} className={`${styles.fullInputField}`} style={dateInputStyling} onChange={(e)=>handleDateChange(e.target.value)}></input>
                    {errors.Date && <span className={styles.error}>Error</span>}
                </div>
                <div className={styles.halfInputField}>
                    <input {...register('Status', { required: true })} placeholder={title.toUpperCase()} className={`${styles.fullInputField}`} style={{width:'100%'}} ref={inputReference} onFocus={()=>focusFunction(true)} onBlur={()=>handleOptionsVisibility(focusFunction)} value={currInput} onChange={(e)=>handleDataListChange(e, defaultOptions, setCurrInput, setOptions)}></input>
                    <div className={`${styles.datalistContainer} ${(isScreenSmall?styles.dataListMobileSecond:'')}`} style={{right:'8.4%', width:inputWidth, visibility:(isFocused?'visible':'hidden')}}>
                        {datalistOptions(options, setCurrInput, title)}
                    </div>
                    {errors.Status && <span className={styles.error}>Error</span>}
                </div>
            </div>
        )
    }

    const halfInputField = (title1:string, currInput1:string, setCurrInput1:Dispatch<SetStateAction<string>>, title2:string, currInput2:string, setCurrInput2:Dispatch<SetStateAction<string>>) => {
        return (
            <div key={`halfInputField${title1}${title2}`} className={styles.halfinputFieldsContainer}>
                <div className={styles.halfInputField}>
                    <input {...register('Company', { required: true })} className={`${styles.fullInputField}`} style={{width:'100%'}} placeholder={title1.toUpperCase()} value={currInput1} onChange={(e)=>setCurrInput1(e.target.value)}></input>
                    {errors.Company && <span className={styles.error}>Error</span>}
                </div>
                <div className={styles.halfInputField}>
                    <input {...register('Location', { required: true })} className={`${styles.fullInputField}`} style={{width:'100%'}} placeholder={title2.toUpperCase()} value={currInput2} onChange={(e)=>setCurrInput2(e.target.value)}></input>
                    {errors.Location && <span className={styles.error}>Error</span>}
                </div>
            </div>
        )
    }

    const greyAreaClickFunction = (event:React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget)
            props.closeFunction(false)
    }

    const createJob = () => {
        props.createJobFunction({
            JobID: props.currNumberOfJobs,
            Date: currentDate,
            Category: currentCategory.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
            Company: currentCompany,
            Location: currentLocation,
            Status: currentStatus.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
            Title: currentTitle,
            Type: currentJobType.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
            URL: "https://www.google.com/"
        })
    }

    const onSubmit: SubmitHandler<FormInputs> = data => console.log(data);

    return (
        <div className={styles.modalGreyScreen} onClick={(e)=>greyAreaClickFunction(e)}>
            <form className={styles.modalContainer}>
                <div className={styles.modalHeader}>
                    <h1 className={styles.modalTitle}>New Job</h1>
                    <button className={styles.modalClose} onClick={()=>props.closeFunction(false)}>X</button>
                </div>
                
                <div className={styles.inputFieldsContainer}>
                    <div className={styles.singleInputContainer}>
                        <input {...register('Title', { required: true })} className={styles.fullInputField} placeholder='TITLE' style={{margin:'auto', border:errors.Title?'#d30000 solid 1px':'transparent'}} value={currentTitle} onChange={(e)=>setCurrentTitle(e.target.value)}></input>
                        {errors.Title && <span className={styles.error} style={{marginLeft:'12%'}}>Error</span>}
                    </div>
                    {halfInputField('company', currentCompany, setCurrentCompany, 'location', currentLocation, setCurrentLocation)}
                    {halfDatalists('category', isCategoryFocused, setCategoryFocused, currentCategory, setCurrentCategory, categories, categoriesSuggestions, setCategoriesSuggestions, 'Job type', isJobTypeFocused, setJobTypeFocused, currentJobType, setCurrentJobType, jobTypes, jobTypeSuggestions, setJobTypeSuggestions)}
                    {dateAndDrop('status', isStatusFocused, setStatusFocused, currentStatus, setCurrentStatus, statuses, statusSuggestions, setStatusSuggestions)}
                    <div className={styles.singleInputContainer}>
                        <input {...register('URL', { required: true })} className={styles.fullInputField} placeholder='URL' style={{margin:'auto', marginTop:'20px'}} onChange={(e)=>setCurrentUrl(e.target.value)} value={currentUrl}></input>
                        {errors.URL && <span className={styles.error} style={{marginLeft:'12%'}}>Error</span>}
                    </div>
                    
                </div>
                
                <div onClick={handleSubmit(onSubmit)}>
                    <FormButton position={{margin:'auto', marginTop:'20px'}} title='Submit' titleColor='black'></FormButton>
                </div>
            </form>
        </div>
    )
}

export default ModalCreate;