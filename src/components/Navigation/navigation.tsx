import styles from './navigation.module.scss';

import FilterItem from '../FilterItem/filteritem';

import { useState } from 'react';

const Navigation = () => {

    const locationOptions = ['Remote', 'Sacramento', 'Boston', 'San Francisco']
    const categoryOptions = ['SWE', 'SDET', 'Cybersecurity']
    const monthOptions = ['February', 'March', 'April', 'May']
    const positionOptions = ['Full Time', 'Intern', 'Temporary']
    const statusOptions = ['Sent', 'Resume Reject', 'Offer', 'OA', 'OA Reject', 'Interview', 'Saved']

    const [categoryClicked, setCategoryClicked] = useState(false)
    const [locationClicked, setLocationClicked] = useState(false)
    const [monthClicked, setMonthClicked] = useState(false)
    const [positionClicked, setPositionClicked] = useState(false)
    const [statusClicked, setStatusClicked] = useState(false)

    const filterButtons = [setCategoryClicked, setLocationClicked, setMonthClicked, setPositionClicked, setStatusClicked]

    function clickFilterButton(toggleState:any, currState:boolean){
        if(currState === false)
            for(let i = 0; i < filterButtons.length; i++){
                if(filterButtons[i] !== toggleState)
                    filterButtons[i](false)
                else
                    toggleState(true)
            }
        else
            toggleState(false)
    }

    return (
        <div className={styles.navigationContainer}>
            <div className={styles.navigationHeader}>
                <h1 className={styles.logo}>SeekR</h1>
                <div className={styles.filtersContainer}>
                    <FilterItem title='Category' isClicked={categoryClicked} toggleSetter={setCategoryClicked} clickFunction={clickFilterButton} options={locationOptions}></FilterItem>
                    <FilterItem title='Location' isClicked={locationClicked} toggleSetter={setLocationClicked} clickFunction={clickFilterButton} options={categoryOptions}></FilterItem>

                    <FilterItem title='Month' isClicked={monthClicked} toggleSetter={setMonthClicked} clickFunction={clickFilterButton} options={monthOptions}></FilterItem>
                    <FilterItem title='Position' isClicked={positionClicked} toggleSetter={setPositionClicked} clickFunction={clickFilterButton} options={positionOptions}></FilterItem>

                    <FilterItem title='Status' isClicked={statusClicked} toggleSetter={setStatusClicked} clickFunction={clickFilterButton} options={statusOptions}></FilterItem>

                    <a href='/' className={styles.logoutButton}>Logout</a>
                </div>
                {/* <button className={styles.navigationCloseButton}>X</button> */}
            </div>
        </div>
    )
}

export default Navigation;