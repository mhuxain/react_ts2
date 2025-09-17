import { useEffect, useState } from "react"
import { useLoaderData } from "react-router";
import { requireAuth } from "../lib/auth";
import type { LoaderFunction } from "react-router";

export const clientLoader: LoaderFunction = async () => {
  const user = requireAuth(); // This will redirect to /login if not authenticated
  return { user };
};

const apiUrl = () => 'https://jsonplaceholder.typicode.com/users'

interface User {
    id?: number,
    name: string,
    email: string
}

export default function Users() {
    const { user } = useLoaderData<{ user: any }>();
    const [users, setUsers] = useState<User[]>([])
    const [formData, setFormData] = useState<User>({name: '', email: ''})

     const resetFormData = () => setFormData({name: '', email: ''})

    async function fetchUsers() {
        const resp = await fetch(apiUrl())
        const data = await resp.json()
        setUsers(data)
    }

    function handleFormSubmit(evt) {
        evt.preventDefault()
        if(formData.id) {
            updateUser()
        } else {
            saveUser()
        }

    }

    async function saveUser() {
        const resp = await fetch(`${apiUrl()}`, {
            method: 'POST',
            body: JSON.stringify(formData)
        })
        const respData = await resp.json()
        console.log(respData)
        formData.id = users.length + 1
        if(resp.ok) {
            setUsers([...users, formData])    
        }
        resetFormData()
    }

    function startEdit(user) {
        setFormData({id: user.id, name: user.name, email: user.email})
    }

    async function updateUser() {
        const resp = await fetch(`${apiUrl()}/${formData.id}`, {
            method: 'PUT',
            body: JSON.stringify(formData)
        })
        const respData = await resp.json()
        if(resp.ok) {
            setUsers(users.map(user => user.id == formData.id ? formData : user))    
        }
    }

    async function deleteUser(id) {
        const resp = await fetch(`${apiUrl()}/${id}`, {
            method: 'DELETE',
        })
        if(resp.ok) {
            setUsers(users.filter(user => user.id != id))    
        }
    }

    

    useEffect(() => {
        fetchUsers()
    }, [])

    return (
    <div className="page-container">
        <div className="page-header">
            <h1>Users Page</h1>
            <p>Welcome, {user.name}!</p>
        </div>
        <div className="form-container">
            <h2>Add / Edit User</h2>
            <form onSubmit={handleFormSubmit}>
                <div className="form-field">
                    <label>Name:</label>
                    <input 
                        type="text" 
                        name="name" 
                        value={formData.name}
                        onChange={evt => setFormData({...formData, name: evt.target.value})}
                    />
                </div>
                <div className="form-field">
                    <label>Email:</label>
                    <input 
                        type="text" 
                        name="name"
                        value={formData.email}
                        onChange={evt => setFormData({...formData, email: evt.target.value})}
                    />
                </div>
                <div className="button-group">
                    <button
                        type="submit"
                        className="btn-primary"
                    >Save</button>
                </div>
            </form>
            {JSON.stringify(formData)}
        </div>
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id ?? user.email}>
                            <th>{user.id}</th>
                            <th>{user.name}</th>
                            <th>{user.email}</th>
                            <th>
                                <button
                                    onClick={() => startEdit(user)}
                                >Edit</button>
                                <button
                                    onClick={() => deleteUser(user.id)}
                                >Delete</button>
                            </th>
                        </tr>
                    ))

                    }
                    
                </tbody>
            </table>
        </div>

    </div>
    )
}
