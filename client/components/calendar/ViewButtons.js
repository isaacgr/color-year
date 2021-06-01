import React from "react";

export default function ViewButtons({ years }) {
  return (
    <div className="view-buttons">
      <div class="dropdown">
        <button
          class="btn primary-btn dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-mdb-toggle="dropdown"
          aria-expanded="false"
        >
          Year
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <li>
            <a class="dropdown-item" href="#">
              2021
            </a>
          </li>
        </ul>
      </div>
      <button className="btn primary-btn">Month</button>
    </div>
  );
}
