import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import eventData from './data/events.json'; 

const Edit = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    challengeName: '',
    startDate: '',
    endDate: '',
    description: '',
    image: null,
    levelType: 'Easy',
  });

  useEffect(() => {
    
    const event = eventData.find((e) => e.id === parseInt(id));
    if (event) {
      setFormData({
        challengeName: event.title,
        startDate: event.startDate,
        endDate: event.endDate,
        description: event.description,
        image: event.image, 
        levelType: event.level,
      });
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); 
  };

  return (
    <div className='bg-black h-100'>
      <div className="container bg-white w-100">
        <div className='nav bg-white py-2 fs-3 w-100 ps-5'>Dphi</div>
        <h2 className="mb-4 bg-light py-4 ps-5">Challenge Details</h2>
        <div className='ps-5'>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3 w-50" controlId="formChallengeName">
              <Form.Label>Challenge Name</Form.Label>
              <Form.Control
                type="text"
                name="challengeName"
                value={formData.challengeName}
                onChange={handleInputChange}
                placeholder="Enter challenge name"
              />
            </Form.Group>

            <div className='p-0'>
              <div>
                <Form.Group className="mb-3 w-50" controlId="formStartDate">
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </div>
              <div>
                <Form.Group className="mb-3 w-50" controlId="formEndDate">
                  <Form.Label>End Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </div>
            </div>

            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                rows={5}
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter description"
                className='w-50'
              />
            </Form.Group>

            <Form.Group className="mb-3 w-25" controlId="formImage">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" name="image" onChange={handleFileChange} />
              {/* Optionally display the selected image */}
              {formData.image && typeof formData.image === 'string' && (
                <img src={formData.image} alt="Event" style={{ width: '100px', height: '100px' }} />
              )}
            </Form.Group>

            <Form.Group className="mb-3 w-25" controlId="formLevelType">
              <Form.Label>Level Type</Form.Label>
              <Form.Select
                name="levelType"
                value={formData.levelType}
                onChange={handleInputChange}
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </Form.Select>
            </Form.Group>

            <Button variant="success" type="submit" className='my-5 ps-2 '>
             <Link to="/" className='text-decoration-none text-white'> Save Changes</Link>
            </Button>
            <Button variant="danger"  className='my-5 ms-5'>
            <Link to="/" className='text-decoration-none text-white'>Cancel</Link>
            </Button>
            
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Edit;
