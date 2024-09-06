import React, { useState } from 'react';

const Filter = ({ onFilterChange, onSearchChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); 
  const [filter, setFilter] = useState(false);
  const [searchText, setSearchText] = useState('');  // Added for search

  const [status, setStatus] = useState({
    All: false,
    Active: false,
    Upcoming: false,
    Past: false,
  });

  const [level, setLevel] = useState({
    Easy: false,
    Medium: false,
    Hard: false,
  });

  const selectedFilters = [
    ...Object.entries(status).filter(([key, value]) => value).map(([key]) => key),
    ...Object.entries(level).filter(([key, value]) => value).map(([key]) => key)
  ];

  const handleStatusChange = (e) => {
    const updatedStatus = {
      ...status,
      [e.target.name]: e.target.checked,
    };
    setStatus(updatedStatus);
    onFilterChange('status', updatedStatus);
  };

  const handleLevelChange = (e) => {
    const updatedLevel = {
      ...level,
      [e.target.name]: e.target.checked,
    };
    setLevel(updatedLevel);
    onFilterChange('level', updatedLevel);
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    onSearchChange(e.target.value);  // Passing search text to parent
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClick = () => {
    setFilter(!filter);
  };

  const handleRemoveFilter = (filterType, filterName) => {
    if (filterType === 'status') {
      const updatedStatus = {
        ...status,
        [filterName]: false,
      };
      setStatus(updatedStatus);
      onFilterChange('status', updatedStatus);
    } else if (filterType === 'level') {
      const updatedLevel = {
        ...level,
        [filterName]: false,
      };
      setLevel(updatedLevel);
      onFilterChange('level', updatedLevel);
    }
  };

  return (
    <>
      <div className={`${filter ? "col-2" : "col-1"} mt-4 position-relative`}>
        <div className="filter-dropdown text-black bg-white pt-2  ps-2 rounded position-absolute w-100">
          <div className="dropdown-header" onClick={toggleDropdown} style={{ cursor: 'pointer', userSelect: 'none' }}>
            <h5 onClick={handleClick}>Filter <span>{isDropdownOpen ? '▲' : '▼'}</span></h5>
          </div>

          {isDropdownOpen && (
            <div className="dropdown-body">
              <hr />
              <div className='filter-section'>
                <h6>Status</h6>
                {['All', 'Active', 'Upcoming', 'Past'].map((item) => (
                  <div key={item}>
                    <input
                      type="checkbox"
                      name={item}
                      checked={status[item]}
                      onChange={handleStatusChange}
                    />
                    <label>{item}</label>
                  </div>
                ))}
              </div>
              <hr />
              <div className='filter-section pb-2'>
                <h6>Level</h6>
                {['Easy', 'Medium', 'Hard'].map((item) => (
                  <div key={item}>
                    <input
                      type="checkbox"
                      name={item}
                      checked={level[item]}
                      onChange={handleLevelChange}
                    />
                    <label>{item}</label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="selected-filters ">
      {selectedFilters.map((filter) => (
        <div key={filter} className="filter-tag">
          <span>{filter}</span>
          <button
            onClick={() =>
              handleRemoveFilter(
                ['All', 'Active', 'Upcoming', 'Past'].includes(filter) ? 'status' : 'level',
                filter
              )
            }
          >
            ✕
          </button>
        </div>
      ))}
    </div>
    </>

  );
};

export default Filter;
