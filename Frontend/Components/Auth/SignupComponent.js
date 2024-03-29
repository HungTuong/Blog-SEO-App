import { useState, useEffect } from 'react';
import { signup, isAuth } from '../../Actions/Auth';
import { Alert} from 'reactstrap';
import Router from 'next/router';


const SignupComponent = () => {
    const [values, setValues] = useState({
        name: 'Hung',
        email: 'hung@gmail.com',
        password: '123456',
        error: '',
        loading: false,
        message: '',
        showForm: true
    });

    const { name, email, password, error, loading, message, showForm } = values;

    useEffect(() => {
        isAuth() && Router.push('/');
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.table({ name, email, password, error, loading, message, showForm });
        setValues({ ...values, loading: true, error: false });
        const user = { name, email, password };

        signup(user)
            .then(data => {
                if(data.error){
                    setValues({ ...values, error: data.error, loading: false });
                }else{
                    setValues({
                        ...values,
                        name: '',
                        email: '',
                        password: '',
                        error: '',
                        loading: false,
                        message: data.message,
                        showForm: false
                    });
                }
            })
    }

    const handleChange = (name) => (e) => {
        setValues({ ...values, error: false, [name]: e.target.value });
    }

    const showLoading = () => (loading ? <Alert color="primary">Loading...</Alert> : '');
    const showError = () => (error ?  <Alert color="danger">{error}</Alert> : '');
    const showMessage = () => (message ? <Alert color="primary">{message}</Alert> : '');

    const signupForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        value={name}
                        onChange={handleChange('name')}
                        type="text"
                        className="form-control"
                        placeholder="Type your name"
                    />
                </div>

                <div className="form-group">
                    <input
                        value={email}
                        onChange={handleChange('email')}
                        type="email"
                        className="form-control"
                        placeholder="Type your email"
                    />
                </div>

                <div className="form-group">
                    <input
                        value={password}    
                        onChange={handleChange('password')}
                        type="password"
                        className="form-control"
                        placeholder="Type your password"
                    />
                </div>

                <div>
                    <button className="btn btn-primary">Signup</button>
                </div>
            </form>
        );
    }

    return (
        <React.Fragment>
            {showError()}
            {showLoading()}
            {showMessage()}
            {showForm && signupForm()}
        </React.Fragment>
    )
}
export default SignupComponent;