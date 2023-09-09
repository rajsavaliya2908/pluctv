import React, {Component} from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import {connect} from 'react-redux';
import styles from './styles';
import {
  SafeArea,
  SearchHeader,
  GigsCard,
  HeaderTab,
  CoursesCard,
  NoData,
} from 'src/components';
import {Colors, Strings} from 'src/utils/theme';
import {gigsData, coursesData} from 'src/utils/ExternalData';
import {setLoading} from 'src/redux/actions/CommonActions';
import {ShowToast, MessageUtils} from 'src/utils/theme';
import {APIURL, RequestManager} from 'src/api';
import {ResponseCode, ExploreContentType} from 'src/utils/Const';
import Routes from 'src/router/Routes';

const requestManager = new RequestManager();

class CreatorHub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: [
        {title: Strings.gigs},
        // {title: Strings.shows},
        {title: Strings.courses},
      ],
      //routes: [{key: 'gigs'}, {key: 'shows'}, {key: 'courses'}],
      routes: [{key: 'gigs'}, {key: 'courses'}],
      activeCategory: 0,
      isGigsRefresh: false,
      isCoursesRefresh: false,
      gigsData: [],
      coursesData: [],
    };
  }

  componentDidMount() {
    this.gigsAPiRequest(false);
    this.coursesAPiRequest(false);
  }

  // Server Request
  gigsAPiRequest = async isOnRefresh => {
    if (!isOnRefresh) {
      this.props.setLoading(true);
    }
    let params = {};
    await requestManager.doRequest(
      APIURL.API_GET_GIGS,
      params,
      this.onResponse,
      this.onError,
    );
  };

  coursesAPiRequest = async isOnRefresh => {
    if (!isOnRefresh) {
      this.props.setLoading(true);
    }
    let params = {};
    await requestManager.doRequest(
      APIURL.API_GET_EVENTS,
      params,
      this.onResponse,
      this.onError,
    );
  };

  // API RESPONSE
  onResponse = (response, reqId) => {
    switch (reqId) {
      case APIURL.API_GET_GIGS.id: {
        this.props.setLoading(false);
        switch (response.status) {
          case ResponseCode.OK:
          case ResponseCode.CREATED: {
            this.setState({
              isGigsRefresh: false,
            });
            console.log(response, 'responseof gigs');
            if (response.status === 200 && response.data) {
              this.setState({
                gigsData: response.data,
              });
            } else {
              ShowToast(MessageUtils.Errors.APIError);
            }
            break;
          }
        }
        break;
      }

      case APIURL.API_GET_EVENTS.id: {
        this.props.setLoading(false);
        switch (response.status) {
          case ResponseCode.OK:
          case ResponseCode.CREATED: {
            console.log(response, 'Response of Courses');
            this.setState({
              isCoursesRefresh: false,
            });
            if (response.status === 200 && response.data) {
              this.setState({
                coursesData: response.data,
              });
            } else {
              ShowToast(MessageUtils.Errors.APIError);
            }
            break;
          }
        }
        break;
      }
    }
  };

  onError = (error, reqId) => {
    this.props.setLoading(false);
    switch (error.status) {
      case ResponseCode.METHOD_NOT_ALLOWED:
      case ResponseCode.BAD_REQUEST: {
        break;
      }
    }
  };

  onGigsRefresh = () => {
    this.setState({
      isGigsRefresh: true,
    });
    this.gigsAPiRequest(true);
  };

  onCoursesRefresh = () => {
    this.setState({
      isCoursesRefresh: true,
    });
    this.coursesAPiRequest(true);
  };

  updateCategory = index => {
    this.setState({activeCategory: index});
  };

  renderGigs = ({item, index}) => {
    return (
      <GigsCard {...item} onPress={() => this.handleClick(item, 'gigs')} />
    );
  };

  handleClick = (item, type) => {
    const {navigation} = this.props;
    navigation.navigate(Routes.GigsDetails, {data: item, type});
  };

  renderCourses = ({item, index}) => {
    return (
      <CoursesCard
        {...item}
        onPress={() => this.handleClick(item, 'courses')}
      />
    );
  };

  renderGigsList = () => (
    <FlatList
      data={this.state.gigsData}
      keyExtractor={(item, index) => index.toString()}
      extraData={[this.props, this.state]}
      renderItem={this.renderGigs}
      showsVerticalScrollIndicator={false}
      style={styles.showsList}
      refreshControl={
        <RefreshControl
          refreshing={this.state.isGigsRefresh}
          onRefresh={this.onGigsRefresh}
          tintColor={Colors.white}
        />
      }
    />
  );

  renderShowsList = () => <NoData />;

  renderCoursesList = () => (
    <FlatList
      data={this.state.coursesData}
      keyExtractor={(item, index) => index.toString()}
      extraData={[this.props, this.state]}
      renderItem={this.renderCourses}
      showsVerticalScrollIndicator={false}
      style={styles.list}
      refreshControl={
        <RefreshControl
          refreshing={this.state.isCoursesRefresh}
          onRefresh={this.onCoursesRefresh}
          tintColor={Colors.white}
        />
      }
    />
  );

  render() {
    const {category, activeCategory} = this.state;
    const {userName} = this.props;
    return (
      <SafeArea statusBarColor={Colors.primary} style={styles.container}>
        <SearchHeader title={`${userName}${Strings.jobsHub}`} />
        <HeaderTab
          category={category}
          activeCategory={activeCategory}
          updateCategory={this.updateCategory}
          headerTabStyle={{justifyContent: 'space-evenly'}}
        />
        <TabView
          navigationState={{index: activeCategory, routes: this.state.routes}}
          renderScene={SceneMap({
            gigs: this.renderGigsList,
            //shows: this.renderShowsList,
            courses: this.renderCoursesList,
          })}
          renderTabBar={() => {}}
          onIndexChange={this.updateCategory}
        />
      </SafeArea>
    );
  }
}

const mapStateToProps = state => {
  return {
    userName: state.UserReducer?.userInfo?.name
      ? state.UserReducer.userInfo.name
      : '',
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setLoading: isLoading => dispatch(setLoading(isLoading)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatorHub);
