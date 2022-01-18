import T from 'prop-types';
import { useState, useMemo } from "react";
import FormField from "../../common/FormField.js";
import Button from "../../common/Button";

import { login } from "../service";
import { AuthContextConsumer } from "../context";

import "./LoginPage.css";

function LoginPage({ onLogin, history, location }) {
    const [value, setValue] = useState({ email: "", password: "" });
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [checked, setIsChecked] = useState(null);

    const resetError = () => setError(null);

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        // call to api - send value
        setIsLoading(true);
        resetError();
        try {
            await login(checked, value);
            setIsLoading(false);
            onLogin();
            const { from } = location.state || { from: { pathname: "/adverts" } };
            history.replace(from);
        } catch (error) {
            setError(error);
            setIsLoading(false);
        }
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

const ConnectedLoginPage = (props) => (
    <AuthContextConsumer>
        {(auth) => <LoginPage onLogin={auth.handleLogin} {...props} />}
    </AuthContextConsumer>
);

export default ConnectedLoginPage;