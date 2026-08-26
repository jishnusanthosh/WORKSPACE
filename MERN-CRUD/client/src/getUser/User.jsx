import React from "react";
import "./user.css";

const User = () => {
  return (
    <div className="userTable">
      <button type="button" class="btn btn-primary">
        Add User
      </button>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col"> S.No</th>
            <th scope="col"> Name</th>
            <th scope="col"> Email</th>
            <th scope="col"> Address</th>
            <th scope="col"> Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>jishnu</td>
            <td>Jishnuuanthohs321</td>
            <td>vasdakkedathu</td>
            <td>
              <button type="button" class="btn btn-info">
                <i class="fa-solid fa-pen-to-square"></i>
              </button>{" "}
              <button type="button" class="btn btn-danger">
                <i class="fa-solid fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default User;
