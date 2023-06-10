import React, { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import * as Styled from './styles';
import useSettings from './hooks/useSettings';
import useMapLib from './hooks/useMapLib';

const MapView = (props) => {
  const { MAP_OPTIONS } = useSettings();
  const theme = useTheme();
  const { areas } = props;
  const mapLib = useMapLib();

  useEffect(() => {
    if (!mapLib) return;

    const { Map, Polygon, InfoWindow } = mapLib;
    const map = new Map(document.getElementById('map'), MAP_OPTIONS);

    areas.forEach((area) => {
      const shape = new Polygon({
        paths: area.path,
        strokeColor: area.color,
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: area.color,
        fillOpacity: 0.5,
      });
      shape.addListener('click', (event) => {
        const infoWindow = new InfoWindow();
        const contentString = area.name;
        const container = document.createElement('div');
        container.innerText = contentString;
        container.style.backgroundColor = theme.palette.background.default;
        infoWindow.setContent(container);
        infoWindow.setPosition(event.latLng);
        infoWindow.open(map);
      });
      shape.setMap(map);
    });

    if (areas[0]?.path?.[0]) map.setCenter(areas[0].path[0]);
  }, [MAP_OPTIONS, areas, theme, mapLib]);

  return (
    <Styled.Container>
      <Styled.Map id="map"></Styled.Map>
    </Styled.Container>
  );
};

export default MapView;
