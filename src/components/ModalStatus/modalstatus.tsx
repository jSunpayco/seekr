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

    const handleDataListClick = (event:React.MouseEvent<HTMLDivElement>, state:boolean) => {
        if(state)
            event.stopPropagation();
      };

    return (
        <div className={styles.modalGreyScreen}>
            <form className={styles.modalContainer}>
                <div className={styles.modalHeader}>
                    <h1 className={styles.modalTitle}>Update Status</h1>
                    <button className={styles.modalClose} onClick={()=>props.closeFunction(false)}>X</button>
                </div>

                <div className={styles.optionContainer} onClick={()=>setCheck1(!check1)}>
                    <label className={styles.label}>
                        <input type="radio" name="radio" checked={check1}/>
                        <span className={styles.check}></span>
                    </label>
                    <div className={styles.datalistContainer} onClick={(e) => handleDataListClick(e, check1)} style={{color:(check1?'black':'#a4a3a4'), border:(check1?'solid 1px black':'solid 1px #a4a3a4')}}>
                        Something
                        <BiChevronDown className={styles.menuArrow}/>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ModalStatus;