import styles from './formbutton.module.scss';
import {AiOutlineArrowRight} from 'react-icons/ai';

interface Props {
    title: string;
    position:any;
    titleColor?:string;
}

const FormButton = (props:Props) => {

    return (
        <div className={styles.container} style={props.position}>
            <span className={styles.innerCircle}><AiOutlineArrowRight className={styles.arrow}/></span>
            <span className={styles.buttonText} style={{color:props.titleColor?props.titleColor:''}}>{props.title.toUpperCase()}</span>
        </div>
    )
}

export default FormButton;