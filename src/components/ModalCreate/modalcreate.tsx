import styles from './modalcreate.module.scss';
import FormButton from '../FormButton/formbutton';

import { Dispatch, SetStateAction, useState } from 'react';

interface Props {
    isOpen: boolean;
    closeFunction: Dispatch<SetStateAction<boolean>>;
}

const ModalCreate = (props:Props) => {

    return (
        <div className={styles.modalGreyScreen}>
            <form className={styles.modalContainer}>
                <div className={styles.modalHeader}>
                    <h1 className={styles.modalTitle}>New Job</h1>
                    <button className={styles.modalClose} onClick={()=>props.closeFunction(false)}>X</button>
                </div>
                
                <div className={styles.inputFieldsContainer}>
                    <input className={styles.fullInputField} placeholder='EMAIL' style={{margin:'auto'}}></input>
                    <div className={styles.halfinputFieldsContainer}>
                        <input className={styles.fullInputField} style={{width:'35%'}} placeholder='EMAIL'></input>
                        <input className={styles.fullInputField} style={{width:'35%'}} placeholder='EMAIL'></input>
                    </div>
                </div>
                
                <FormButton position={{margin:'auto', marginTop:'15px'}} title='Submit' titleColor='black'></FormButton>
            </form>
        </div>
    )
}

export default ModalCreate;