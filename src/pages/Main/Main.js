import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaGithubAlt, FaPlus, FaSpinner, FaTrash } from 'react-icons/fa';
import api from '../../services/api';

import { Form, SubmitButton, List, ErrorMessage } from './MainStyles';
import Container, { Icon } from '../../components/Container';

class Main extends Component {
  state = {
    newUser: '',
    user: [
      {
        name: 'Ghassen FATHALLAH',
        owner: {
          username: 'F-Ghassen',
          avatar_url: 'https://avatars0.githubusercontent.com/u/37085235?v=4',
        },
      },
    ],
    loading: false,
    error: false,
    errorMessage: '',
  };

  componentDidMount() {
    const user = localStorage.getItem('user');

    user && this.setState({ user: JSON.parse(user) });
  }

  componentDidUpdate(_, prevState) {
    const { user } = this.state;

    prevState.user !== user &&
      localStorage.setItem('user', JSON.stringify(user));
  }

  handleInputChange = e => {
    this.setState({ newUser: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();

    this.setState({ loading: true, error: false });

    try {
      const { newUser, user } = this.state;

      if (newUser === '') throw new Error('You need to inform one user');

      const response = await api.get(`/users/${newUser}`);
      console.log(response);
      const data = {
        name: response.data.name,
        owner: {
          username: response.data.login,
          avatar_url: response.data.avatar_url,
        },
      };

      const hasUser = user.find(
        user =>
          user.owner.username.toLowerCase() ===
          data.owner.username.toLowerCase()
      );

      if (hasUser) throw new Error('Duplicated User');

      this.setState({
        user: [...user, data],
        newUser: '',
        errorMessage: '',
      });
    } catch (Error) {
      this.setState({
        error: true,
        errorMessage:
          Error.message === 'Request failed with status code 404'
            ? 'User not found'
            : Error.message,
      });
    } finally {
      this.setState({ loading: false });
    }
  };

  handleDelete = item => {
    const { user } = this.state;
    this.setState({
      user: user.filter(user => user.owner.username !== item.owner.username),
    });
  };

  render() {
    const { newUser, loading, user, error, errorMessage } = this.state;

    return (
      <Container>
        <Icon>
          <FaGithubAlt />
        </Icon>

        <h1>GitHub Repo Fetcher Per User</h1>

        <Form onSubmit={this.handleSubmit} error={error ? 1 : 0}>
          <input
            type="text"
            placeholder="Add User - Enter Github Username"
            value={newUser}
            onChange={this.handleInputChange}
          />
          <SubmitButton loading={loading ? 1 : 0} empty={!newUser}>
            {loading ? (
              <FaSpinner color="#fff" size={14} />
            ) : (
              <FaPlus color="#fff" size={14} />
            )}
          </SubmitButton>
        </Form>

        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

        <List>
          {user.map(item => (
            <li key={item.owner.username}>
              <div>
                <Link
                  to={{
                    pathname: `/users/${encodeURIComponent(
                      item.owner.username
                    )}/repos`,
                    state: item.owner,
                  }}
                >
                  <img src={item.owner.avatar_url} alt={item.owner.username} />
                  <span>{item.name ? item.name : item.owner.username}</span>
                </Link>
              </div>
              <button type="button" onClick={() => this.handleDelete(item)}>
                <FaTrash />
              </button>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}

export default Main;
