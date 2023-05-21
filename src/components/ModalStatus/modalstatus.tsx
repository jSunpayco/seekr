import styles from './modalstatus.module.scss';
import { BiChevronDown } from "react-icons/bi";

import { Dispatch, SetStateAction, useState } from 'react';

interface Props {
    isOpen: boolean;
    closeFunction: Dispatch<SetStateAction<boolean>>;
    currStatus: string;
}

const ModalStatus = (props:Props) => {

    const [check, setCheck] = useState(false)
    const [check1, setCheck1] = useState(false)
    
    const [drop1, setDrop1] = useState(false)

    const unCheck = (radioButton:Dispatch<SetStateAction<boolean>>, radioState:boolean, dropdownState:boolean, dropDown:Dispatch<SetStateAction<boolean>>) => {
        radioButton(!radioState)
        if(dropdownState){
            dropDown(false)
        }
    }

    const handleDataListClick = (event:React.MouseEvent<HTMLDivElement>, state:boolean) => {
        if(state){
            setDrop1(!drop1)
            event.stopPropagation();
        }
    };

    const handleDataListOptionClick = (event:React.MouseEvent<HTMLDivElement>, newString:string) => {
            setCurrProgress(newString)
            event.stopPropagation();
    };
    
    const progressList = ['Sent', 'Assessment', 'Interviewing']
    const [currProgress, setCurrProgress] = useState('Sent')

    const datalistOption = (options:string[]) => {
        return options.map((item, index)=>(
            <p id={`statusOption ${index}`} className={styles.datalistItem} onClick={(e)=>handleDataListOptionClick(e, item)}>{item}</p>
        ))
    }

    return (
        <div className={styles.modalGreyScreen}>
            <form className={styles.modalContainer}>
                <div className={styles.modalHeader}>
                    <h1 className={styles.modalTitle}>Update Status</h1>
                    <button className={styles.modalClose} onClick={()=>props.closeFunction(false)}>X</button>
                </div>

                <div className={styles.optionContainer} onClick={()=>unCheck(setCheck1, check1, drop1, setDrop1)} style={{backgroundColor:(check1?'#e6e6e6':'')}}>
                    <label className={styles.label}>
                        <input type="radio" name="radio" checked={check1}/>
                        <span className={styles.check}></span>
                    </label>
                    <div className={styles.datalistContainer} onClick={(e) => handleDataListClick(e, check1)} style={{color:(check1?'black':'#a4a3a4'), border:(check1?'solid 1px black':'solid 1px #a4a3a4')}}>
                        {currProgress}
                        <BiChevronDown className={styles.menuArrow}/>
                    </div>
                    <div className={styles.datalistOptions} style={{visibility:(drop1?'visible':'hidden')}}>
                        {datalistOption(progressList)}
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ModalStatus;