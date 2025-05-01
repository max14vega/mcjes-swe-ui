import React, { useState } from 'react';
import { Tabs, Tab } from '@mui/material';
import PeopleTab from '../../Components/AdminTabs/PeopleTab';
import ManuscriptsTab from '../../Components/AdminTabs/ManuscriptsTab';
//import SearchBar from '../../Components/SearchBar';

import {
  Container,
  Grid2,
} from '@mui/material';

const AdminPage = () => {
    const [value, setValue] = useState(0);
  
    const handleTabChange = (event, tab) => {
      setValue(tab);
    };
  
    return (
      <Container>
        <Grid2
          container
          xs={12}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: 4,
          }}
        >
          <Grid2 item="true" direction={'row'}>
            <Tabs value={value} onChange={handleTabChange}>
              <Tab label="People" />
              <Tab label="Manuscripts" />
            </Tabs>
          </Grid2>
        </Grid2>
        <hr />
        {value === 0 && <PeopleTab />}
        {value === 1 && <ManuscriptsTab />}
      </Container>
    );
  };

  export default AdminPage;