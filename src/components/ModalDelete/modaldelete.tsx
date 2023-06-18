import styles from './modaldelete.module.scss';
import FormButton from '../FormButton/formbutton';

import { Dispatch, SetStateAction, useEffect } from 'react';

interface Props {
    isOpen: boolean;
    closeFunction: Dispatch<SetStateAction<boolean>>;
    jobId: number;
    jobName: string;
    deleteFunction: (jobId: number) => void;
}

const ModalDelete = (props:Props) => {
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
                <h1 id='deleteTitle' className={styles.modalTitle}>Delete {props.jobName}?</h1>
                <div className={styles.buttonsContainer}>
                    <div id='cancelDeleteButton' onClick={()=>props.closeFunction(false)} style={{marginBottom:'20px'}}><FormButton position={{margin:'auto', marginTop:'15px'}} title='Cancel' titleColor='black'></FormButton></div>
                    <div id='confirmDeleteButton' onClick={()=>props.deleteFunction(props.jobId)} style={{marginBottom:'20px'}}><FormButton position={{margin:'auto', marginTop:'15px'}} title='Delete' titleColor='black'></FormButton></div>
                </div>
            </div>
        </div>
    )
}

export default ModalDelete;