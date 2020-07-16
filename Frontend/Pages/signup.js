import Layout from '../components/Layout';
import SignupComponent from '../Components/Auth/SignupComponent';
import Link from 'next/link';

const Signup = () => {
    return (
        <Layout>
            <h2>Sign up page</h2>
            <SignupComponent/>
        </Layout>
    );
};

export default Signup;