import styles from './formbutton.module.scss';
import {AiOutlineArrowRight} from 'react-icons/ai';

interface Props {
    title: string;
    position:any;
    titleColor?:string;
}

const FormButton = (props:Props) => {
    return (
        <div className={styles.container + " " + (props.titleColor==='black'?styles.blackContainer:styles.greyContainer)} style={props.position}>
            <span className={styles.innerCircle} style={{borderColor:props.titleColor==='black'?'white':'black'}}><AiOutlineArrowRight className={styles.arrow} style={{color:props.titleColor==='black'?'white':'black'}}/></span>
            <span className={styles.buttonText}>{props.title.toUpperCase()}</span>
        </div>
    )
}

export default FormButton;