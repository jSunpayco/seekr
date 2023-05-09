import styles from './formbutton.module.scss';
import {AiOutlineArrowRight} from 'react-icons/ai';

interface Props {
    title?: string;
    type?: string;
}

const FormButton = (props:Props) => {

    return (
        <div className={styles.container}>
            <span className={styles.innerCircle}><AiOutlineArrowRight className={styles.arrow}/></span>
            <span className={styles.buttonText}>TEXT</span>
        </div>
    )
}

export default FormButton;