import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApi } from '@config';
import { useAuth } from '@hooks';
import Modal from '@common/modal';
import styles from '@styles/dashboard/admins/index.module.css';

const AdminsPage = () => {
  const [admins, setAdmins] = useState([]);
  const [modalStatus, setModalStatus] = useState(false);
  const { user } = useAuth();
  const { get, deleteFunc } = useApi();

  const getAdmins = async () => {
    try {
      const response = await get('/admins');
      setAdmins(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteAdmin = async (admin_id) => {
    try {
      const response = await deleteFunc(`/admins/:${admin_id}`);
      setAdmins((prev) =>
        prev.filter((admin) => admin.id !== response.data.id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleModalState = () => {
    setModalStatus((prev) => !prev);
  };
  const adminList =
    admins.length > 0 &&
    admins.map((admin) => (
      <tr key={admin.id}>
        <td>{admin.id}</td>
        <td>
          {admin.first_name} {admin.last_name}
        </td>
        <td>{admin.email}</td>
        <td>{admin.role}</td>
        <td className={styles['actions']}>
          <button onClick={() => handleDeleteAdmin(admin.id)}>
            <i className='fa-solid fa-trash-can'></i>
          </button>
          <button>
            <Link exact='true' to={`/dashboard/admins/edit/${admin.id}`}>
              <i className='fa-solid fa-pen-to-square'></i>
            </Link>
          </button>
        </td>
      </tr>
    ));

  useEffect(() => {
    getAdmins();
    return () => setAdmins([]);
  }, []);
  return (
    <div className={styles['dash-authors-page']}>
      <div className={styles['top-bar']}>
        <h3>Admins</h3>
        <button>
          <Link to='/dashboard/admins/create'>+ Add Admin</Link>
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email Address</th>
            <th>Permissions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{adminList && adminList}</tbody>
      </table>
      {modalStatus && (
        <Modal
          onClick={handleModalState}
          children={
            <div className={styles['delete-product-modal']}>
              <h3 className={styles['modal-title']}>Delete</h3>
              <p className={styles['modal-message']}>
                Are you sure, you want to delete?
              </p>
              <div className={styles['modal-actions']}>
                <button
                  className={styles['cancel-button']}
                  onClick={handleModalState}
                >
                  Cancel
                </button>
                <button className={styles['delete-button']}>Delete</button>
              </div>
            </div>
          }
        />
      )}
    </div>
  );
};
export default AdminsPage;
