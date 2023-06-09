import styles from './navigation.module.scss';
import { BiMenu, BiChevronDown } from "react-icons/bi";

import {ClickAwayListener, useMediaQuery} from '@mui/material';

import { useState } from 'react';

interface Job {
    JobID: number;
    Date: string;
    Month: string;
    Category: string;
    Company: string;
    Location: string;
    Status: string;
    Title: string;
    Type: string;
    URL: string;
}

interface Props {
    data: Job[];
    boxClick: (value: string, filter: string, checked: boolean) => void;
}

const Navigation = (props:Props) => {

    const isScreenSmall = useMediaQuery('(max-width: 730px)');

    const handleDesktopClickAway = (toggleFunction:React.Dispatch<React.SetStateAction<boolean>>) => {
        if(!isScreenSmall)
            toggleFunction(false)
    }

    const handleMobileClickAway = (toggleFunction:React.Dispatch<React.SetStateAction<boolean>>) => {
        if(isScreenSmall)
            toggleFunction(false)
    }

    const locationOptions = props.data.map(job => job.Location);
    const categoryOptions = props.data.map(job => job.Category)
    const monthOptions = props.data.map(job => job.Month);
    const positionOptions = ['Full Time', 'Intern', 'Temporary']
    const statusOptions = ['Sent', 'Resume Reject', 'Offer', 'OA', 'OA Reject', 'Interview']

    const [categoryClicked, setCategoryClicked] = useState(false)
    const [locationClicked, setLocationClicked] = useState(false)
    const [monthClicked, setMonthClicked] = useState(false)
    const [positionClicked, setPositionClicked] = useState(false)
    const [statusClicked, setStatusClicked] = useState(false)

    const [hasActiveFilter, setHasActiveFilter] = useState<boolean>(false)

    const filterButtons = [setCategoryClicked, setLocationClicked, setMonthClicked, setPositionClicked, setStatusClicked]

    function clickFilterButton(toggleState:any, currState:boolean){
        if(currState === false){
            setHasActiveFilter(true)
            if(hasActiveFilter){
                for(let i = 0; i < filterButtons.length; i++){
                    if(filterButtons[i] !== toggleState)
                        filterButtons[i](false)
                }
                setTimeout(() => {
                    toggleState(true)
                }, 500);
            }else{
                toggleState(true)
            }
        }
        else{
            setHasActiveFilter(false)
            toggleState(false)
        }
    }

    const [isMenuOpened, setMenuOpened] = useState<boolean>(false)

    const filters = [
        {
            name:"Category",
            isClicked:categoryClicked,
            isClickedFunction:setCategoryClicked,
            options:categoryOptions.sort()
        },
        {
            name:"Location",
            isClicked:locationClicked,
            isClickedFunction:setLocationClicked,
            options:locationOptions.sort()
        },
        {
            name:"Month",
            isClicked:monthClicked,
            isClickedFunction:setMonthClicked,
            options:monthOptions.sort()
        },
        {
            name:"Position",
            isClicked:positionClicked,
            isClickedFunction:setPositionClicked,
            options:positionOptions.sort()
        },
        {
            name:"Status",
            isClicked:statusClicked,
            isClickedFunction:setStatusClicked,
            options:statusOptions.sort()
        }
    ]

    const handleCheckboxClick = (checked:boolean, item:string, name:string, boxId:string) => {
        const checkbox1 = document.getElementById(boxId) as HTMLInputElement;
        if(checkbox1!=null)
            checkbox1.checked = !checkbox1.checked;

        props.boxClick(item, name, checked)
    }

    const filterOptions = (options:string[], name:string) => {
        return options.map((item, index) => (
            <div key={`option${item}${index}`} id={`option${item}${index}`} className={styles.mobileOption}>
                <label htmlFor={`mobileOptionInput${item}${index}`} className={styles.mobileOptionLabel}>
                    <input id={`mobileOptionInput${item}${index}`} type="checkbox" value={item} className={styles.mobileOptionInput} onChange={(e)=>handleCheckboxClick(e.target.checked, item, name, `optionInput${item}${index}`)}/>
                    {item}
                </label>
            </div>
        ))
    }

    const desktopFilterOptions = (options:string[], name:string) => {
        return options.map((item, index) => (
            <label key={`optionInput${item}${index}`} htmlFor={`optionInput${item}${index}`} className={styles.desktopOptionLabel} style={{marginBottom:(index===options.length-1?'5%':'0')}}>
                <input id={`optionInput${item}${index}`} type="checkbox" value={item} className={styles.desktopOptionInput} onChange={(e)=>handleCheckboxClick(e.target.checked, item, name, `mobileOptionInput${item}${index}`)}/>
                {item}
            </label>
        ))
    }

    const desktopFilters = () => {
        return filters.map((item, index) => (
            <ClickAwayListener onClickAway={()=>handleDesktopClickAway(item.isClickedFunction)} key={`desktopFilter${index}`}>
                <div id={`desktopFilter${index}`}>
                    <p className={styles.desktopFilterName} onClick={() => clickFilterButton(item.isClickedFunction, item.isClicked)}>
                        {item.name}{<BiChevronDown style ={{transform:item.isClicked ? 'rotate(180deg)' : 'rotate(0deg)', transition:'transform 1s ease'}}/>}
                    </p>
                    <div className={styles.desktopOptionsContainer} style={{maxHeight:(item.isClicked?'1000px':'0px')}}>
                        {desktopFilterOptions(item.options, item.name)}
                    </div>
                </div>
            </ClickAwayListener>
        ))
    }

    const mobileFilters = () => {
        return filters.map((item, index) => (
            <ClickAwayListener onClickAway={()=>handleMobileClickAway(item.isClickedFunction)} key={`mobileFilter${index}`}>
                <div>
                    <div id={`mobileFilter${index}`} onClick={() => clickFilterButton(item.isClickedFunction, item.isClicked)} className={styles.mobileFilterOption}>
                        {item.name} <BiChevronDown style ={{transform:item.isClicked ? 'rotate(180deg)' : 'rotate(0deg)', transition:'transform 1s ease'}}/>
                    </div>
                    <div className={styles.optionsContainer} style={{maxHeight:(item.isClicked?'500px':'0px')}}>
                        {filterOptions(item.options, item.name)}
                    </div>
                </div>
            </ClickAwayListener>
        ))
    }

    return (
        <div className={`${styles.navigationContainer} ${isMenuOpened?styles.mobileMenuOpened:styles.mobileMenuClosed}`}>
            <div className={styles.navigationHeader}>
                <h1 className={styles.logo}>SeekR</h1>
                <div className={styles.filtersContainer}>
                    {desktopFilters()}
                    <a href='/' className={styles.logoutButton}>Logout</a>
                </div>

                <BiMenu className={styles.mobileMenuButton} onClick={()=>setMenuOpened(!isMenuOpened)}/>
            </div>

            <div className={styles.mobileMenuContainer} style={{opacity:(isMenuOpened?'100':'0'), transition:'opacity 1s'}}>
                {mobileFilters()}
                <a href='/' className={`${styles.logoutButton} ${styles.mobileLogoutButton}`}>Logout</a>
            </div>
        </div>
    )
}

export default Navigation;