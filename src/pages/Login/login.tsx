import styles from './login.module.scss';

import FullFormField from '../../components/FullFormField/fullformfield';
import FormButton from '../../components/FormButton/formbutton';

const Login = () => {

    const loginStyle = {
        marginTop:'40px',
        marginLeft:'auto',
        marginRight:'auto'
    }

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginContentsContainer}>
                <h1 className={styles.loginTitle}>Welcome to SeekR</h1>
                <div className={styles.loginFormContainer}>
                    <FullFormField title="email" type="email"></FullFormField>
                    <FullFormField title="password" type="password"></FullFormField>
                    <a href='/jobs'><FormButton title='Login' position={loginStyle}></FormButton></a>
                </div>
            </div>
        </div>
    )
}

export default Login;