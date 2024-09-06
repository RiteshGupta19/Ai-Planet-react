import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Grid, Badge } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const EventCard = ({ event }) => {
  const [timeLeft, setTimeLeft] = useState(event.timeLeft);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft?.minutes > 0) {
        setTimeLeft((prevTime) => ({
          ...prevTime,
          minutes: prevTime.minutes - 1,
        }));
      } else if (timeLeft?.hours > 0) {
        setTimeLeft((prevTime) => ({
          ...prevTime,
          hours: prevTime.hours - 1,
          minutes: 59,
        }));
      } else if (timeLeft?.days > 0) {
        setTimeLeft((prevTime) => ({
          ...prevTime,
          days: prevTime.days - 1,
          hours: 23,
          minutes: 59,
        }));
      }
    }, 60000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleParticipateClick = () => {
    navigate(`/participate/${event.id}`);
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={4} className='px-2 mb-5 px-md-4 m-0 '>
      <Card  sx={{ borderRadius: 4, boxShadow: 3, display: 'flex', flexDirection: 'column', height: '100%'  } } >
        <CardMedia component="img" height="150" image={event.image} alt={event.title} />
        <CardContent sx={{ textAlign: 'center', flex: '1 0 auto' }}>
          <Badge
            color={event.status === 'Past' ? 'secondary' : event.status === 'Active' ? 'success' : 'warning'}
            badgeContent={event.status}
            sx={{ mb: 2 }}
          />
          <Typography variant="h6" gutterBottom className=' fw-bold'>
            {event.title}
          </Typography>
          {event.timeLeft ? (
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
              <div className="text-center mx-2">
                <Typography variant="h6" component="span">
                  {timeLeft?.days}
                </Typography><br/>
                <Typography variant="caption">Days</Typography>
              </div>
              <div className="text-center mx-2">
                <Typography variant="h6" component="span">
                  {timeLeft?.hours}
                </Typography><br/>
                <Typography variant="caption">Hours</Typography>
              </div>
              <div className="text-center mx-2">
                <Typography variant="h6" component="span">
                  {timeLeft?.minutes}
                </Typography><br/>
                <Typography variant="caption">Mins</Typography>
              </div>
            </div>
          ) : (
            <div className='my-3'>
              <Typography variant="body2">
                Ended on <br />
                {event.endedOn}
              </Typography>
            </div>
          )}
        </CardContent>
        <div className=' px-5 pb-3'>
          <Button variant="contained" color="success" fullWidth className='rounded' onClick={handleParticipateClick}>
            Participate Now
          </Button>
        </div>
      </Card>
    </Grid>
  );
};

export default EventCard;
