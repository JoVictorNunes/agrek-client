import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { CardActionArea } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import type { Area } from 'api/types';

type Props = {
  area: Area;
  action?: () => void;
};

const AreaCard: React.FC<Props> = (props) => {
  const { area, action } = props;
  const theme = useTheme();

  const content = (
    <>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
            <LocationOnIcon />
          </Avatar>
        }
        title={area.name}
        subheader={`${area.area} ha`}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {`Latitude: ${area.path[0].lat}`}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {`Longitude: ${area.path[0].lng}`}
        </Typography>
      </CardContent>
    </>
  );

  return (
    <Card>
      {action ? (
        <CardActionArea onClick={action}>{content}</CardActionArea>
      ) : (
        content
      )}
    </Card>
  );
};

export default AreaCard;
