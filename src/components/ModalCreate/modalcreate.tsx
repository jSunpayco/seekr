import styles from './modalcreate.module.scss';
import FormButton from '../FormButton/formbutton';
import { BiChevronDown } from "react-icons/bi";

import { Dispatch, SetStateAction, useState, useRef, useEffect, ChangeEvent } from 'react';

import {useMediaQuery, ClickAwayListener} from '@mui/material';

import { useForm, SubmitHandler } from 'react-hook-form';

import { Job } from '../../interfaces/Job';

type FormInputs = {
    Date: string;
    Category: string;
    Company: string;
    Location: string;
    Status: string;
    StatusType:string;
    Title: string;
    Type: string;
    URL: string;
};

interface Props {
    isOpen: boolean;
    closeFunction: Dispatch<SetStateAction<boolean>>;
    currNumberOfJobs:number;
    createJobFunction:(jobItem: Job) => void;
    categories: string[],
    statuses: string[],
    jobtypes: string[]
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
    
    const jobTypes = props.jobtypes;
    const [jobTypeSuggestions, setJobTypeSuggestions] = useState<string[]>(jobTypes);
    const [currentJobType, setCurrentJobType] = useState<string>('');

    const categories = props.categories;
    const [categoriesSuggestions, setCategoriesSuggestions] = useState<string[]>(categories);
    const [currentCategory, setCurrentCategory] = useState<string>('');

    const [isStatusFocused, setStatusFocused] = useState<boolean>(false);
    const statuses = props.statuses;
    const [statusSuggestions, setStatusSuggestions] = useState<string[]>(statuses);
    const [currentStatus, setCurrentStatus] = useState<string>('');

    const statusTypes = ["In Progress", "Rejected", "Offer"];
    const [currentStatusType, setCurrentStatusType] = useState<string>('STATUS TYPE');
    const [isStatusTypeClicked, setStatusTypeClicked] = useState<boolean>(false);

