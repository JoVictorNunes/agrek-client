import styled from 'styled-components';
import { Form } from 'react-router-dom';

const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  width: 100%;
`;

const CustomerForm = styled(Form)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > *:not(:last-child) {
    margin-bottom: 20px;
  }
`;

const styles = { Container, CustomerForm };

export default styles;
