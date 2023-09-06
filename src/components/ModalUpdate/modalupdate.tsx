import styles from './modalupdate.module.scss';
import FormButton from '../FormButton/formbutton';

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

    const handleOptionsVisibility = () => {
        setTimeout(() => {
            setFocused(false);
        }, 100);
    }

    function datalistHasMatches(){
        if(displayedSuggestions.filter((item) => item.toLowerCase().startsWith(currStatus.name)).length > 0 || currStatus.name === '')
            return true
        else
            return false
    }

    const handleDataListChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let newStatus = {...currStatus,name:event.target.value}
        setCurrStatus(newStatus)

        if(event.target.value !== ''){
            let input = event.target.value;

            let newSuggestions = displayedSuggestions.filter((item) => item.toLowerCase().startsWith(input.toLowerCase()))
            setDisplayedSuggestions(newSuggestions)
        }
        else
            setDisplayedSuggestions(props.statusSuggestions)
    }

    const datalistOptions = () => {
        return displayedSuggestions.map((item, index) => (
            <p key={`datalistOptions${index}`} className={styles.datalistOption} onClick={()=>setCurrStatus({...currStatus,name:item})}>{item}</p>
        ))
    }

    const validateStatus = () =>{
        return currStatus.name !== ''
    }

    const onSubmit: SubmitHandler<FormInputs> = () => 
        props.jobInfo.Statuses[props.jobInfo.Statuses.length-1] !== currStatus ? props.updateJobsFunction(props.jobInfo.JobID, [...props.jobInfo.Statuses, currStatus]) : props.closeFunction(false);

    return (
        <div className={styles.modalGreyScreen} onClick={(e)=>greyAreaClickFunction(e)}>
            <div className={styles.modalContainer} ref={containerRef}>
                <div className={styles.modalHeader}>
                    <h1 className={styles.modalTitle}>Update Status</h1>
                    <button className={styles.modalClose} onClick={()=>props.closeFunction(false)}>X</button>
                </div>

                <div className={styles.viewChoiceContainer}>
                    <button className={styles.choiceButton} style={{borderBottom:borderView("general")}} onClick={()=>setCurrView("general")}>General</button>
                    <button className={styles.choiceButton} style={{borderBottom:borderView("status")}} onClick={()=>setCurrView("status")}>Status</button>
                </div>

                <Slide direction="right" in={currView==="general"} container={containerRef.current}>
                    <div style={{display:(currView==="general"?'flex':'none'), justifyContent:'center', marginTop:'20px'}}>
                        general
                    </div>
                </Slide>

                <Slide direction="left" in={currView==="status"} container={containerRef.current}>
                    <div style={{display:(currView==="status"?'flex':'none'), justifyContent:'center', marginTop:'20px'}}>
                        status
                    </div>
                </Slide>
                
                <div id='updateStatusButton' style={{marginBottom:'10px'}} onClick={handleSubmit(onSubmit)}><FormButton position={{margin:'auto', marginTop:'15px'}} title='Update' titleColor='black'></FormButton></div>
            </div>
        </div>
    )
}

export default ModalUpdate;