    function datalistHasMatches(suggestions:string[], userInput:string){
        if(suggestions.filter((item) => item.toLowerCase().startsWith(userInput)).length > 0 || userInput === '')
            return true
        else
            return false
    }

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
                    <input id='category' {...register('Category', { validate: validateCategory })} placeholder={title1.toUpperCase()} className={`${styles.fullInputField}`} style={{width:'100%', border:errors.Category?'#d30000 solid 1px':'transparent'}} ref={inputReference} onFocus={()=>focusFunction1(true)} onBlur={()=>handleOptionsVisibility(focusFunction1)} value={currInput1} onChange={(e)=>handleDataListChange(e, defaultOptions1, setCurrInput1, setOptions1)}></input>
                    <div className={styles.datalistContainer} style={{width:inputWidth, visibility:(isFocused1&&datalistHasMatches(options1, currInput1)?'visible':'hidden')}}>
                        {datalistOptions(options1, setCurrInput1, title1)}
                    </div>
                    {errors.Category && <span id='categoryError' className={styles.error}>Please choose a valid category</span>}
                </div>
                <div className={styles.halfInputField}>
                    <input id='type' {...register('Type', { validate: validateType })} placeholder={title2.toUpperCase()} className={`${styles.fullInputField}`} style={{width:'100%', border:errors.Type?'#d30000 solid 1px':'transparent'}} ref={inputReference} onFocus={()=>focusFunction2(true)} onBlur={()=>handleOptionsVisibility(focusFunction2)} value={currInput2} onChange={(e)=>handleDataListChange(e, defaultOptions2, setCurrInput2, setOptions2)}></input>
                    <div className={`${styles.datalistContainer} ${(isScreenSmall?styles.dataListMobileSecond:'')}`} style={{width:inputWidth, visibility:(isFocused2&&datalistHasMatches(options2, currInput2)?'visible':'hidden')}}>
                        {datalistOptions(options2, setCurrInput2, title2)}
                    </div>
                    {errors.Type && <span id='typeError' className={styles.error}>Please choose a valid Job Type</span>}
                </div>
            </div>
        )
    }

    const dateInputStyling = {
        paddingLeft:'10px', 
        paddingRight:'10px',
        fontSize:'23px',
        cursor:'pointer',
        width:'100%', 
        border:errors.Date?'#d30000 solid 1px':'transparent'
    }

    const halfInputField = (title1:string, currInput1:string, setCurrInput1:Dispatch<SetStateAction<string>>, title2:string, currInput2:string, setCurrInput2:Dispatch<SetStateAction<string>>) => {
        return (
            <div key={`halfInputField${title1}${title2}`} className={styles.halfinputFieldsContainer}>
                <div className={styles.halfInputField}>
                    <input id='company' {...register('Company', { required: true })} className={`${styles.fullInputField}`} style={{width:'100%', border:errors.Company?'#d30000 solid 1px':'transparent'}} placeholder={title1.toUpperCase()} value={currInput1} onChange={(e)=>setCurrInput1(e.target.value)}></input>
                    {errors.Company && <span id='companyError' className={styles.error}>Please enter a valid company</span>}
                </div>
                <div className={styles.halfInputField}>
                    <input id='location' {...register('Location', { required: true })} className={`${styles.fullInputField}`} style={{width:'100%', border:errors.Location?'#d30000 solid 1px':'transparent'}} placeholder={title2.toUpperCase()} value={currInput2} onChange={(e)=>setCurrInput2(e.target.value)}></input>
                    {errors.Location && <span id='locationError' className={styles.error}>Please enter a valid location</span>}
                </div>
            </div>
        )
    }

    const greyAreaClickFunction = (event:React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget)
            props.closeFunction(false)
    }

    const validateCategory = () => {
        return currentCategory.length > 0;
    };

    const validateType = () => {
        return currentJobType.length > 0;
    };

    const validateStatus = () => {
        return statuses.includes(currentStatus.toLowerCase())
    };

    const validateStatusType = () => {
        console.log(currentStatusType === 'status type'.toUpperCase())
        return currentStatusType !== 'status type'.toUpperCase();
    };

    const validateUrl = (value:string) => {
        let regex = /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?\/?$/;
        return regex.test(value)
    };

    const monthMapping: { [key: string]: string } = {
        "01": "January",
        "02": "February",
        "03": "March",
        "04": "April",
        "05": "May",
        "06": "June",
        "07": "July",
        "08": "August",
        "09": "September",
        "10": "October",
        "11": "November",
        "12": "December"
    };

    const createJob = () => {
        props.createJobFunction({
            JobID: props.currNumberOfJobs,
            Date: currentDate,
            Month: monthMapping[currentDate.split("/")[0]],
            Category: currentCategory.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
            Company: currentCompany,
            Location: currentLocation,
            Statuses:[
                {
                    type: currentStatusType.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
                    name: currentStatus.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
                    date: '04/25/2023'
                }
            ],
            Title: currentTitle,
            Type: currentJobType.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
            URL: currentUrl
        })
    }

    const onSubmit: SubmitHandler<FormInputs> = () => createJob();

    return (
        <div className={styles.modalGreyScreen} onClick={(e)=>greyAreaClickFunction(e)}>
            <form className={styles.modalContainer}>
                <div className={styles.modalHeader}>
                    <h1 className={styles.modalTitle}>New Job</h1>
                    <button className={styles.modalClose} onClick={()=>props.closeFunction(false)}>X</button>
                </div>
                
                <div className={styles.inputFieldsContainer}>
                    <div className={styles.singleInputContainer}>
                        <input id='title' {...register('Title', { required: true })} className={styles.fullInputField} placeholder='TITLE' style={{margin:'auto', border:errors.Title?'#d30000 solid 1px':'transparent'}} value={currentTitle} onChange={(e)=>setCurrentTitle(e.target.value)}></input>
                        {errors.Title && <span id='titleError' className={styles.error} style={{marginLeft:'12%'}}>Please enter a valid title</span>}
                    </div>
                    {halfInputField('company', currentCompany, setCurrentCompany, 'location', currentLocation, setCurrentLocation)}
                    {halfDatalists('category', isCategoryFocused, setCategoryFocused, currentCategory, setCurrentCategory, categories, categoriesSuggestions, setCategoriesSuggestions, 'Job type', isJobTypeFocused, setJobTypeFocused, currentJobType, setCurrentJobType, jobTypes, jobTypeSuggestions, setJobTypeSuggestions)}
                    
                    <div className={styles.halfinputFieldsContainer}>
                        <div className={styles.halfInputField}>
                            <input id='date' {...register('Date', { max: new Date().toISOString().split('T')[0], required: true})} type='date' max={new Date().toISOString().split('T')[0]} className={`${styles.fullInputField}`} style={dateInputStyling} onChange={(e)=>handleDateChange(e.target.value)}></input>
                            {errors.Date && <span id='dateError' className={styles.error}>Please choose a valid date</span>}
                        </div>
                        <div className={styles.halfInputField}>
                            <input id='url' {...register('URL', { validate: validateUrl })} className={styles.fullInputField} placeholder='URL' style={{width:'100%', border:errors.Status?'#d30000 solid 1px':'transparent'}} onChange={(e)=>setCurrentUrl(e.target.value)} value={currentUrl}></input>
                            {errors.URL && <span id='urlError' className={styles.error}>Please enter a valid URL</span>}
                        </div>
                    </div>

                    <div className={styles.halfinputFieldsContainer}>
                        <div className={styles.halfInputField} onClick={()=>setStatusTypeClicked(!isStatusTypeClicked)}>
                            <ClickAwayListener onClickAway={()=>setStatusTypeClicked(false)}>
                                <p id='statusType' {...register('StatusType', { validate: validateStatusType })} className={`${styles.fullInputField} ${styles.dropdownField}`} style={{width:'100%', border:errors.StatusType?'#d30000 solid 1px':'transparent'}}>
                                    {currentStatusType}{<BiChevronDown style ={{transform:isStatusTypeClicked ? 'rotate(180deg)' : 'rotate(0deg)', transition:'transform 1s ease'}} className={styles.dropDownArrow}/>}
                                </p>
                            </ClickAwayListener>
                            <div className={`${styles.datalistContainer} ${(isScreenSmall?styles.dataListMobileSecond:'')}`} style={{width:inputWidth, visibility:(isStatusTypeClicked?'visible':'hidden')}}>
                                {datalistOptions(statusTypes, setCurrentStatusType, 'statustype')}
                            </div>
                            {errors.StatusType && <span id='urlError' className={styles.error}>Please choose a status type</span>}
                        </div>
                        <div className={styles.halfInputField}>
                            <input id='status' {...register('Status', { validate: validateStatus })} placeholder={'Status Name'.toUpperCase()} className={`${styles.fullInputField}`} style={{width:'100%', border:errors.Status?'#d30000 solid 1px':'transparent'}} ref={inputReference} onFocus={()=>setStatusFocused(true)} onBlur={()=>handleOptionsVisibility(setStatusFocused)} value={currentStatus} onChange={(e)=>handleDataListChange(e, props.statuses, setCurrentStatus, setStatusSuggestions)}></input>
                            <div className={`${styles.datalistContainer} ${(isScreenSmall?styles.dataListMobileSecond:'')}`} style={{width:inputWidth, visibility:(isStatusFocused&&datalistHasMatches(statusSuggestions, currentStatus)?'visible':'hidden')}}>
                                {datalistOptions(statusSuggestions, setCurrentStatus, 'status')}
                            </div>
                            {errors.Status && <span id='statusError' className={styles.error}>Please choose a valid status</span>}
                        </div>
                    </div>
                </div>
                
                <div id='submitJobButton' onClick={handleSubmit(onSubmit)}>
                    <FormButton position={{margin:'auto', marginTop:'20px'}} title='Submit' titleColor='black'></FormButton>
                </div>
            </form>
        </div>
    )
}

export default ModalCreate;