import styles from './modalupdate.module.scss';
import navStyles from '../Navigation/navigation.module.scss'
import FormButton from '../FormButton/formbutton';
import { BiChevronDown, BiChevronUp, BiTrash, BiAddToQueue } from "react-icons/bi";

import { Job } from '../../interfaces/Job';
import { Statuses } from '../../interfaces/Statuses';

import { Dispatch, SetStateAction, useState, useEffect, useRef } from 'react';
import {useMediaQuery, Slide} from '@mui/material';

import { useForm, SubmitHandler } from 'react-hook-form';

type FormInputs = {
    StatusName: string;
};

interface Props {
    isOpen: boolean;
    closeFunction: Dispatch<SetStateAction<boolean>>;
    jobInfo: Job;
    updateJobsFunction:(jobID: number, jobStatus: Statuses[]) => void;
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

    function borderView(option:string){
        if(option === "general" && currView === "general" || option === "status" && currView === "status")
            return "1px solid";
        else
            return "none";
    }

    const containerRef = useRef<HTMLDivElement>(null);

    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();

    const currentDate = new Date();
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

    // STATUS VIEW

    const [isAddHovered, setAddHovered] = useState<Boolean>(false);

    const [statuses, setStatuses] = useState<Statuses[]>(props.jobInfo.Statuses);

    const statusItem = () => {
        return statuses.map((item, index) => (
            <div key={`status${index}`} className={styles.statusItemContainer}>
                <p className={`${styles.statusItem} ${(item.type === 'Offer'?styles.legendColorOffer:item.type === 'Rejected'?styles.legendColorReject:styles.legendColorProgress)}`}>
                    {item.name}
                </p>
                <p>{item.date}</p>
                <BiChevronDown className={styles.statusButton}/>
                <BiChevronUp className={styles.statusButton}/>
                <BiTrash className={styles.statusButton}/>
            </div>
        ))
    }

    // OLD FUNCTIONS BELOW

    const [currStatus, setCurrStatus] = useState<Statuses>({...props.jobInfo.Statuses[props.jobInfo.Statuses.length-1]
        , date:`${String(currentDate.getMonth() + 1).padStart(2, '0')}/${String(currentDate.getDate()).padStart(2, '0')}/${String(currentDate.getFullYear())}`})

    const [progressChecked, setProgressChecked] = useState<boolean>(currStatus.type === 'In Progress')

    const [rejectedChecked, setRejectedChecked] = useState<boolean>(currStatus.type === 'Rejected')

    const [offerChecked, setOfferChecked] = useState<boolean>(currStatus.type === 'Offer')

    const optionMap = [
        {
            name: "In Progress",
            checked: progressChecked,
            setChecked: setProgressChecked

        },
        {
            name: "Rejected",
            checked: rejectedChecked,
            setChecked: setRejectedChecked

        },
        {
            name: "Offer",
            checked: offerChecked,
            setChecked: setOfferChecked

        }
    ]

    const unCheck = (radioButton:Dispatch<SetStateAction<boolean>>, radioState:boolean, statusName:string) => {
        if(radioState === false){
            for(let i = 0 ; i<3; i++){
                if(optionMap[i].setChecked != radioButton){
                    optionMap[i].setChecked(false)
                }
                else{
                    optionMap[i].setChecked(true)
                    let newStatus = {...currStatus,type:statusName}
                    setCurrStatus(newStatus)
                }
            }
        }
    }

    const optionItem = () => {
        return optionMap.map((item, index) =>(
            <div id={`statusOption${index}`} className={styles.optionContainer} style={{backgroundColor:(item.checked?'#e6e6e6':'transparent')}} onClick={() => unCheck(item.setChecked, item.checked, item.name)}>
                <label key={`option${index}`} className={`${styles.label} ${item.name==="Offer"?styles.offerOption:item.name==="Rejected"?styles.rejectOption:styles.progressOption}`}>
                    <input type="radio" name="radio" checked={item.checked} onChange={() => unCheck(item.setChecked, item.checked, item.name)}/>
                    <span className={styles.check}></span>
                </label>
                <p className={styles.statusTypeName}>{item.name}</p>
            </div>
        ))
    }

    const [isFocused, setFocused] = useState<boolean>(false);
    const [displayedSuggestions, setDisplayedSuggestions] = useState<string[]>(props.statusSuggestions)

    const validateStatus = () =>{
        return currStatus.name !== ''
    }

    //Create a condition to check if current view is in General or Status
    const onSubmit: SubmitHandler<FormInputs> = () => 
        props.jobInfo.Statuses[props.jobInfo.Statuses.length-1] !== currStatus ? props.updateJobsFunction(props.jobInfo.JobID, [...props.jobInfo.Statuses, currStatus]) : props.closeFunction(false);

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
                    <div className={styles.settingsContainer} style={{display:(currView==="general"?'flex':'none')}}>
                        <div className={styles.settingsContainer}>
                            <input id='title' className={styles.fullInputField} placeholder='TITLE *' style={{margin:'auto'}} value={currentTitle} onChange={(e)=>setCurrentTitle(e.target.value)}></input>
                            {/* {errors.Title && <span id='titleError' className={styles.error} style={{marginLeft:'12%'}}>Please enter a valid title</span>} */}
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
                    </div>
                </Slide>

                <Slide direction="left" in={currView==="status"} container={containerRef.current}>
                    <div className={styles.settingsContainer} style={{display:(currView==="status"?'flex':'none')}}>
                        <div className={styles.statusItemsContainer}>
                            {statusItem()}
                        </div>
                        <div className={styles.newStatusContainer}>
                            <input id='statusType' className={`${styles.fullInputField} ${styles.statusInputField}`} placeholder='Status Type' style={{margin:'auto'}}></input>
                            <input id='statusName' className={`${styles.fullInputField} ${styles.statusInputField}`} placeholder='Status Name' style={{margin:'auto'}}></input>
                            <button className={`${navStyles.logoutButton} ${styles.newStatusAddButton}`} onMouseEnter={()=>setAddHovered(true)} onMouseLeave={()=>setAddHovered(false)}>
                                {isAddHovered?(<BiAddToQueue/>):(<span style={{fontSize:'17px'}}>Add</span>)}
                            </button>
                        </div>
                    </div>
                </Slide>
                
                <div id='updateStatusButton' style={{marginBottom:'10px'}} onClick={handleSubmit(onSubmit)}><FormButton position={{margin:'20px auto'}} title='Update' titleColor='black'></FormButton></div>
            </div>
        </div>
    )
}

export default ModalUpdate;