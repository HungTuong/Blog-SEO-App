import Layout from '../../Components/Layout';
import Private from '../../Components/Auth/Private'
import Link from 'next/link';

const UserIndex = () => {
    return (
        <Layout>
            <Private>
                <h2>User Dashboard</h2>
            </Private>
        </Layout>
    );
};

export default UserIndex;