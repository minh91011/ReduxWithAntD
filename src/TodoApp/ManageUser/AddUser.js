import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../../redux/User/action'
import UserList from './UserList';
import axios from 'axios';
import { toast } from 'react-toastify';
import FilterUser from './FilterUser';

const AddUser = () => {
    const dispatch = useDispatch();

    // State để quản lý thông tin user
    const [userInfor, setUserInfor] = useState({
        name: '',
        email: '',
        phone: ''
    }); 
    
    const handleAddUser = async () => {
        if (userInfor.name.trim() !== '' && userInfor.email.trim() !== '' && userInfor.phone.trim() !== '') {
            const newUser = {
                name: userInfor.name,
                email: userInfor.email,
                phone: userInfor.phone
            };

            try {
                const response = await axios.post('http://localhost:5000/users', newUser);
                dispatch(addUser(response.data));
                setUserInfor({ name: '', email: '', phone: '' }); // Reset form
                toast.success('Add success!')
            } catch (error) {
                console.log("Error add user", error);
                toast.error('Add fail, try again!')
            }
        } else {
            toast.error('Full fill information!')
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6 col-sm-8">
                    <div className="form-container p-4">
                        <input
                            type="text"
                            className="form-control mb-3"
                            placeholder="Name"
                            value={userInfor.name}
                            onChange={(e) => setUserInfor({ ...userInfor, name: e.target.value })}
                        />
                        <input
                            type="email"
                            className="form-control mb-3"
                            placeholder="Email"
                            value={userInfor.email}
                            onChange={(e) => setUserInfor({ ...userInfor, email: e.target.value })}
                        />
                        <textarea
                            className="form-control mb-3"
                            placeholder="Phone"
                            value={userInfor.phone}
                            onChange={(e) => setUserInfor({ ...userInfor, phone: e.target.value })}
                        />
                        <button className="btn btn-primary w-100" onClick={handleAddUser}>Add User</button>
                    </div>
                </div>
            </div>
            <FilterUser></FilterUser>
            <UserList/>
        </div>
    )
}

export default AddUser;
