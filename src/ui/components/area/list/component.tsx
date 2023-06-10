import React from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import AreaCard from '../card/component';
import type { Area } from 'api/types';

type Props = {
  areas: Area[]
}

const AreaList: React.FC<Props> = (props) => {
  const { areas } = props;
  const navigate = useNavigate();

  return (
    <>
      <Typography variant="subtitle1">Áreas</Typography>
      <Grid container spacing={2}>
        {areas.map((area) => {
          return (
            <Grid item>
              <AreaCard
                area={area}
                action={() => {
                  navigate(`area/${area.id}#info`);
                }}
              />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default AreaList;
