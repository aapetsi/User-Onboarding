import React from "react";

const User = ({ users }) => {
  console.log(users);
  if (users.length === 1) {
    return (
      <div>
        <h1>No users</h1>
      </div>
    );
  }
  return (
    <div>
      <h1>View members</h1>
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>email</th>
            <th>date</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default User;
