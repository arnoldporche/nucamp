import React, { Component } from 'react';
import { ScrollView, Text, FlatList } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';

const mapStateToProps = state => {
    return {
      partners: state.partners
    };
};

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      partners: PARTNERS
    };
  }

  static navigationOptions = {
    title: "About Us"
  };

  render() {
    const { navigate } = this.props.navigation;
    
    const renderPartner = ({item}) => {
        return (
            <ListItem
                title={item.name}
                subtitle={item.description}
                leftAvatar={{source: {uri: baseUrl + item.image}}}
            />
        );
    };

    if (this.props.partners.isLoading) {
        return (
            <ScrollView>
                <Mission />
                <Card
                    title='Community Partners'>
                    <Loading />
                </Card>
            </ScrollView>
        );
    }
    if (this.props.partners.errMess) {
        return (
            <ScrollView>
                <Mission />
                <Card
                    title='Community Partners'>
                    <Text>{this.props.partners.errMess}</Text>
                </Card>
            </ScrollView>
        );
    }

    return (
      <ScrollView>
        <Card wrapperStyle={{ margin: 20 }} title="Our Mission">
          <Text>
            We present a curated database of the best campsites in the vast
            woods and backcountry of the World Wide Web Wilderness. We increase
            access to adventure for the public while promoting safe and
            respectful use of resources. The expert wilderness trekkers on our
            staff personally verify each campsite to make sure that they are up
            to our standards. We also present a platform for campers to share
            reviews on campsites they have visited with each other.
          </Text>
        </Card>
        <Card wrapperStyle={{ margin: 20 }} title="Community Partners">
          <FlatList 
            data={this.props.partners.partners}
            renderItem={renderPartner}
            keyExtractor={item => item.id.toString()}
          />
        </Card>
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps)(About);