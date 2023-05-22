import styles from './modalstatus.module.scss';
import { BiChevronDown } from "react-icons/bi";

import { Dispatch, SetStateAction, useState } from 'react';

interface Props {
    isOpen: boolean;
    closeFunction: Dispatch<SetStateAction<boolean>>;
    currStatus: string;
}

const ModalStatus = (props:Props) => {
    
    const progressList = ['Sent', 'Assessment', 'Interviewing']
    const [currProgress, setCurrProgress] = useState('Sent')
    
    const rejectedList = ['Resume', 'Assessment', 'Interview']
    const [currRejected, setCurrRejected] = useState('Resume')
    
    const offerList = ['Verbal', 'Written']
    const [currOffer, setCurrOffer] = useState('Written')

    const [progressCheck, setProgressCheck] = useState(false)
    const [progressDrop, setProgressDrop] = useState(false)

    const [rejectedCheck, setRejectedCheck] = useState(false)
    const [rejectedDrop, setRejectedDrop] = useState(false)

    const [offerCheck, setOfferCheck] = useState(false)
    const [offerDrop, setOfferDrop] = useState(false)

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

    const unCheck = (radioButton:Dispatch<SetStateAction<boolean>>, radioState:boolean, dropdownState:boolean, dropDown:Dispatch<SetStateAction<boolean>>) => {
        if(radioState === false){
            for(let i = 0 ; i<3; i++){
                if(radioButtonList[i] != radioButton){
                    radioButtonList[i](false)
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

    const handleDataListOptionClick = (event:React.MouseEvent<HTMLDivElement>, newString:string, optionFunction:Dispatch<SetStateAction<string>>) => {
            optionFunction(newString)
            event.stopPropagation();
    };

    const datalistOption = (options:string[]) => {
        return options.map((item, index)=>(
            <p id={`statusOption${index}`} className={styles.datalistItem} onClick={(e)=>handleDataListOptionClick(e, item, (options===progressList?setCurrProgress:setCurrRejected))}>{item}</p>
        ))
    }

    const optionItem = () => {
        return optionsList.map((item, index) =>(
            <div id={`radioOption${index}`} className={styles.optionContainer} onClick={()=>unCheck(item.checkmarkFunction, item.checkmark, item.dropdown, item.dropdownFunction)} style={{backgroundColor:(item.checkmark?'#e6e6e6':'transparent')}}>
                <label className={styles.label}>
                    <input type="radio" name="radio" checked={item.checkmark} onChange={() => unCheck(item.checkmarkFunction, item.checkmark, item.dropdown, item.dropdownFunction)}/>
                    <span className={styles.check}></span>
                </label>
                <div className={styles.datalistContainer} onClick={(e) => handleDataListClick(e, item.checkmark, item.dropdown, item.dropdownFunction)} style={{color:(item.checkmark?'black':'#a4a3a4'), border:(item.checkmark?'solid 1px black':'solid 1px #a4a3a4')}}>
                    {currProgress}
                    <BiChevronDown className={styles.menuArrow} style ={{transform:item.dropdown ? 'rotate(180deg)' : 'rotate(0deg)', transition:'transform 0.7s ease'}}/>
                </div>
                <div className={styles.datalistOptions} style={{visibility:(item.dropdown?'visible':'hidden')}}>
                    {datalistOption(progressList)}
                </div>
            </div>
        ))
    }

    return (
        <div className={styles.modalGreyScreen}>
            <form className={styles.modalContainer}>
                <div className={styles.modalHeader}>
                    <h1 className={styles.modalTitle}>Update Status</h1>
                    <button className={styles.modalClose} onClick={()=>props.closeFunction(false)}>X</button>
                </div>

                <div className={styles.optionsGrid}>
                    {optionItem()}
                </div>
                
            </form>
        </div>
    )
}

export default ModalStatus;