import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Resources.css';
import { getResources } from '../actions';

class Resources extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  state = {
    loading: true,
  }
  componentDidMount() {
    this.props.getResources();
  }

  handleZoomToggle = (e) => {
    const id = e.target.id;
    const modal = document.getElementById('profile-image-modal');
    const img = document.getElementById(id);
    const modalImg = document.getElementById("img01");
    const captionText = document.getElementById("caption");
    modal.style.display = "block";
    modalImg.src = img.src;
    captionText.innerHTML = img.alt;
    const span = document.getElementsByClassName("close")[0];
    span.onclick = function () {
      modal.style.display = "none";
    }
  }

  render() {
    const { resources, resourceReceived, loading } = this.props;
    console.log('resourceReceived : ', resourceReceived);
    console.log('resources : ', resources);
    console.log('loading : ', loading);
    const resourceItems = (resourceReceived === true) ? resources.map(resource => (
      <tr key={resource.id}>
        <td className="pt-3-half" ><img src={resource.imageUrl} id={`profile-image-${resource.id}`}
          className="mg-fluid z-depth-1 rounded-circle profile-image custom-image-cropper"
          alt="teacher's profile" onClick={this.handleZoomToggle} /></td>
        <td className="pt-3-half">{`${resource.id || ''}`}</td>
        <td className="pt-3-half">{resource.imageUrl || 'not provided'}</td>
      </tr>
    )) : <div>loading data</div>;

    const listResourceTemplate = (resourceReceived === true) ? (
      <div className="card card-custom-css animated fadeInRightBig fast">
        <h3 className="card-header text-center font-weight-bold text-uppercase py-4">User will see the list of images based on the role</h3>
        <div className="card-body">
          <div id="table" className="table-editable">
            <table className="table table-bordered table-responsive-md table-striped text-center">
              <tbody>
                <tr>
                  <th className="text-center">Picture</th>
                  <th className="text-center">id</th>
                  <th className="text-center">link</th>
                </tr>
                {resourceItems}
              </tbody>
            </table>

            <div id="profile-image-modal" className="modal-custom">
              <span className="close">&times;</span>
              <img className="modal-content" id="img01" alt="display profile in lagre mode" />
              <div id="caption"></div>
            </div>
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
        {finalTemplate}
      </div>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    resources: state.resources,
    resourceReceived: state.resourceReceived,
    loading: state.loading,
  }
}

const mapDispatchToProps = {
  getResources: getResources,
}

export default connect(mapStateToProps, mapDispatchToProps)(Resources);