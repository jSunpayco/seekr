import styles from './jobitembutton.module.scss';
import { BiSync, BiTrash } from "react-icons/bi";
import { useState } from 'react';

interface Props {
    title: string;
    onClickFunction: React.Dispatch<React.SetStateAction<boolean>>;
}

const JobItemButton = (props:Props) => {

    const [isHovering, setHovering] = useState<boolean>(false)

    const hoverIcon = () =>{
        if(props.title === 'Update')
            return(
                <BiSync className={styles.statusIcon}/>
            )
        else
            return(
                <BiTrash className={styles.statusIcon}/>
            )
    }

    return (
        <button onMouseEnter={()=>setHovering(true)} onMouseLeave={()=>setHovering(false)} onClick={()=>props.onClickFunction(true)} className={styles.statusButton}>
            {!isHovering ? props.title : hoverIcon()}
        </button>
    )
}

export default JobItemButton;