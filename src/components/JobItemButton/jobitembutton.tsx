import styles from './jobitembutton.module.scss';
import { BiSync, BiTrash } from "react-icons/bi";
import { useState } from 'react';
import { Job } from '../../interfaces/Job';

interface Props {
    title: string;
    id:string;
    onClickFunction:any;
    jobInfo?: Job;
    jobId?:number;
}

const JobItemButton = (props:Props) => {

    const [isHovering, setHovering] = useState<boolean>(false)

    const hoverIcon = () =>{
        if(props.title === 'Update')
            return(
                <BiSync/>
            )
        else
            return(
                <BiTrash/>
            )
    }

    const handleClick = () => {
        if(props.jobInfo)
            props.onClickFunction(props.jobInfo)
        else
            props.onClickFunction(props.jobId)
    }

    return (
        <button id={props.id} onMouseEnter={()=>setHovering(true)} onMouseLeave={()=>setHovering(false)} onClick={handleClick} className={styles.statusButton}>
            {!isHovering ? props.title : hoverIcon()}
        </button>
    )
}

export default JobItemButton;