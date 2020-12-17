import React from "react";

const ViewUser = (props) => {
  const { selectUser } = props;
  return (
    <React.Fragment>
      {selectUser && (
        <ul className="w3-ul w3-border">
          <li>
            <h2>{selectUser.firstName}</h2>
          </li>
          <li>{selectUser.lastName}</li>
          <li>{selectUser.email}</li>
          <li>{selectUser.phone}</li>
        </ul>
      )}
    </React.Fragment>
  );
};
export default ViewUser;
