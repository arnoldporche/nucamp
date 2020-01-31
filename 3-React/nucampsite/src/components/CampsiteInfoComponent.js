import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
/*
class CampsiteInfo extends Component {
  renderCampsite(campsite) {
    
  }

  renderComments(comments) {
    
  }

  render() {
      if (this.props.campsite) {
          return (
              <div className="container">
                  <div className="row">
                      {this.renderCampsite(this.props.campsite)}
                      {this.renderComments(this.props.campsite.comments)}
                  </div>
              </div>
          );
      }
      return <div />;
  }
}
*/
function RenderCampsite({campsite}) {
  return (
    <div className="col-md-5 m-1">
      <Card>
        <CardImg top src={campsite.image} alt={campsite.name} />
        <CardBody>
          <CardTitle>{campsite.name}</CardTitle>
          <CardText>{campsite.description}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}

function RenderComments({comments}) {
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
      </div>
    );
  }
}

function CampsiteInfo(props) {
    if (props.campsite) {
        return (
            <div className="container">
                <div className="row">
                    <RenderCampsite campsite={props.campsite} />
                    <RenderComments comments={props.comments} />
                </div>
            </div>
        );
    }
    return <div />;
}

export default CampsiteInfo;