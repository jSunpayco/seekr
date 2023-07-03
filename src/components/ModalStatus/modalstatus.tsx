import styles from './modalstatus.module.scss';
import { BiChevronDown } from "react-icons/bi";
import FormButton from '../FormButton/formbutton';

import { Job } from '../../interfaces/Job';
import { Statuses } from '../../interfaces/Statuses';

import { Dispatch, SetStateAction, useState, useEffect } from 'react';

interface Props {
    isOpen: boolean;
    closeFunction: Dispatch<SetStateAction<boolean>>;
    jobInfo: Job;
    updateJobsFunction:(jobID: number, jobStatus: string) => void;
}

const ModalStatus = (props:Props) => {

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

    const [currStatus, setCurrStatus] = useState<Statuses>(props.jobInfo.Statuses[props.jobInfo.Statuses.length-1])

    const [progressChecked, setProgressChecked] = useState<boolean>(false)

    const [rejectedChecked, setRejectedChecked] = useState<boolean>(false)

    const [offerChecked, setOfferChecked] = useState<boolean>(false)

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

    const unCheck = (radioButton:Dispatch<SetStateAction<boolean>>, radioState:boolean) => {
        if(radioState === false){
            for(let i = 0 ; i<3; i++){
                if(optionMap[i].setChecked != radioButton){
                    optionMap[i].setChecked(false)
                }
                else{
                    optionMap[i].setChecked(true)
                }
            }
        }
    }

    const optionItem = () => {
        return optionMap.map((item, index) =>(
            <div className={styles.optionContainer} style={{backgroundColor:(item.checked?'#e6e6e6':'transparent')}} onClick={() => unCheck(item.setChecked, item.checked)}>
                <label key={`option${index}`} className={`${styles.label} ${item.name==="Offer"?styles.offerOption:item.name==="Rejected"?styles.rejectOption:styles.progressOption}`}>
                    <input type="radio" name="radio" checked={item.checked} onChange={() => unCheck(item.setChecked, item.checked)}/>
                    <span className={styles.check}></span>
                </label>
                <p style={{margin: 'auto'}}>{item.name}</p>
            </div>
        ))
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
                
                <div id='updateStatusButton'><FormButton position={{margin:'auto', marginTop:'15px'}} title='Update' titleColor='black'></FormButton></div>
            </div>
        </div>
    )
}

export default ModalStatus;