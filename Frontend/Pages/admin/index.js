import Layout from '../../Components/Layout';
import Admin from '../../Components/Auth/Admin'
import Link from 'next/link';

const AdminIndex = () => {
    return (
        <Layout>
            <Admin>
                <h2>Admin Dashboard</h2>
            </Admin>
        </Layout>
    );
};  

export default AdminIndex;