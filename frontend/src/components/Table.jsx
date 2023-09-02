import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";


import { useDeleteUserMutation } from "../slices/adminSlices/adminsApiSlice";

import { toast } from "react-toastify";
import axios from 'axios'


const TableComponent = () => {

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [deleted, setDeleted] = useState(false)
  
    const [deleteUser] = useDeleteUserMutation();

    const handleSearch = (e)=>{
        setSearch(e.target.value)
    }

    const deleteHandler = async (id)=>{
      try {
        const deleteSuccess = await deleteUser({id});
        toast.success('Deleted Successfully')
        setDeleted(!deleted)
      } catch (error) {
        toast.error(err?.data?.message || err.error)
      }
    }

    const editHandler = async (id) => {
      try {
        // Implement the logic for handling the edit action here
        // You can navigate to an edit page, open a modal, or perform any other action you need.
    
        // For example, if you want to navigate to an edit page, you can use React Router:
        history.push(`/edit/${id}`);
      } catch (error) {
        // Handle any potential errors here
        console.error(error.message);
        toast.error(error?.response?.data?.message || error.message);
      }
    };




    useEffect(() => {
      const fetchUsers = async ()=>{
        const userDetails = await axios.get('http://localhost:3000/api/admin/adminHome')
        console.log(userDetails.data.userData)
        setUsers(userDetails.data.userData);
      }
      fetchUsers();
    },[deleted])

    const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Form>
        <Form.Group className="d-flex my-3" controlId="exampleForm.ControlInput1">
          <Form.Control
            style={{ width: "500px" }}
            value={search}
            type="text"
            placeholder="Search Here"
            onChange={handleSearch}
          />
        </Form.Group>
      </Form>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Option</th>
          </tr>
        </thead>
        <tbody>
          {
            filteredUsers.length !== 0 ?(
          filteredUsers.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td style={{cursor:'pointer'}} onClick={()=>{deleteHandler(user._id)}}><FaRegTrashAlt/></td>
              <td style={{ cursor: 'pointer' }} onClick={() => editHandler(user._id)}><FaEdit /></td>
            </tr>
          ))):(
            <tr>
                <td colSpan={4} className="text-center">No users Available</td>
            </tr>
          )
          }
        </tbody>
      </Table>
    </>
  );
};

export default TableComponent;