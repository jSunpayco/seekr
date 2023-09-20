import styles from './login.module.scss';

import FullFormField from '../../components/FullFormField/fullformfield';
import FormButton from '../../components/FormButton/formbutton';

const Login = () => {

    const loginStyle = {
        marginTop:'40px',
        marginLeft:'auto',
        marginRight:'auto'
    }

    const loginFunction = () =>{
        window.location.href= '/jobs';
    }

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginContentsContainer}>
                <h1 className={styles.loginTitle}>Welcome to SeekR</h1>
                <div className={styles.loginFormContainer}>
                    <FullFormField title="email" type="email"></FullFormField>
                    <FullFormField title="password" type="password"></FullFormField>
                    <div className={styles.othersContainer}>
                        <a href='/register' className={styles.othersAnchor}>Register Here</a>
                        <a className={styles.othersAnchor}>Forgot your password?</a>
                    </div>
                    <a><FormButton clickFunction={loginFunction} title='Login' position={loginStyle}></FormButton></a>
                </div>
            </div>
        </div>
    )
}

export default Login;