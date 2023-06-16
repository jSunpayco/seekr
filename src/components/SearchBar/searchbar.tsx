import styles from './searchbar.module.scss';

interface Props {
    valueFunction:React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar = (props:Props) => {

    const onHandleValueChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setTimeout(() => {
            props.valueFunction(e.target.value)
        }, 300);
    }

    return (
        <div className={styles.searchBarContainer}>
            <h2 className={styles.searchBarLabel}>Search</h2>
            <input className={styles.searchBar} placeholder='Title/Company' onChange={(e)=>onHandleValueChange(e)}></input>
        </div>
    )
}

export default SearchBar;