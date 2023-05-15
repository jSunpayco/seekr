import styles from './filteritem.module.scss';
import { BiChevronDown } from "react-icons/bi";

interface Props {
    title: string;
    isClicked: boolean;
    clickFunction: React.Dispatch<React.SetStateAction<boolean>>;
}

const FilterItem = (props:Props) => {

    return (
        <div>
            <p className={styles.filterName} onClick={() => props.clickFunction(!props.isClicked)}>{props.title}{<BiChevronDown className={styles.filterIcon} style ={{transform:props.isClicked ? 'rotate(180deg)' : 'rotate(0deg)', transition:'transform 1s ease'}}/>}</p>
        </div>
    )
}

export default FilterItem;