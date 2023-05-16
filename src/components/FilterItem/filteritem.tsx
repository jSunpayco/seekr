import styles from './filteritem.module.scss';
import { BiChevronDown } from "react-icons/bi";

interface Props {
    title: string;
    isClicked: boolean;
    clickFunction: Function;
    toggleSetter: React.Dispatch<React.SetStateAction<boolean>>;
    options: Array<string>;
}

const FilterItem = (props:Props) => {

    return (
        <div>
            <p className={styles.filterName} onClick={() => props.clickFunction(props.toggleSetter, props.isClicked)}>{props.title}{<BiChevronDown className={styles.filterIcon} style ={{transform:props.isClicked ? 'rotate(180deg)' : 'rotate(0deg)', transition:'transform 1s ease'}}/>}</p>
            <div className={styles.optionsContainer} style={{visibility: (props.isClicked?'visible':'hidden')}}>
                <p className={styles.optionName}>
                    All
                </p>
                <p className={styles.optionName}>
                    Tea
                </p>
                <p className={styles.optionName}>
                    Coffee
                </p>
                <p className={styles.optionName}>
                    Sacramento, CA
                </p>
            </div>
        </div>
    )
}

export default FilterItem;