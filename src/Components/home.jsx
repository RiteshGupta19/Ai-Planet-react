import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid } from '@mui/material';
import eventData from '../Components/data/events.json'; 
import EventCard from './Card';
import contentData from './data/content.json';
import Filter from './filter';

export default function Home() {
  const [content, setContent] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState(eventData);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    status: {},
    level: {},
  });

  useEffect(() => {
    setContent(contentData);
    let updatedEvents = eventData;

    // Filter by Status
    if (Object.values(filters.status).some(value => value)) {
      updatedEvents = updatedEvents.filter(event =>
        filters.status[event.status] || filters.status.All
      );
    }

    if (Object.values(filters.level).some(value => value)) {
      updatedEvents = updatedEvents.filter(event => filters.level[event.level]);
    }

    if (searchQuery) {
      updatedEvents = updatedEvents.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredEvents(updatedEvents);
  }, [filters, searchQuery]);

  const handleFilterChange = (filterType, filterValues) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterType]: filterValues,
    }));
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className='bg-black px-md-5 h-100'>
      <div className='main w-100'>
        <div className='rocket position-relative'>
          <div className='nav bg-white  py-2 ps-md-5 ps-3 fs-3 position-absolute w-100'>
            Dphi
          </div>
          <div className='row row-cols-1 row-cols-md-2 w-100 '>
            <div className='col-md-7 ps-md-5 ms-md-5 pt-md-5 pe-md-5'>
              <div className='acc ps-md-5 ps-3 text-white'>
                <h1 className='display-5 mb-5 ps-md-5 fw-bold'>
                  Accelerate Innovation<br /> with global AI challenges
                </h1>
                <p className='fs-5 ps-md-4'>
                  AI Challenges at Dphi simulate real-world problems. It is a<br/>
                  great place to put your AI/Data Science skills to test on<br/>
                  diverse datasets allowing you to faster learning through<br/>
                  competitions.
                </p>
                <button type='button' className='btn btn-light mt-4 mb-4 ms-md-5'>
                  <Link to='/challenge' className='text-decoration-none text-black'>
                    Create challenge
                  </Link>
                </button>
              </div>
            </div>
            <div className='col-md-4 d-flex justify-content-center align-items-center '>
              <img src='/assets/robot.svg' alt='Icon' className='img-fluid' />
            </div>
          </div>
        </div>

        <hr className='text-white m-0' />

        <div className='count pb-5 pt-md-4 pt-2'>
          <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 justify-content-center pt-md-5 pt-4 pb-3 px-5'>
            <div className='col d-flex align-items-center  bord ps-4 pb-2'>
              <div>
                <img src='/assets/icons/Group 1000002515.svg' alt='Submissions' className='img-fluid' />
              </div>
              <div className='text-white ms-3'>
                <h3 className='mb-0 pb-0'>100k+</h3>
                <p className='p-0 m-0'>AI model submissions</p>
              </div>
            </div>

            <div className='col d-flex align-items-center bord ps-4  pb-2'>
              <div>
                <img src='/assets/icons/logo1.svg' alt='Scientists' className='img-fluid' />
              </div>
              <div className='text-white ms-3 '>
                <h3 className='mb-0 pb-0'>50k+</h3>
                <p className='p-0 m-0'>Data scientists</p>
              </div>
            </div>

            <div className='col d-flex align-items-center  ps-4  pb-2'>
              <div>
                <img src='/assets/icons/Group 1000002518.svg' alt='Challenges' className='img-fluid' />
              </div>
              <div className='text-white ms-3'>
                <h3 className='mb-0 pb-0'>100+</h3>
                <p className='p-0 m-0'>AI Challenges hosted</p>
              </div>
            </div>
          </div>
        </div>

        <hr className='text-white m-0' />

        <div className='p-md-5 p-3 bg-white'>
          <div className='text-center'>
            <h2 className='fw-bold'>
              Why participate in <span>AI Challenges?</span>
            </h2>
          </div>
          <div className='row row-cols-1 row-cols-md-2 justify-content-center mt-md-5 p-0 m-0'>
            {content.map((item) => (
              <div className='col-12 col-md-5 p-4 m-4 bg-light rounded' key={item.id}>
                <img src={item.icon} alt={`${item.title} Icon`} className='img-fluid' />
                <h3>{item.title}</h3>
                <p className='p-0 m-0'>{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        <hr className='text-white m-0' />

        <div className='count p-5'>
          <div>
            <h3 className='text-white text-center my-4 pb-4'>
              Explore Challenges
            </h3>
          </div>

          <div className='row row-cols-2 justify-content-center p-0'>
          <div className='text-center my-4 col-7'>
            <input
              type='text'
              className='form-control'
              placeholder='Search challenges...'
              value={searchQuery}
              onChange={handleSearchChange} 
            />
          </div>
        
             <Filter onFilterChange={handleFilterChange} />
          </div>
          
          </div>
          
          

        <div className='p-md-5 p-2 rocket m-0 '>
          <Grid container spacing={3} sx={{ padding: 3 }} className='px-md-5 px-4 m-0 1904'>
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))
            ) : (
              <div className='text-center text-white'>No challenges found</div>
            )}
          </Grid>
        </div>
      </div>
    </div>
  );
}
