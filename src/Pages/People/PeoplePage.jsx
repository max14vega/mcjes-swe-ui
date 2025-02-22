import React from 'react';
import { Grid2, Card, CardContent, Typography, Avatar } from '@mui/material';

const people = [
  { id: 1, name: 'John Doe', icon: 'https://via.placeholder.com/50' },
  { id: 2, name: 'Jane Doe', icon: 'https://via.placeholder.com/50' },
  { id: 3, name: 'Bob Smith', icon: 'https://via.placeholder.com/50' },
  // Add more people here...
];

const PeoplePage = () => {
  return (
    <Grid2 container spacing={2}>
      {people.map((person) => (
        <Grid2 item key={person.id} xs={12} sm={6} md={4} lg={3}>
          <Card>
            <CardContent>
              <Avatar src={person.icon} />
              <Typography variant="h6" component="div">
                {person.name}
              </Typography>
            </CardContent>
          </Card>
        </Grid2>
      ))}
    </Grid2>
  );
};

export default PeoplePage;