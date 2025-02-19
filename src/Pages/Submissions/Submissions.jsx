import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Container, Paper, TextField, Typography, Box, Button } from '@mui/material';

const Submissions = () => {
    const [genre, setGenre] = React.useState('');

    const handleChange = (event) => {
      setGenre(event.target.value);
    };

    return (
      <Container maxWidth="md" sx={{ pb: 10 }}>
       <Paper elevation={3} sx={{ p: 4, mt: 4, mb: 4 }}> {/* Added mb for spacing from the container to the footer */}
          <Typography variant="h5" gutterBottom>Welcome to Our Manuscript Submissions!</Typography>
          <Typography variant="body1" paragraph>
            We are thrilled to have the opportunity to review new works from writers like you. Whether you’re a seasoned author or a first-time writer, we are committed to providing a platform for diverse voices and original stories.
          </Typography>
          <Typography variant="body1" paragraph>
            Before submitting your manuscript, please take a moment to review our submission guidelines below. These guidelines are designed to ensure that your manuscript is processed smoothly and aligns with our publication standards.
          </Typography>
          <Typography variant="body1">
            Thank you for considering us as the home for your work. We look forward to reading your manuscript and potentially welcoming you to our community of authors.
          </Typography>

          <Box component="form" noValidate autoComplete="off">
            <TextField
                fullWidth
                margin="normal"
                variant="outlined"
                placeholder="Enter your name"
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <TextField
                fullWidth
                margin="normal"
                variant="outlined"
                placeholder="example@email.com"
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <TextField
                fullWidth
                margin="normal"
                variant="outlined"
                placeholder="Enter your phone number"
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <TextField
                fullWidth
                margin="normal"
                variant="outlined"
                placeholder="Title of your manuscript"
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel id="genre-label">Genre</InputLabel>
              <Select
                  labelId="genre-label"
                  id="genre-select"
                  value={genre}
                  displayEmpty
                  onChange={handleChange}
                  renderValue={
                      genre !== '' ? undefined : () => <span style={{ color: 'gray' }}>Select Genre</span>
                  }
              >
                  <MenuItem value="" disabled style={{ color: 'gray' }}>Select Genre</MenuItem>
                  <MenuItem value="Case Studies">Case Studies</MenuItem>
                  <MenuItem value="Original Research">Original Research</MenuItem>
                  <MenuItem value="Review Articles">Review Articles</MenuItem>
                  <MenuItem value="Rapid Communications">Rapid Communications</MenuItem>
              </Select>
          </FormControl>

            <TextField
                fullWidth
                multiline
                rows={4}
                margin="normal"
                variant="outlined"
                placeholder="Write a brief summary of your manuscript"
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <TextField
              fullWidth
              type="file"
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                accept: ".pdf,.doc,.docx", 
              }}
            />
            <Box display="flex" justifyContent="center" mt={2}>
              <Button type="submit" variant="contained" color="primary">
                Submit Manuscript
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    );
}

export default Submissions;
