import { connect } from 'react-redux';
import T from 'prop-types';
import { useState, useMemo } from "react";
import FormField from "../../common/FormField.js";
import Button from "../../common/Button";

import { authLogin, uiResetError } from '../../../store/action'
import { getUi } from '../../../store/selectors';

import "./LoginPage.css";

function LoginPage({ onLogin, resetError, isLoading, error }) {
    const [value, setValue] = useState({ email: "", password: "" });
    const [checked, setIsChecked] = useState(null);

    const handleChange = (event) => {
        setValue((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }));
    };

    const handleCheck = (event) => {
        console.log(event.target.checked)
        setIsChecked(event.target.checked)
    }

    const handleSubmit = async event => {
        event.preventDefault();
        await onLogin(checked, value).then(() => {
        });
    };

    const buttonDisabled = useMemo(
        () => isLoading || !value.email || !value.password,
        [isLoading, value.email, value.password]
    );

    return (
        <div className="loginPage">
            <h1 className="loginPage-title">Log in to NodePop</h1>
            <form className="loginForm" onSubmit={handleSubmit}>
                <FormField
                    type="text"
                    name="email"
                    label="Email"
                    className="loginForm-field"
                    value={value.email}
                    onChange={handleChange}
                    autofocus
                />
                <FormField
                    type="password"
                    name="password"
                    label="password"
                    className="loginForm-field"
                    value={value.password}
                    onChange={handleChange}
                />
                <Button
                    className="loginForm-submit"
                    type="submit"
                    variant="primary"
                    disabled={buttonDisabled}
                >
                    Log in
                </Button>
                <br></br>
                <label>
                    <input type="checkbox" id="cbox1" onChange={handleCheck} />
                    Quieres mantener la sesión iniciada?
                </label>
            </form>
            {error && (
                <div onClick={resetError} className="loginPage-error">
                    {error.message}
                </div>
            )}
        </div>
    );
}

LoginPage.propTypes = {
    onLogin: T.func.isRequired,
};

// const ConnectedLoginPage = (props) => (
//     <AuthContextConsumer>
//         {(auth) => <LoginPage onLogin={auth.handleLogin} {...props} />}
//     </AuthContextConsumer>
// );

const mapStateToProps = state => {
    return getUi(state);
};

const mapDispatchToProps = {
    onLogin: authLogin,
    resetError: uiResetError,
};

const ConnectedLoginPage = connect(
    mapStateToProps,
    mapDispatchToProps,
)(LoginPage);

export default ConnectedLoginPage;