import styles from './searchbar.module.scss';

interface Props {
    jobId?:number;
}

const SearchBar = (props:Props) => {

    return (
        <div className={styles.searchBarContainer}>
            <h2 className={styles.searchBarLabel}>Search</h2>
            <input className={styles.searchBar} placeholder='Title/Company'></input>
        </div>
    )
}

export default SearchBar;