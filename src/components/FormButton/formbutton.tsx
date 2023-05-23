import styles from './formbutton.module.scss';
import {AiOutlineArrowRight} from 'react-icons/ai';

interface Props {
    title: string;
    position:any;
}

const FormButton = (props:Props) => {

    return (
        <div className={styles.container} style={props.position}>
            <span className={styles.innerCircle}><AiOutlineArrowRight className={styles.arrow}/></span>
            <span className={styles.buttonText}>{props.title.toUpperCase()}</span>
        </div>
    )
}

export default FormButton;