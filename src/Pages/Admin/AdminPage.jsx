import React, { useState } from 'react';
import { Tabs, Tab } from '@mui/material';
import PeopleTab from '../../Components/AdminTabs/PeopleTab';
import ManuscriptsTab from '../../Components/AdminTabs/ManuscriptsTab';
import TextsTab from '../../Components/AdminTabs/TextsTab';
//import SearchBar from '../../Components/SearchBar';

import {
  Container,
  Grid2,
} from '@mui/material';

const AdminPage = ({ user }) => {
  const [value, setValue] = useState(0);
  const isDeveloper = user?.roles?.includes('DE');

  const tabs = isDeveloper
    ? ['People', 'Manuscripts', 'Texts']
    : ['Manuscripts', 'Texts'];

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container>
      <Grid2 container xs={12} sx={{ display: 'flex', justifyContent: 'space-between', paddingTop: 4 }}>
        <Grid2 item>
          <Tabs value={value} onChange={handleTabChange}>
            {tabs.map((label) => (
              <Tab key={label} label={label} />
            ))}
          </Tabs>
        </Grid2>
      </Grid2>
      <hr />
      {tabs[value] === 'People' && <PeopleTab />}
      {tabs[value] === 'Manuscripts' && <ManuscriptsTab user={user} />}
      {tabs[value] === 'Texts' && <TextsTab />}
    </Container>
  );
};

  export default AdminPage;