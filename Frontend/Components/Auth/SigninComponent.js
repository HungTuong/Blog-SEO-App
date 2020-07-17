import { useState } from 'react';
import { signin, authenticate } from '../../actions/auth';
import Router from 'next/router';
import { Alert} from 'reactstrap';


const SigninComponent = () => {
    const [values, setValues] = useState({
        email: 'hung@gmail.com',
        password: '123456',
        error: '',
        loading: false,
        message: '',
        showForm: true
    });

    const { email, password, error, loading, message, showForm } = values;

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.table({ email, password, error, loading, message, showForm });
        setValues({ ...values, loading: true, error: false });
        const user = {email, password };

        signin(user)
            .then(data => {
                if(data.error){
                    setValues({ ...values, error: data.error, loading: false });
                }else{
                    authenticate(data, () => {
                        Router.push('/');
                    })
                }
            })
    }

    const handleChange = (name) => (e) => {
        setValues({ ...values, error: false, [name]: e.target.value });
    }

    const showLoading = () => (loading ? <Alert color="primary">Loading...</Alert> : '');
    const showError = () => (error ?  <Alert color="danger">{error}</Alert> : '');
    const showMessage = () => (message ? <Alert color="primary">{message}</Alert> : '');

    const signinForm = () => {
        return (
            <form onSubmit={handleSubmit}>
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
                    <button className="btn btn-primary">Signin</button>
                </div>
            </form>
        );
    }

    return (
        <React.Fragment>
            {showError()}
            {showLoading()}
            {showMessage()}
            {showForm && signinForm()}
        </React.Fragment>
    )
}
export default SigninComponent;