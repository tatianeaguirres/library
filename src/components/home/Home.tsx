import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import axios from 'axios';


interface IState {
  books: any[];
}

export default class Home extends React.Component<RouteComponentProps, IState> {
  constructor(props: RouteComponentProps) {
    super(props);
    this.state = { books: [] }
  }

  public componentDidMount(): void {
    axios.get(`http://localhost:5000/books`).then(data => {
      this.setState({ books: data.data })
    })
  }

  public deleteBook(id: number) {
    axios.delete(`http://localhost:5000/books/${id}`).then(data => {
      const index = this.state.books.findIndex(book => book.id === id);
      this.state.books.splice(index, 1);
      this.props.history.push('/');
    })
  }

  public render() {
    const books = this.state.books;
    return (
      <div>
        {books.length === 0 && (
          <div className="">
            <h2>No books found at the moment</h2>
          </div>
        )}

        <div className="">
          <div className="">
            <table className="">
              <thead className="">
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Author</th>
                  <th scope="col">Description</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {books && books.map(book =>
                  <tr key={book.id}>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.description}</td>
                    <td>
                      <div className="">
                        <div className="" style={{ marginBottom: "20px" }}>
                          <Link to={`edit/${book.id}`} className="">Edit Book </Link>
                          <button className="" onClick={() => this.deleteBook(book.id)}>Delete Book</button>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}