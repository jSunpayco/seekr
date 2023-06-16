import styles from './register.module.scss';

import FullFormField from '../../components/FullFormField/fullformfield';
import FormButton from '../../components/FormButton/formbutton';

const Register = () => {

    const loginStyle = {
        marginTop:'40px',
        marginLeft:'auto',
        marginRight:'auto'
    }

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginContentsContainer}>
                <h1 className={styles.loginTitle}>Register a SeekR Account</h1>
                <div className={styles.loginFormContainer}>
                    <FullFormField title="email" type="email"></FullFormField>
                    <FullFormField title="password" type="password"></FullFormField>
                    <div className={styles.othersContainer}>
                        <a href='/' className={styles.othersAnchor}>Have an account?</a>
                        {/* <a className={styles.othersAnchor}>Forgot your password?</a> */}
                    </div>
                    <a href='/jobs'><FormButton title='Register' position={loginStyle}></FormButton></a>
                </div>
            </div>
        </div>
    )
}

export default Register;