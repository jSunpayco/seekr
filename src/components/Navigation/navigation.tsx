import styles from './navigation.module.scss';

import FilterItem from '../FilterItem/filteritem';

import { useState } from 'react';

const Navigation = () => {

    const [categoryClicked, setCategoryClicked] = useState(false)
    const [locationClicked, setLocationClicked] = useState(false)
    const [monthClicked, setMonthClicked] = useState(false)
    const [positionClicked, setPositionClicked] = useState(false)
    const [statusClicked, setStatusClicked] = useState(false)

    return (
        <div className={styles.navigationContainer}>
            <div className={styles.navigationHeader}>
                <h1 className={styles.logo}>SeekR</h1>
                <div className={styles.filtersContainer}>
                    <FilterItem title='Category' isClicked={categoryClicked} clickFunction={setCategoryClicked}></FilterItem>
                    <FilterItem title='Location' isClicked={locationClicked} clickFunction={setLocationClicked}></FilterItem>

                    <FilterItem title='Month' isClicked={monthClicked} clickFunction={setMonthClicked}></FilterItem>
                    <FilterItem title='Position' isClicked={positionClicked} clickFunction={setPositionClicked}></FilterItem>

                    <FilterItem title='Status' isClicked={statusClicked} clickFunction={setStatusClicked}></FilterItem>

                    <a href='/' className={styles.logoutButton}>Logout</a>
                </div>
                {/* <button className={styles.navigationCloseButton}>X</button> */}
            </div>
        </div>
    )
}

export default Navigation;