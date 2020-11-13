import styled from 'styled-components';

export const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: row;

  input {
    flex: 1;
    border: solid ${props => (props.error ? '2px #e41111' : '1px #eee')};
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 16px;
  }
`;

export const Owner = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  div:first-child {
    align-self: flex-start;
    flex: 1 1 100%;
    margin-bottom: 40px;

    & > a {
      color: #7159c1;
      font-size: 16px;
      text-decoration: none;

      &:hover {
        color: #907dcf;
      }

      & svg {
        vertical-align: top;
        margin-right: 4px;
      }
    }
  }
`;

export const OwnerProfile = styled.div`
  @media (max-width: 600px) {
    margin: 0 0 5px 0;
  }

  h2 {
    text-align: center;
    font-size: 22px;
    margin-bottom: 20px;
  }

  img {
    width: 130px;
    border-radius: 50%;
    border: 4px solid #e6e6e6;
    margin-bottom: 5px;
  }
`;

export const List = styled.ul`
  margin-top: 30px;
  list-style-type: none;
  font-size: 16px;

  li {
    padding: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-radius: 15px;
    border: 1px solid #e6e6e6;
    margin: 10px;
    &:hover {
      color: #7159c1;
      cursor: pointer;
    }

    h4 {
      color: lightblue;
    }

    span {
      font-size: 13px;
      padding-right: 70px;
    }

    p {
      font-size: 15px;
      margin-top: 10px;
      margin-bottom: 10px;
    }

    img {
      width: 32px;
      margin-right: 12px;
      border-radius: 50%;
      border: 2px solid #dbdbdb;
    }

    a {
      display: flex;
      align-items: center;
      color: inherit;
      text-decoration: none;

      &:hover {
        color: #7159c1;
      }
    }

    button {
      color: #999;
      background: none;
      border: 0;
      padding: 6px 0 6px 16px;

      &:hover {
        color: #7159c1;
      }
    }
  }
`;
