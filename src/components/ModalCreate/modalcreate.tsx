import styles from './modalcreate.module.scss';
import FormButton from '../FormButton/formbutton';
import { BiChevronDown } from "react-icons/bi";

import { Dispatch, SetStateAction, useState, useRef, useEffect, ChangeEvent } from 'react';

interface Props {
    isOpen: boolean;
    closeFunction: Dispatch<SetStateAction<boolean>>;
}

const ModalCreate = (props:Props) => {

    const inputReference = useRef<HTMLInputElement>(null);
    const [inputWidth, setInputWidth] = useState<string | number>('auto');

    useEffect(() => {
        if (inputReference.current) {
          const width = inputReference.current.offsetWidth;
          setInputWidth(width);
        }
      }, []);

    const [isJobTypeFocused, setJobTypeFocused] = useState<boolean>(false)
    const [isCategoryFocused, setCategoryFocused] = useState<boolean>(false)
    
    const jobTypes = ['full time', 'internship', 'temporary'];
    const [jobTypeSuggestions, setJobTypeSuggestions] = useState<string[]>(jobTypes);
    const [currentJobType, setCurrentJobType] = useState<string>('')

    const categories = ['swe', 'sdet', 'qa', 'support']
    const [categoriesSuggestions, setCategoriesSuggestions] = useState<string[]>(categories);
    const [currentCategory, setCurrentCategory] = useState<string>('')

    const handleDataListChange = (event: ChangeEvent<HTMLInputElement>, defaultOptions:string[], currentItemFunction:Dispatch<SetStateAction<string>>, optionsFunction:Dispatch<SetStateAction<string[]>>) => {
        currentItemFunction(event.target.value)
        if(event.target.value !== ''){
            let input = event.target.value;

            let newSuggestions = defaultOptions.filter((item) => item.toLowerCase().startsWith(input.toLowerCase()))
            optionsFunction(newSuggestions)
        }
        else
            optionsFunction(defaultOptions)
    }

    const handleOptionsVisibility = (listFunction:Dispatch<SetStateAction<boolean>>) => {
        setTimeout(() => {
            listFunction(false);
        }, 100);
    }

    const datalistOptions = (options:string[], currentFunction:Dispatch<SetStateAction<string>>) => {
        return options.map((item) => (
            <p className={styles.datalistOption} onClick={()=>currentFunction(item.toUpperCase())}>{item.toUpperCase()}</p>
        ))
    }

    const halfDatalists = (title1:string, title2:string) => {
        return (
            <div className={styles.halfinputFieldsContainer}>
                <input placeholder={title1.toUpperCase()} className={styles.fullInputField} style={{width:'45%'}} ref={inputReference} onFocus={()=>setCategoryFocused(true)} onBlur={()=>handleOptionsVisibility(setCategoryFocused)} value={currentCategory} onChange={(e)=>handleDataListChange(e, categories, setCurrentCategory, setCategoriesSuggestions)}></input>
                <div className={styles.datalistContainer} style={{width:inputWidth, visibility:(isCategoryFocused?'visible':'hidden')}}>
                    {datalistOptions(categoriesSuggestions, setCurrentCategory)}
                </div>

                <input placeholder={title2.toUpperCase()} className={styles.fullInputField} style={{width:'45%'}} ref={inputReference} onFocus={()=>setJobTypeFocused(true)} onBlur={()=>handleOptionsVisibility(setJobTypeFocused)} value={currentJobType} onChange={(e)=>handleDataListChange(e, jobTypes, setCurrentJobType, setJobTypeSuggestions)}></input>
                <div className={styles.datalistContainer} style={{right:'8.4%', width:inputWidth, visibility:(isJobTypeFocused?'visible':'hidden')}}>
                    {datalistOptions(jobTypeSuggestions, setCurrentJobType)}
                </div>
            </div>
        )
    }

    const [isStatusOpen, setStatusOpen] = useState<boolean>(false);
    const statuses = ["Sent", "Assessing", "Interviewing", "Resume Reject", "Assessment Reject", "Interview Reject", "Verbal Offer", "Written Offer"];

    const dropDowns = (title1:string, title2:string) => {
        return (
            <div className={styles.halfinputFieldsContainer}>
                <div className={`${styles.fullInputField} ${styles.dropdownContainer}`} style={{width:'45%'}}>
                    <p style={{userSelect:'none'}}>{title1.toUpperCase()}</p>
                    <BiChevronDown className={styles.menuArrow} style={{marginRight:'5%'}}/>
                </div>
                <div className={`${styles.fullInputField} ${styles.dropdownContainer}`} style={{width:'45%'}}>
                    <p style={{userSelect:'none'}}>{title2.toUpperCase()}</p>
                    <BiChevronDown className={styles.menuArrow} style={{marginRight:'5%'}}/>
                </div>
            </div>
        )
    }

    const halfInputField = (title1:string, title2:string) => {
        return (
            <div className={styles.halfinputFieldsContainer}>
                <input className={styles.fullInputField} style={{width:'45%'}} placeholder={title1.toUpperCase()}></input>
                <input className={styles.fullInputField} style={{width:'45%'}} placeholder={title2.toUpperCase()}></input>
            </div>
        )
    }

    return (
        <div className={styles.modalGreyScreen}>
            <form className={styles.modalContainer}>
                <div className={styles.modalHeader}>
                    <h1 className={styles.modalTitle}>New Job</h1>
                    <button className={styles.modalClose} onClick={()=>props.closeFunction(false)}>X</button>
                </div>
                
                <div className={styles.inputFieldsContainer}>
                    <input className={styles.fullInputField} placeholder='Title' style={{margin:'auto'}}></input>
                    {halfInputField('company', 'location')}
                    {halfDatalists('category', 'job type')}
                    {dropDowns('date added', 'status')}
                    <input className={styles.fullInputField} placeholder='URL' style={{margin:'auto', marginTop:'20px'}}></input>
                </div>
                
                <FormButton position={{margin:'auto', marginTop:'20px'}} title='Submit' titleColor='black'></FormButton>
            </form>
        </div>
    )
}

export default ModalCreate;