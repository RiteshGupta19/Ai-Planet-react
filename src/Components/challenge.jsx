import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Challenge = () => {
  const [formData, setFormData] = useState({
    challengeName: '',
    startDate: '',
    endDate: '',
    description: '',
    image: null,
    levelType: 'Easy',
  });

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
    const storedChallenges = JSON.parse(localStorage.getItem('challenges')) || [];
    localStorage.setItem('challenges', JSON.stringify([...storedChallenges, formData]));
    setFormData({
      challengeName: '',
      startDate: '',
      endDate: '',
      description: '',
      image: null,
      levelType: 'Easy',
    });
  };

  return (
    <div className='bg-black h-100'>
      <div className="container bg-white w-100 p-0">
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
              <Form.Group className="mb-3 w-50" controlId="formStartDate">
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                />
              </Form.Group>
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

            <Button variant="success" type="submit" className='my-5'>
              <Link to="/" className=' text-decoration-none text-white'>Create Challenge</Link>
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Challenge;
