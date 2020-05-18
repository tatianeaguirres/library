import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import axios from 'axios';

export interface IValues {
  title: string,
  author: string,
  description: string,
}

export interface IFormState {
  [key: string]: any;
  values: IValues[];
  submitSuccess: boolean;
  loading: boolean;
}

class Create extends React.Component<RouteComponentProps, IFormState> {
  constructor(props: RouteComponentProps) {
    super(props);
    this.state = {
      title: '',
      author: '',
      description: '',
      values: [],
      loading: false,
      submitSuccess: false,
    }
  }

  private processFormSubmission = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    this.setState({ loading: true });

    const formData = {
      title: this.state.title,
      author: this.state.author,
      description: this.state.description,
    }

    this.setState({ submitSuccess: true, values: [...this.state.values, formData], loading: false });

    axios.post(`http://localhost:5000/books`, formData).then(data => [
      setTimeout(() => {
        this.props.history.push('/');
      }, 1500)
    ]);
  }

  private handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value,
    })
  }

  public render() {
    const { submitSuccess, loading } = this.state;
    return (
      <div>
        <div className="">
          <h2>Create Book</h2>

          {!submitSuccess && (
            <div className="" role="alert">
              Fill the form below to create a new book
            </div>
          )}

          {submitSuccess && (
            <div className="" role="alert">
              The form was successfully submitted!
            </div>
          )}

          <form id={"create-post-form"} onSubmit={this.processFormSubmission} noValidate={true}>
            <div className="">
              <label htmlFor="title"> First Name </label>
              <input type="text" id="title" onChange={(e) => this.handleInputChanges(e)} name="title" className="" placeholder="Enter book's title" />
            </div>

            <div className="">
              <label htmlFor="author"> Last Name </label>
              <input type="text" id="author" onChange={(e) => this.handleInputChanges(e)} name="author" className="" placeholder="Enter book's author" />
            </div>

            <div className="">
              <label htmlFor="description"> Description </label>
              <input type="text" id="description" onChange={(e) => this.handleInputChanges(e)} name="description" className="" placeholder="Enter Description" />
            </div>

            <div className="">
              <button className="" type="submit">
                Create Book
              </button>
              {loading &&
                <span>Loading</span>
              }
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default withRouter(Create);