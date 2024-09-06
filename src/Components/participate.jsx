import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import eventData from './data/events.json'; 
import { useNavigate } from 'react-router-dom';


const Participate = () => {
  const navigate = useNavigate();

  const { id } = useParams(); // Get the event ID from URL parameters
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const event = eventData.find((e) => e.id === parseInt(id)); // Find the event by ID
    setSelectedEvent(event);
  }, [id]);

  if (!selectedEvent) {
    return <div className="text-center text-white">Event not found</div>;
  }

  const handleDeleteClick = () => {
    
    navigate('/');
  };

  return (
    <div className="bg-black px-md-5 h-100">
      <div className="bg-white ">
        <div className="ps-5">
          <div className="nav py-2 ms-5 fs-3">Dphi</div>
        </div>

        <div className="rocket text-white p-5">
          <div className="text-white ms-5 ps-5 mt-5">
            <small className="bg-warning rounded py-1 px-4 fw-bold">
              <i className="bi bi-clock-fill"></i> Starts on 17th Jun'22 09:00 PM (India Standard Time)
            </small>
          </div>
          <h1 className="font-weight-bold my-4 ms-5 ps-5">{selectedEvent.title}</h1>
          <p className="lead ms-5 ps-5">Event description for {selectedEvent.title}</p>
          <div className="ms-5 ps-5 mt-4">
            <span size="lg" className="mb-3 fs-3 bg-white text-black rounded py-1 px-2">
              {selectedEvent.level}
            </span>
          </div>
        </div>

        <div className="border border-3 bg-white d-flex justify-content-between pe-5">
          <div className="ms-5 ps-5">
            <button className="button ms-5 bg-white fs-3 fw-bold py-3">Overview</button>
          </div>
          <div className="py-3 mt-2">
            <button className="btn btn-success">
              <Link to={`/edit/${selectedEvent.id}`} className="text-decoration-none text-white">EDIT</Link>
            </button>
            <button className="btn btn-outline-danger mx-4" onClick={handleDeleteClick}>
              DELETE
            </button>
          </div>
        </div>

        <div className="bg-white p-5 row m-0 p-0">
          <div className="col-9 fs-5 ps-5 ms-4">
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias deleniti, minus minima aliquid provident nam obcaecati excepturi sunt iure. Ratione necessitatibus commodi nisi aspernatur porro! At libero illum quo incidunt rem, praesentium ab animi fuga ipsa qui assumenda voluptatem neque ut necessitatibus, dolores iusto quam dolorem nemo sint tempora quod debitis! Esse nemo vero nesciunt. Officia eaque neque commodi aliquid architecto assumenda, mollitia voluptate, adipisci fugit nemo, debitis quae repudiandae voluptatem. Nulla soluta odit sapiente, ipsum ducimus inventore veniam labore expedita cum ipsa officiis ipsam voluptate alias minus animi. Pariatur, tempora quibusdam. Eius quam, possimus eaque recusandae debitis eos tempore.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Participate;
