import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaGithubAlt } from 'react-icons/fa';
import api from '../../services/api';
import { GoArrowLeft } from 'react-icons/go';
import { Owner, OwnerProfile } from './RepositoriesStyles';
import { Form, List } from './RepositoriesStyles';

import Container, { Icon } from '../../components/Container';

export default class Repositories extends Component {
  state = {
    search: '',
    repo: [],
    filtredRepo: [],
    loading: true,
    page: 1,
  };

  async componentDidMount() {
    const { match } = this.props;

    const userName = decodeURIComponent(match.params.user);
    const response = await api.get(`/users/${userName}/repos`);
    this.setState({
      repo: response.data,
      filtredRepo: response.data,
    });

    //console.log(response.data);
  }

  handleInputChange = e => {
    this.setState({ search: e.target.value });
    const query = e.target.value;

    this.setState(prevState => {
      const filtredRepo = prevState.repo.filter(element => {
        return element.name.toLowerCase().includes(query.toLowerCase());
      });

      return {
        query,
        filtredRepo,
      };
    });
  };

  handleSubmit = e => {
    e.preventDefault();
  };

  render() {
    const { filtredRepo, search } = this.state;
    return (
      <Container>
        <Icon>
          <FaGithubAlt />
        </Icon>

        <div>
          <Owner>
            <div>
              <Link to="/">
                <GoArrowLeft /> Back to Users
              </Link>
            </div>
            <OwnerProfile>
              <img
                src={this.props.location.state.avatar_url}
                alt={this.props.location.state.username}
              />
              <h2>{this.props.location.state.username}</h2>
            </OwnerProfile>
          </Owner>
        </div>

        <h1>Repositories: </h1>

        <Form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Search Repo - filter repos by name"
            value={search}
            onChange={this.handleInputChange}
          />
        </Form>

        <List>
          {filtredRepo.map(item => (
            <li key={item.id}>
              <div>
                <Link
                  to={`/repos/${encodeURIComponent(
                    this.props.location.state.username
                  )}/${encodeURIComponent(item.name)}`}
                >
                  <h4>{item.name}</h4>
                </Link>
                <p>{item.description}</p>
                <span>{item.language}</span>
                <span>
                  Updated on {new Date(item.updated_at).toDateString()}
                </span>
              </div>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
