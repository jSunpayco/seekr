import styles from './login.module.scss';

const Login = () => {

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginContentsContainer}>
                <h1 className={styles.loginTitle}>Welcome to SeekR</h1>
                <div className={styles.loginFormContainer}></div>
            </div>
        </div>
    )
}

export default Login;