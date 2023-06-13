import styles from './modalstatus.module.scss';
import { BiChevronDown } from "react-icons/bi";
import FormButton from '../FormButton/formbutton';

import { Dispatch, SetStateAction, useState, useEffect } from 'react';

interface Props {
    isOpen: boolean;
    closeFunction: Dispatch<SetStateAction<boolean>>;
    currStatus: string;
    jobInfo: {
        JobID: number;
        Date: string;
        Category: string;
        Company: string;
        Location: string;
        Status: string;
        Title: string;
        Type: string;
        URL: string;
    };
    updateJobsFunction:(jobID: number, jobStatus: string) => void;
}

const ModalStatus = (props:Props) => {
    
    const progressList = ['Sent', 'Assessment', 'Interviewing']
    const [currProgress, setCurrProgress] = useState(progressList.includes(props.jobInfo.Status) ? props.jobInfo.Status : 'Sent')
    
    const rejectedList = ['Resume Reject', 'Assessment Reject', 'Interview Reject']
    const [currRejected, setCurrRejected] = useState(rejectedList.includes(props.jobInfo.Status) ? props.jobInfo.Status : 'Resume Reject')
    
    const offerList = ['Verbal Offer', 'Written Offer']
    const [currOffer, setCurrOffer] = useState(offerList.includes(props.jobInfo.Status) ? props.jobInfo.Status : 'Verbal Offer')

    const [progressCheck, setProgressCheck] = useState(progressList.includes(props.jobInfo.Status))
    const [progressDrop, setProgressDrop] = useState(false)

    const [rejectedCheck, setRejectedCheck] = useState(rejectedList.includes(props.jobInfo.Status))
    const [rejectedDrop, setRejectedDrop] = useState(false)

    const [offerCheck, setOfferCheck] = useState(offerList.includes(props.jobInfo.Status))
    const [offerDrop, setOfferDrop] = useState(false)

    const [currentStatus, setCurrentStatus] = useState<string>(props.jobInfo.Status)

    const optionsList = [
        {
            name:'In Progress',
            optionList:progressList,
            currOption:currProgress,
            optionFunction:setCurrProgress,
            checkmark:progressCheck,
            checkmarkFunction:setProgressCheck,
            dropdown:progressDrop,
            dropdownFunction:setProgressDrop
        },
        {
            name:'Rejected',
            optionList:rejectedList,
            currOption:currRejected,
            optionFunction:setCurrRejected,
            checkmark:rejectedCheck,
            checkmarkFunction:setRejectedCheck,
            dropdown:rejectedDrop,
            dropdownFunction:setRejectedDrop  
        },
        {
            name:'Offer',
            optionList:offerList,
            currOption:currOffer,
            optionFunction:setCurrOffer,
            checkmark:offerCheck,
            checkmarkFunction:setOfferCheck,
            dropdown:offerDrop,
            dropdownFunction:setOfferDrop
        }
    ]

    const radioButtonList = [setProgressCheck, setRejectedCheck, setOfferCheck]
    const dropDownList = [setProgressDrop, setRejectedDrop, setOfferDrop]

    const unCheck = (radioButton:Dispatch<SetStateAction<boolean>>, radioState:boolean, dropdownState:boolean, dropDown:Dispatch<SetStateAction<boolean>>) => {
        if(radioState === false){
            for(let i = 0 ; i<3; i++){
                if(radioButtonList[i] != radioButton){
                    radioButtonList[i](false)
                    dropDownList[i](false)
                }
                else{
                    radioButtonList[i](true)
                }
            }
        }

        if(dropdownState){
            dropDown(false)
        }
    }

    const handleDataListClick = (event:React.MouseEvent<HTMLDivElement>, state:boolean, dropdownState:boolean, dropDown:Dispatch<SetStateAction<boolean>>) => {
        if(state){
            dropDown(!dropdownState)
            event.stopPropagation();
        }
    };

    const handleDataListOptionClick = (event:React.MouseEvent<HTMLDivElement>, newString:string, optionFunction:Dispatch<SetStateAction<string>>, dropDown:Dispatch<SetStateAction<boolean>>) => {
            optionFunction(newString)
            dropDown(false)
            setCurrentStatus(newString)
            event.stopPropagation();
    };

    const datalistOption = (options:string[], optionFunction:Dispatch<SetStateAction<string>>, dropDown:Dispatch<SetStateAction<boolean>>, optionIndex:number) => {
        return options.map((item, index)=>(
            <p key={`statusOption${index}`} id={`statusOption${optionIndex}${index}`} className={styles.datalistItem} onClick={(e)=>handleDataListOptionClick(e, item, optionFunction, dropDown)}>{item}</p>
        ))
    }

    const optionItem = () => {
        return optionsList.map((item, index) =>(
            <div key={`radioOption${index}`} id={`radioOption${index}`} className={styles.optionContainer} onClick={()=>unCheck(item.checkmarkFunction, item.checkmark, item.dropdown, item.dropdownFunction)} style={{backgroundColor:(item.checkmark?'#e6e6e6':'transparent')}}>
                <label className={`${styles.label} ${item.name==="Offer"?styles.offerOption:item.name==="Rejected"?styles.rejectOption:styles.progressOption}`}>
                    <input type="radio" name="radio" checked={item.checkmark} onChange={() => unCheck(item.checkmarkFunction, item.checkmark, item.dropdown, item.dropdownFunction)}/>
                    <span className={styles.check}></span>
                </label>
                <div id={`datalistContainer${index}`} className={styles.datalistContainer} onClick={(e) => handleDataListClick(e, item.checkmark, item.dropdown, item.dropdownFunction)} style={{color:(item.checkmark?'black':'#a4a3a4'), border:(item.checkmark?'solid 1px black':'solid 1px #a4a3a4')}}>
                    {item.currOption}
                    <BiChevronDown className={styles.menuArrow} style ={{transform:item.dropdown ? 'rotate(180deg)' : 'rotate(0deg)', transition:'transform 0.7s ease'}}/>
                </div>
                <div className={styles.datalistOptions} style={{visibility:(item.dropdown?'visible':'hidden')}}>
                    {datalistOption(item.optionList, item.optionFunction, item.dropdownFunction, index)}
                </div>
            </div>
        ))
    }

    useEffect(() => {
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

    return (
        <div className={styles.modalGreyScreen} onClick={(e)=>greyAreaClickFunction(e)}>
            <div className={styles.modalContainer}>
                <div className={styles.modalHeader}>
                    <h1 className={styles.modalTitle}>Update Status</h1>
                    <button className={styles.modalClose} onClick={()=>props.closeFunction(false)}>X</button>
                </div>

                <div className={styles.optionsGrid}>
                    {optionItem()}
                </div>
                
                <div id='updateStatusButton' onClick={()=>props.updateJobsFunction(props.jobInfo.JobID, currentStatus)}><FormButton position={{margin:'auto', marginTop:'15px'}} title='Update' titleColor='black'></FormButton></div>
            </div>
        </div>
    )
}

export default ModalStatus;