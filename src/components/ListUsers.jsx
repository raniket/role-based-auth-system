import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Resources.css';
import { getUsers } from '../actions';

class ListUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  state = {
    loading: true,
  }
  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    const { users, usersReceived, loading } = this.props;

    const resourceItems = (usersReceived === true) ? users.map(user => (
      <tr key={user.id}>
        <td className="pt-3-half">{`${user.id || ''}`}</td>
        <td className="pt-3-half">{user.firstName || 'not provided'}</td>
        <td className="pt-3-half">{user.lastName || 'not provided'}</td>
        <td className="pt-3-half">{user.email || 'not provided'}</td>
        <td className="pt-3-half">{user.role || 'not provided'}</td>
      </tr>
    )) : <div>loading data</div>;

    const listResourceTemplate = (usersReceived === true) ? (
      <div className="card card-custom-css animated fadeInRightBig fast">
        <h3 className="card-header text-center font-weight-bold text-uppercase py-4">Any user can see all the users in this system</h3>
        <div className="card-body">
          <div id="table" className="table-editable">
            <table className="table table-bordered table-responsive-md table-striped text-center">
              <tbody>
                <tr>
                  <th className="text-center">User Id</th>
                  <th className="text-center">First Name</th>
                  <th className="text-center">Last Name</th>
                  <th className="text-center">Email</th>
                  <th className="text-center">Role</th>
                </tr>
                {resourceItems}
              </tbody>
            </table>

          </div>
        </div>
      </div>
    ) : (
        <div className="card rare-wind-gradient rounded">
          <div className="card-body">
            <h4 className="card-title">Something Went Wrong!</h4>
            <hr />
            <p className="card-text">Could not fetch data from the server. Please check you internet connection.</p>
            <p className="card-text">You can contact developers if you are facing this issue multiple times...</p>
          </div>
        </div>
      );

    const loader = (
      <div className="loader" style={{ margin: '0 auto', marginTop: '20%', marginBottom: '50%' }}>
      </div>
    );

    const finalTemplate = (loading === true) ? loader : listResourceTemplate;

    return (

      <div>
        {/* <h1>all users loaded</h1> */}
        {finalTemplate}
      </div>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
    usersReceived: state.usersReceived,
    loading: state.loading,
  }
}

const mapDispatchToProps = {
  getUsers: getUsers,
}

export default connect(mapStateToProps, mapDispatchToProps)(ListUsers);