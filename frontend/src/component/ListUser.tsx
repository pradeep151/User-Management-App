import { useEffect, useState } from "react";
import { User } from "../types/user";
import {
  getUsers,
  updateUser,
  deleteUser,
  createUser,
} from "../services/userService";
import UserForm from "./UserForm";
import DeleteConfirm from "./DeleteUser";
import { Card, CardContent, Button } from "@mui/material";
import "./UserList.css";

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      console.error("Error loading users", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUpdate = (user: User) => {
    setSelectedUser(user);
    setShowUpdateForm(true);
  };

  const handleUpdateSubmit = async (user: User) => {
    try {
      await updateUser(user);
      setShowUpdateForm(false);
      setSelectedUser(null);
      fetchUsers();
    } catch (err) {
      console.error("Error updating user", err);
    }
  };

  const handleDelete = (user: User) => {
    setSelectedUser(user);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (!selectedUser) return;
    try {
      await deleteUser(selectedUser.id);
      setShowDeleteConfirm(false);
      setSelectedUser(null);
      fetchUsers();
    } catch (err) {
      console.error("Error deleting user", err);
    }
  };

  const handleCreateUser = async (user: User) => {
    try {
      await createUser(user);
      setShowCreateForm(false);
      fetchUsers();
    } catch (err) {
      console.error("Error creating user", err);
    }
  };

  return (
    <div className="user-list-container">
      <div className="header">
        <h2>User List</h2>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowCreateForm(true)}
        >
          Add New User
        </Button>
      </div>

      <div className="card-grid">
        {users.map((user) => (
          <Card key={user.id} className="user-card">
            <CardContent>
              <div className="card-title">{user.name || "-"}</div>
              <div className="user-info">
                <span className="label">Email:</span>
                <span className="value">{user.email || "-"}</span>
              </div>
              <div className="user-info">
                <span className="label">Phone:</span>
                <span className="value">{user.phone || "-"}</span>
              </div>
              <div className="user-info">
                <span className="label">DOB:</span>
                <span className="value">
                  {user.dob
                    ? new Date(user.dob).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                    : "-"}
                </span>
              </div>
              <div className="user-info">
                <span className="label">Gender:</span>
                <span className="value">{user.gender || "-"}</span>
              </div>
              <div className="user-info">
                <span className="label">Country:</span>
                <span className="value">{user.country || "-"}</span>
              </div>

              <div className="card-buttons">
                <Button
                  variant="contained"
                  onClick={() => handleUpdate(user)}
                  sx={{
                    backgroundColor: "#81C784", 
                    color: "#FFFFFF",
                    fontWeight: "bold",
                    padding: "5px 10px",
                    boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
                    "&:hover": {
                      backgroundColor: "#66BB6A",
                    },
                  }}
                >
                  Update
                </Button>

                <Button
                  variant="contained"
                  onClick={() => handleDelete(user)}
                  sx={{
                    backgroundColor: "#EF9A9A",
                    color: "#FFFFFF",
                    fontWeight: "bold",
                    padding: "5px 10px",
                    boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
                    "&:hover": {
                      backgroundColor: "#E57373",
                    },
                  }}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {showUpdateForm && selectedUser && (
        <UserForm
          user={selectedUser}
          onSave={handleUpdateSubmit}
          onCancel={() => setShowUpdateForm(false)}
        />
      )}

      {showCreateForm && (
        <UserForm
          onSave={handleCreateUser}
          onCancel={() => setShowCreateForm(false)}
        />
      )}

      {showDeleteConfirm && selectedUser && (
        <DeleteConfirm
          name={selectedUser.name}
          onConfirm={confirmDelete}
          onCancel={() => setShowDeleteConfirm(false)}
        />
      )}
    </div>
  );
};

export default UserList;
