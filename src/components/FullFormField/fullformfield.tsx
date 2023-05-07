import styles from './fullformfield.module.scss';

interface Props {
    title: string;
    type: string;
}

const FullFormField = (props:Props) => {

    return (
        <div className={styles.fieldContainer}>
            <label className={styles.inputLabel}>{props.title.toUpperCase()}</label>
            <input type={props.type} className={styles.inputField}></input>
        </div>
    )
}

export default FullFormField;