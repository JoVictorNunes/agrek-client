import styled, { css } from 'styled-components';

const AreaInfo = styled.div`
  position: absolute;
  top: 5px;
  left: 5px;
  bottom: 5px;
  background-color: ${({ background }) => background};
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  position: relative;
  flex-grow: 1;
  height: 100%;
`;

const Confirmation = styled.div`
  position: absolute;
  right: 5px;
  top: 5px;
  background-color: ${({ background }) => background};
  padding: 10px;
`;

const AreaItem = styled.div`
  display: flex;
  align-items: center;

  & > *:not(:first-child) {
    margin-left: 5px;
  }
`;

const BottomBar = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 18px 9px;
  border-top: 1px solid lightgray;
`;

const AreaInput = styled.div`
  flex-grow: 1;
  overflow-y: auto;

  & > *:not(:last-child) {
    margin-bottom: 2rem;
  }
`;

const Map = styled.div`
  height: 100%;
  width: 100%;

  ${({ loading }) =>
    loading &&
    css`
      z-index: -1;
    `}
`;

export {
  AreaInfo,
  AreaInput,
  AreaItem,
  BottomBar,
  Container,
  Confirmation,
  Map,
};
