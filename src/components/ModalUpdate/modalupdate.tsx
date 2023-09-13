import styles from './modalupdate.module.scss';
import navStyles from '../Navigation/navigation.module.scss'
import createStyles from '../ModalCreate/modalcreate.module.scss'
import FormButton from '../FormButton/formbutton';
import { BiChevronDown, BiChevronUp, BiTrash, BiAddToQueue } from "react-icons/bi";

import { Job } from '../../interfaces/Job';
import { Statuses } from '../../interfaces/Statuses';

import { Dispatch, SetStateAction, useState, useEffect, useRef } from 'react';
import {useMediaQuery, Slide, ClickAwayListener} from '@mui/material';

import { useForm, SubmitHandler } from 'react-hook-form';

type FormInputs = {
    Title: string;
    URL: string;
};

interface Props {
    isOpen: boolean;
    closeFunction: Dispatch<SetStateAction<boolean>>;
    jobInfo: Job;
    updateJobsFunction:(changedJob: Job) => void;
    statusSuggestions: string[];
    categories: string[];
    jobtypes: string[];
}

const ModalUpdate = (props:Props) => {

    const isScreenSmall = useMediaQuery('(max-width: 560px)');

    const inputReference = useRef<HTMLInputElement>(null);
    const [inputWidth, setInputWidth] = useState<string | number>('auto');

    useEffect(() => {
        if (inputReference.current) {
            const width = inputReference.current.offsetWidth;
            setInputWidth(width);
        }

        if (statusInputReference.current) {
            const width = statusInputReference.current.offsetWidth;
            setStatusInputWidth(width);
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

    const greyAreaClickFunction = (event:React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget)
            props.closeFunction(false)
    }

    const [currView, setCurrView] = useState<string>("general");

    useEffect(() => {
        if (statusInputReference.current && statusInputWidth === 0) {
            const width = statusInputReference.current.offsetWidth;
            setStatusInputWidth(width);
        }
    }, [currView]);

    function borderView(option:string){
        if(option === "general" && currView === "general" || option === "status" && currView === "status")
            return "1px solid";
        else
            return "none";
    }

    const containerRef = useRef<HTMLDivElement>(null);

    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();

    const [currentTitle, setCurrentTitle] = useState(props.jobInfo.Title);
    const [currentCompany, setCurrentCompany] = useState(props.jobInfo.Company)
    const [currentLocation, setCurrentLocation] = useState(props.jobInfo.Location)
    const [currentUrl, setCurrentUrl] = useState(props.jobInfo.URL)
    const [currentCategory, setCurrentCategory] = useState<string>(props.jobInfo.Category);
    const [currentJobType, setCurrentJobType] = useState<string>('');
    
    const jobTypes = props.jobtypes;
    const [jobTypeSuggestions, setJobTypeSuggestions] = useState<string[]>(jobTypes);
    const [isJobTypeFocused, setJobTypeFocused] = useState<boolean>(false)

    const categories = props.categories;
    const [categoriesSuggestions, setCategoriesSuggestions] = useState<string[]>(categories);
    const [isCategoryFocused, setCategoryFocused] = useState<boolean>(false)

    const handleOptionsVisibility = (listFunction:Dispatch<SetStateAction<boolean>>) => {
        setTimeout(() => {
            listFunction(false);
        }, 100);
    }

    const handleDataListChange = (event: React.ChangeEvent<HTMLInputElement>, defaultOptions:string[], currentItemFunction:Dispatch<SetStateAction<string>>, optionsFunction:Dispatch<SetStateAction<string[]>>) => {
        currentItemFunction(event.target.value)
        if(event.target.value !== ''){
            let input = event.target.value;

            let newSuggestions = defaultOptions.filter((item) => item.toLowerCase().startsWith(input.toLowerCase()))
            optionsFunction(newSuggestions)
        }
        else
            optionsFunction(defaultOptions)
    }

    const datalistOptions = (options:string[], currentFunction:Dispatch<SetStateAction<string>>, title:string) => {
        return options.map((item, index) => (
            <p key={`datalistOptions${title}${index}`} id={`datalistOptions${title}${index}`} className={styles.datalistOption} onClick={()=>currentFunction(item.toUpperCase())}>{item.toUpperCase()}</p>
        ))
    }

    function datalistHasMatches(suggestions:string[], userInput:string){
        if(suggestions.filter((item) => item.toLowerCase().startsWith(userInput)).length > 0 || userInput === '')
            return true
        else
            return false
    }

    const validateUrl = (value:string) => {
        let regex = /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?\/?$/;
        return regex.test(value)
    };

    // STATUS VIEW

    const [isAddHovered, setAddHovered] = useState<Boolean>(false);

    const [statuses, setStatuses] = useState<Statuses[]>(props.jobInfo.Statuses);

    const [currName, setCurrName] = useState<string>("");
    const [currDate, setCurrDate] = useState<string>("");

    const dateRegex = /^(0?[1-9]|1[0-2])[\/](0?[1-9]|[12]\d|3[01])[\/](19|20)\d{2}$/;

    const handleDateChange = (currDate:string) => {
        let parts = currDate.split('-');
        setCurrDate(`${parts[1]}/${parts[2]}/${parts[0]}`)
    }
    
    const statusTypes = ["In Progress", "Rejected", "Offer"];
    const [currType, setCurrType] = useState<string>('STATUS TYPE');
    const [isTypeClicked, setTypeClicked] = useState<boolean>(false);
    const statusInputReference = useRef<HTMLParagraphElement>(null);
    const [statusInputWidth, setStatusInputWidth] = useState<string | number>('auto');

    const [dateError, setDateError] = useState<Boolean>(false);
    const [typeError, setTypeError] = useState<Boolean>(false);
    const [nameError, setNameError] = useState<Boolean>(false);

    const statusItem = () => {
        return statuses.map((item, index) => (
            <div key={`status${index}`} className={styles.statusItemContainer}>
                <p className={`${styles.statusItem} ${(item.type === 'Offer'?styles.legendColorOffer:item.type === 'Rejected'?styles.legendColorReject:styles.legendColorProgress)}`}>
                    {item.name}
                </p>
                <p>{item.date}</p>
                <div className={styles.statusButtonsContainer}>
                    <BiChevronDown className={styles.statusButton} onClick={()=>swapStatus(index, "down")}/>
                    <BiChevronUp className={styles.statusButton} onClick={()=>swapStatus(index, "up")}/>
                    <BiTrash className={styles.statusButton} onClick={()=>deleteStatus(index)}/>
                </div>
            </div>
        ))
    }

    function swapStatus(index:number, direction:string){
        const temp = [...statuses]
        if(direction === "up" && index > 0){
            [temp[index-1], temp[index]] = [temp[index], temp[index-1]]
            setStatuses(temp);
        }
        else if(direction === "down" && index < statuses.length - 1){
            [temp[index], temp[index+1]] = [temp[index+1], temp[index]]
            setStatuses(temp);
        }
    }

    function deleteStatus(index:number){
        if(statuses.length > 1)
            setStatuses(statuses.filter((_, i) => i !== index));
    }

    function addStatus(){
        var hasError = false;

        const newType = currType ? currType.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : "";
        
        if(!statusTypes.includes(newType)){
            setTypeError(true);
            hasError = true;
        }else
            setTypeError(false);

        if(currName.length <= 0){
            setNameError(true);
            hasError = true;
        }else
            setNameError(false);


        if(!dateRegex.test(currDate)){
            setDateError(true);
            hasError = true;
        }else
            setDateError(false);

        if(hasError === false){
            setStatuses([...statuses, {name:currName, date:currDate, type:newType}]);
            setCurrDate("");
            setCurrName("");
            setCurrType("STATUS TYPE");
        }
    }

    const onSubmit: SubmitHandler<FormInputs> = () => {
        const tempJob = currView === "general" ? {
            ... props.jobInfo,
            Category: currentCategory ? currentCategory.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : "",
            Company: currentCompany,
            Location: currentLocation,
            Title: currentTitle,
            Type: currentJobType ? currentJobType.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : "",
            URL: currentUrl
        }
        : {
            ... props.jobInfo,
            Statuses: statuses
        }

        if(tempJob != props.jobInfo){
            props.updateJobsFunction(tempJob);
        }
        else{
            props.closeFunction(false)
        }
    };

    return (
        <div className={styles.modalGreyScreen} onClick={(e)=>greyAreaClickFunction(e)}>
            <div className={styles.modalContainer} ref={containerRef}>
                <div className={styles.modalHeader}>
                    <h1 className={styles.modalTitle}>Update Job</h1>
                    <button className={styles.modalClose} onClick={()=>props.closeFunction(false)}>X</button>
                </div>

                <div className={styles.viewChoiceContainer}>
                    <button className={styles.choiceButton} style={{borderBottom:borderView("general")}} onClick={()=>setCurrView("general")}>General</button>
                    <button className={styles.choiceButton} style={{borderBottom:borderView("status")}} onClick={()=>setCurrView("status")}>Status</button>
                </div>

                <Slide direction="right" in={currView==="general"} container={containerRef.current}>
                    <form className={styles.settingsContainer} style={{display:(currView==="general"?'flex':'none')}}>
                        <div className={styles.settingsContainer}>
                            <input id='title' className={styles.fullInputField} {...register('Title', { required: true })} placeholder='TITLE *' style={{margin:'auto', border:errors.Title?'#d30000 solid 1px':'transparent'}} value={currentTitle} onChange={(e)=>setCurrentTitle(e.target.value)}></input>
                            {errors.Title && <span id='titleError' className={styles.error}>Please enter a valid title</span>}
                        </div>

                        <div className={styles.halfinputFieldsContainer}>
                            <div className={styles.halfInputField}>
                                <input id='company' className={`${styles.fullInputField}`} style={{width:'100%'}} placeholder={'company'.toUpperCase()} value={currentCompany} onChange={(e)=>setCurrentCompany(e.target.value)}></input>
                            </div>
                            <div className={styles.halfInputField}>
                                <input id='location' className={`${styles.fullInputField}`} style={{width:'100%'}} placeholder={'location'.toUpperCase()} value={currentLocation} onChange={(e)=>setCurrentLocation(e.target.value)}></input>
                            </div>
                        </div>

                        <div className={styles.halfinputFieldsContainer}>
                            <div className={styles.halfInputField}>
                                <input id='category' placeholder={'category'.toUpperCase()} className={`${styles.fullInputField}`} style={{width:'100%'}} ref={inputReference} onFocus={()=>setCategoryFocused(true)} onBlur={()=>handleOptionsVisibility(setCategoryFocused)} value={currentCategory} onChange={(e)=>handleDataListChange(e, categories, setCurrentCategory, setCategoriesSuggestions)}></input>
                                <div className={styles.datalistContainer} style={{width:inputWidth, visibility:(isCategoryFocused&&datalistHasMatches(categoriesSuggestions, currentCategory)?'visible':'hidden')}}>
                                    {datalistOptions(categoriesSuggestions, setCurrentCategory, 'category')}
                                </div>
                            </div>
                            <div className={styles.halfInputField}>
                                <input id='type' placeholder={'Job type'.toUpperCase()} className={`${styles.fullInputField}`} style={{width:'100%'}} ref={inputReference} onFocus={()=>setJobTypeFocused(true)} onBlur={()=>handleOptionsVisibility(setJobTypeFocused)} value={currentJobType} onChange={(e)=>handleDataListChange(e, jobTypes, setCurrentJobType, setJobTypeSuggestions)}></input>
                                <div className={`${styles.datalistContainer} ${(isScreenSmall?styles.dataListMobileSecond:'')}`} style={{width:inputWidth, visibility:(isJobTypeFocused&&datalistHasMatches(jobTypeSuggestions, currentJobType)?'visible':'hidden')}}>
                                    {datalistOptions(jobTypeSuggestions, setCurrentJobType, 'Job type')}
                                </div>
                            </div>
                        </div>
                        <div className={styles.settingsContainer}>
                            <input id='url' className={styles.fullInputField} {...register('URL', { validate: validateUrl })} placeholder='URL *' style={{margin:'auto', border:errors.URL?'#d30000 solid 1px':'transparent'}} value={currentUrl} onChange={(e)=>setCurrentUrl(e.target.value)}></input>
                            {errors.URL && <span id='urlError' className={styles.error}>Please enter a valid URL</span>}
                        </div>
                    </form>
                </Slide>

                <Slide direction="left" in={currView==="status"} container={containerRef.current}>
                    <div className={styles.settingsContainer} style={{display:(currView==="status"?'flex':'none')}}>
                        <div className={styles.statusItemsContainer}>
                            {statusItem()}
                        </div>
                        <div className={styles.newStatusContainer}>
                            <div onClick={()=>setTypeClicked(!isTypeClicked)} style={{width:'100%'}}>
                                <ClickAwayListener onClickAway={()=>setTypeClicked(false)}>
                                    <p id='statusType' className={`${styles.fullInputField} ${styles.statusInputField} ${styles.statusDropDown}`} ref={statusInputReference} style={{border:typeError?'#d30000 solid 1px':'transparent'}}>
                                        {currType}{<BiChevronDown style ={{transform:isTypeClicked ? 'rotate(180deg)' : 'rotate(0deg)', transition:'transform 1s ease'}} className={styles.dropDownArrow}/>}
                                    </p>
                                </ClickAwayListener>
                                {typeError && <span id='statusTypeError' className={styles.error}>Required</span>}
                                <div className={`${styles.datalistContainer} ${(isScreenSmall?createStyles.dataListMobileSecond:'')}`} style={{width:statusInputWidth, visibility:(isTypeClicked?'visible':'hidden'), marginTop:(typeError?'-15px':'2px')}}>
                                    {datalistOptions(statusTypes, setCurrType, 'statustype')}
                                </div>
                            </div>
                            <div style={{width:'100%'}}>
                                <input id='statusName' className={`${styles.fullInputField} ${styles.statusInputField}`} style={{border:nameError?'#d30000 solid 1px':'transparent'}} placeholder='Status Name' value={currName} onChange={(e)=>setCurrName(e.target.value)}></input>
                                {nameError && <span id='statusNameError' className={styles.error}>Required</span>}
                            </div>
                            <div style={{width:'100%'}}> 
                                <input id='statusDate' className={`${styles.fullInputField} ${styles.statusInputField}`} type='date' style={{paddingRight:'10px', border:dateError?'#d30000 solid 1px':'transparent'}} onChange={(e)=>handleDateChange(e.target.value)}></input>
                                {dateError && <span id='statusDateError' className={styles.error}>Required</span>}
                            </div>
                            <button className={`${navStyles.logoutButton} ${styles.newStatusAddButton}`} onMouseEnter={()=>setAddHovered(true)} onMouseLeave={()=>setAddHovered(false)} onClick={()=>addStatus()}>
                                {isAddHovered?(<BiAddToQueue/>):(<span style={{fontSize:'17px'}}>Add</span>)}
                            </button>
                        </div>
                    </div>
                </Slide>
                {/* Add onClick */}
                <div id='updateStatusButton' style={{marginBottom:'10px'}} onClick={handleSubmit(onSubmit)}><FormButton position={{margin:'20px auto'}} title='Update' titleColor='black'></FormButton></div>
            </div>
        </div>
    )
}

export default ModalUpdate;