import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ShapeLineIcon from '@mui/icons-material/ShapeLine';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import * as Styled from './styles';
import { useTheme } from '@mui/material/styles';
import useSettings from './hooks/useSettings';
import useMapLib from './hooks/useMapLib';
import useDrawingLib from './hooks/useDrawingLib';
import useGeometryLib from './hooks/useGeometryLib';
import { Box, Skeleton } from '@mui/material';

const POLYGON_COMPLETE_EVENT = 'polygoncomplete';
const COLOR_LIST = ['#FF595E', '#FFCA3A', '#8AC926', '#1982C4', '#6A4C93'];

const Map = (props) => {
  const { MAP_OPTIONS, DRAWING_MANAGER_OPTIONS } = useSettings();
  const [currentDrawing, setCurrentDrawing] = useState(null);
  const [drawingForAreaIndex, setDrawingForAreaIndex] = useState(null);
  const [drawingMngr, setDrawingMngr] = useState(null);
  const [map, setMap] = useState(null);
  const [anchors, setAnchors] = useState([]);
  const [areas, setAreas] = useState([
    {
      name: '',
      area: 0,
      path: null,
      drawing: null,
      shape: null,
    },
  ]);
  const navigate = useNavigate();
  const theme = useTheme();
  const mapLib = useMapLib();
  const drawingLib = useDrawingLib();
  const geometryLib = useGeometryLib();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!mapLib || !drawingLib) return;

    const { Map } = mapLib;
    const { DrawingManager } = drawingLib;
    const newMap = new Map(document.getElementById('map'), MAP_OPTIONS);
    const newDrawingManager = new DrawingManager(DRAWING_MANAGER_OPTIONS);
    newMap.addListener('tilesloaded', () => {
      setLoading(false);
    });
    setMap(newMap);
    setDrawingMngr(newDrawingManager);
  }, [MAP_OPTIONS, DRAWING_MANAGER_OPTIONS, mapLib, drawingLib]);

  useEffect(() => {
    areas.forEach((area) => {
      if (area.shape && !area.shape.getMap()) {
        area.shape.setMap(map);
      }
    });
  }, [areas, map]);

  const handleAreaNameChange = (event, index) => {
    areas[index] = {
      ...areas[index],
      name: event.target.value,
    };
    setAreas([...areas]);
  };

  const handleAreaChange = (event, index) => {
    areas[index] = {
      ...areas[index],
      area: event.target.value,
    };
    setAreas([...areas]);
  };

  const startDrawing = (index) => {
    if (drawingMngr && map) {
      const listener = window.google.maps.event.addListener(
        drawingMngr,
        POLYGON_COMPLETE_EVENT,
        (polygon) => {
          setCurrentDrawing(polygon);
          window.google.maps.event.removeListener(listener);
          drawingMngr.setMap(null);
        }
      );
      setDrawingForAreaIndex(index);
      drawingMngr.setMap(map);
    }
  };

  return (
    <Styled.Container>
      <Styled.Map id="map" loading={loading}></Styled.Map>
      {drawingForAreaIndex === null && !loading && (
        <Styled.AreaInfo background={theme.palette.background.default}>
          <Styled.AreaInput>
            {areas.map((area, index) => {
              return (
                <Styled.AreaItem>
                  <TextField
                    required
                    helperText="Nome da área"
                    label="Nome"
                    size="small"
                    variant="standard"
                    onChange={(e) => handleAreaNameChange(e, index)}
                    value={area.name}
                  />
                  <TextField
                    helperText="ha"
                    label="Área"
                    size="small"
                    type="number"
                    variant="standard"
                    onChange={(e) => handleAreaChange(e, index)}
                    value={area.area}
                    required
                  />
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();

                      startDrawing(index);
                    }}
                    startIcon={<ShapeLineIcon />}
                  >
                    Desenhe a área
                  </Button>
                  <IconButton
                    onClick={(e) => {
                      anchors[index] = e.target;
                      setAnchors([...anchors]);
                    }}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchors[index]}
                    open={Boolean(anchors[index])}
                    onClose={() => {
                      anchors[index] = null;
                      setAnchors([...anchors]);
                    }}
                  >
                    <MenuItem
                      onClick={() => {
                        areas[index] = null;
                        setAreas([...areas.filter((area) => area)]);

                        anchors[index] = null;
                        setAnchors([...anchors]);
                      }}
                    >
                      Excluir
                    </MenuItem>
                  </Menu>
                </Styled.AreaItem>
              );
            })}
            <Button
              onClick={() => {
                setAreas([
                  ...areas,
                  {
                    name: '',
                    area: 0,
                    path: null,
                    drawing: null,
                    shape: null,
                  },
                ]);
              }}
            >
              Adicionar área
            </Button>
          </Styled.AreaInput>

          <Styled.BottomBar>
            <Button
              onClick={() => {
                navigate('#info');
              }}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                const areasToUpload = areas.filter((area) => {
                  return area.name !== '' && area.area > 0 && area.path;
                });

                areasToUpload.forEach((area) => {
                  const totalArea = Number(area.area);

                  if (isNaN(totalArea)) return;

                  const body = {
                    area: totalArea,
                    name: area.name,
                    path: area.path,
                    color: area.color,
                  };

                  fetch(
                    `${process.env.REACT_APP_SERVER}/areas/${props.customer.id}`,
                    {
                      body: JSON.stringify(body),
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem(
                          'token'
                        )}`,
                      },
                    }
                  ).then((response) => {
                    if (response.status === 201) {
                      navigate(`/customer/${props.customer.id}#areas`);
                    }
                  });
                });
              }}
            >
              Salvar áreas
            </Button>
          </Styled.BottomBar>
        </Styled.AreaInfo>
      )}
      {currentDrawing !== null && (
        <Styled.Confirmation background={theme.palette.background.default}>
          <Button
            onClick={() => {
              const { Polygon, InfoWindow } = mapLib;
              const { spherical } = geometryLib;
              const paths = currentDrawing.getPaths().getArray()[0].getArray();
              const coordinates = paths.map((path) => ({
                lat: path.lat(),
                lng: path.lng(),
              }));
              const color =
                COLOR_LIST[
                  (Math.random() * 1000).toFixed(0) % COLOR_LIST.length
                ];
              currentDrawing.setMap(null);
              if (areas[drawingForAreaIndex].shape) {
                areas[drawingForAreaIndex].shape.setMap(null);
              }
              const shape = new Polygon({
                paths: coordinates,
                strokeColor: color,
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: color,
                fillOpacity: 0.5,
              });
              shape.addListener('click', (event) => {
                const infoWindow = new InfoWindow();
                const contentString = areas[drawingForAreaIndex].name;
                infoWindow.setContent(contentString);
                infoWindow.setPosition(event.latLng);
                infoWindow.open(map);
              });
              areas[drawingForAreaIndex] = {
                ...areas[drawingForAreaIndex],
                area: (spherical.computeArea(coordinates) / 10000).toFixed(2),
                path: coordinates,
                drawing: currentDrawing,
                shape,
                color,
              };
              setAreas([...areas]);
              setDrawingForAreaIndex(null);
              setCurrentDrawing(null);
            }}
          >
            Salvar
          </Button>
          <Button
            onClick={() => {
              currentDrawing.setMap(null);
              setDrawingForAreaIndex(null);
              setCurrentDrawing(null);
            }}
          >
            Cancelar
          </Button>
        </Styled.Confirmation>
      )}
      {loading && (
        <Box
          sx={{
            width: '100%',
            height: '100%',
            zIndex: 1,
            position: 'absolute',
            inset: 0,
          }}
        />
      )}
      {loading && (
        <Skeleton
          variant="rectangular"
          height="100%"
          width="100%"
          sx={{
            position: 'absolute',
            inset: 0,
            zIndex: 2,
          }}
        />
      )}
    </Styled.Container>
  );
};

export default Map;
