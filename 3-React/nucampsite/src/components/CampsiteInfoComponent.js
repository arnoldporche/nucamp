import React, { Component } from "react";
import {
  Button,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Label,
  Modal,
  ModalBody,
  ModalHeader
} from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

const required = val => val && val.length;
const maxLength = len => val => !val || val.length <= len;
const minLength = len => val => val && val.length >= len;

function RenderCampsite({campsite}) {
  return (
    <div className="col-md-5 m-1">
      <Card>
        <CardImg top src={baseUrl + campsite.image} alt={campsite.name} />
        <CardBody>
          <CardTitle>{campsite.name}</CardTitle>
          <CardText>{campsite.description}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}

function RenderComments({comments, postComment, campsiteId}) {
  if (comments) {
    return (
      <div className="col-md-5 m-1">
        <h4>Comments</h4>
        {comments.map(comment => (
          <div key={comment.id}>
            "<b>{comment.text}</b>"
            <p>
              -- <i>{comment.author}</i>,{" "}
              {new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit"
              }).format(new Date(Date.parse(comment.date)))}
            </p>
          </div>
        ))}

        <CommentForm campsiteId={campsiteId} postComment={postComment} />
      </div>
    );
  }
  return <div />;
}
/*
function RenderComments({comments}) {
  return (
    <CommentForm campsiteId={campsiteId} addComment={addComment} />
  );
}
*/
class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  /*
  handleSubmit(values) {
    console.log("Current state is: " + JSON.stringify(values));
    alert("Current state is: " + JSON.stringify(values));
  }
  */
  toggleModal = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  };

  handleSubmit(values) {
    this.toggleModal();
    //this.props.addComment(this.props.campsiteId, values.rating, values.author, values.text);
    this.props.postComment(this.props.campsiteId, values.rating, values.author, values.text);
  }

  render() {
    return (
      <React.Fragment>
        <Button outline onClick={this.toggleModal}>
          <i className="fa fa-pencil" /> Submit Comment
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={values => this.handleSubmit(values)}>
              <div className="form-group">
                <Label htmlFor="rating">Rating</Label>
                <Control.select
                  id="rating"
                  model=".rating"
                  name="rating"
                  className="form-control"
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Control.select>
              </div>
              <div className="form-group">
                <Label htmlFor="author">Your name</Label>
                <Control.text
                  model=".author"
                  id="author"
                  name="author"
                  placeholder="Your Name"
                  className="form-control"
                  validators={{
                    required,
                    minLength: minLength(2),
                    maxLength: maxLength(15)
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".author"
                  show="touched"
                  component="div"
                  messages={{
                    required: "Required",
                    minLength: "Must be at least 2 characters",
                    maxLength: "Must be 15 characters or less"
                  }}
                />
              </div>
              <div className="form-group">
                <Label htmlFor="text">Comment</Label>
                <Control.textarea
                  model=".text"
                  id="text"
                  name="text"
                  rows="6"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <Button type="submit" color="primary">
                  Submit
                </Button>
              </div>
            </LocalForm>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

function CampsiteInfo(props) {
  if (props.isLoading) {
      return (
          <div className="container">
              <div className="row">
                  <Loading />
              </div>
          </div>
      );
  }
  if (props.errMess) {
      return (
          <div className="container">
              <div className="row">
                  <div className="col">
                      <h4>{props.errMess}</h4>
                  </div>
              </div>
          </div>
      );
  }
  if (props.campsite) {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/directory">directory</Link>
              </BreadcrumbItem>
            </Breadcrumb>
            <h2>{props.campsite.name}</h2>
            <hr />
          </div>
          <div className="row">
              <RenderCampsite campsite={props.campsite} />
              <RenderComments 
                  comments={props.comments}
                  //addComment={props.addComment}
                  postComment={props.postComment}
                  campsiteId={props.campsite.id}
              />
          </div>
        </div>
      </div>
    );
  }
  return <div />;
}
/*
class CampsiteInfo extends Component {
  render() {
    
  }
}
*/
export default CampsiteInfo;
/*
render() {
  if (this.props.campsite) {
    return (
      <div className="container">
        <div className="row">
          {this.renderCampsite(this.props.campsite)}
          {this.renderComments(this.props.comments)}
          <RenderComments 
              comments={props.comments}
              addComment={props.addComment}
              campsiteId={props.campsite.id}
          />
        </div>
      </div>
    );
  }
  return <div />;
}
*/