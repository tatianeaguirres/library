import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import axios from 'axios';

export interface IValues {
  [key: string]: any;
}

export interface IFormState {
  id: number,
  book: any;
  values: IValues[];
  submitSuccess: boolean;
  loading: boolean;
}

class EditBook extends React.Component<RouteComponentProps<any>, IFormState> {
  constructor(props: RouteComponentProps) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      book: {},
      values: [],
      loading: false,
      submitSuccess: false,
    }
  }

  public componentDidMount(): void {
    axios.get(`http://localhost:5000/books/${this.state.id}`).then(data => {
      this.setState({ book: data.data });
    })
  }

  private processFormSubmission = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    this.setState({ loading: true });
    axios.patch(`http://localhost:5000/books/${this.state.id}`, this.state.values).then(data => {
      this.setState({ submitSuccess: true, loading: false })
      setTimeout(() => {
        this.props.history.push('/');
      }, 1500)
    })
  }


  private setValues = (values: IValues) => {
    this.setState({ values: { ...this.state.values, ...values } });
  }

  private handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    this.setValues({ [e.currentTarget.id]: e.currentTarget.value })
  }

  public render() {
    const { submitSuccess, loading } = this.state;
    return (
      <div className="">
        {this.state.book &&
          <div>
            <div className="">
              <h2>Edit Book</h2>

              {submitSuccess && (
                <div className="" role="alert">Book's details has been edited successfully</div>
              )}

              <form id={"create-post-form"} onSubmit={this.processFormSubmission} noValidate={true}>
                <div className="">
                  <label htmlFor="title"> First Name </label>
                  <input type="text" id="title" defaultValue={this.state.book.title} onChange={(e) => this.handleInputChanges(e)} name="title" className="" placeholder="Enter book's title" />
                </div>

                <div className="">
                  <label htmlFor="author"> Last Name </label>
                  <input type="text" id="author" defaultValue={this.state.book.author} onChange={(e) => this.handleInputChanges(e)} name="author" className="" placeholder="Enter book's author" />
                </div>

                <div className="">
                  <label htmlFor="description"> Description </label>
                  <input type="text" id="description" defaultValue={this.state.book.description} onChange={(e) => this.handleInputChanges(e)} name="description" className="" placeholder="Enter Description" />
                </div>

                <div className="">
                  <button className="" type="submit">
                    Edit Book </button>
                  {loading &&
                    <span>Loading</span>
                  }
                </div>
              </form>
            </div>
          </div>
        }
      </div>
    )
  }
}

export default withRouter(EditBook);