import React from "react";

const NavBar = ({ setGame }) => {
  return (
    <div className="nav">
      <ul className="nav-list">
        <li>
          <strong
            onClick={setGame}
            data-id="6c974274-4bfc-4af8-a9c4-8b926637ba74"
          >
            OKC vs MIA
          </strong>
        </li>
        <li>
          <strong
            onClick={setGame}
            data-id="eed38457-db28-4658-ae4f-4d4d38e9e212"
          >
            SEA vs LAA
          </strong>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
