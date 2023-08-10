import styles from './sankey.module.scss';

interface Props {
    isOpen: boolean;
    closeFunction: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalSankey = (props:Props) => {


    const greyAreaClickFunction = (event:React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget)
            props.closeFunction(false)
    }

    return (
        <div className={styles.modalGreyScreen} onClick={(e)=>greyAreaClickFunction(e)}>
            <div className={styles.modalContainer}>
                <div className={styles.modalHeader}>
                    <h1 className={styles.modalTitle}>Sankey Diagram</h1>
                    <button className={styles.modalClose} onClick={()=>props.closeFunction(false)}>X</button>
                </div>
            </div>
        </div>
    )
}

export default ModalSankey;