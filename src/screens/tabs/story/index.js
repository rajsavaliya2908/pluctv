import React, {Component} from 'react';
import {
  View,
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Image,
  Keyboard,
} from 'react-native';
import Modal from 'react-native-modal';
import {RNCamera} from 'react-native-camera';
import {SafeArea, CustomTextInput, Header} from 'src/components';
import styles from './styles';
import {
  Colors,
  Strings,
  Images,
  CommonStyles,
  ShowToast,
  MessageUtils,
} from 'src/utils/theme';
import Upload from 'react-native-background-upload';
import {setLoading} from 'src/redux/actions/CommonActions';
import {connect} from 'react-redux';
import {API_URL, AuthType, ResponseCode} from 'src/utils/Const';
import JWPlayer, {JWPlayerState} from 'react-native-jw-media-player';
import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';
import Routes from 'src/router/Routes';
import {APIURL, RequestManager} from 'src/api';

const requestManager = new RequestManager();

const FLASH_MODE = [
  RNCamera.Constants.FlashMode.on,
  RNCamera.Constants.FlashMode.off,
  RNCamera.Constants.FlashMode.auto,
];

class Story extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModal: true,
      cameraType: RNCamera.Constants.Type.back,
      flashMode: 1,
      isRecordStart: false,
      isBack: false,
      videoResponse: '',
      title: '',
      location: '',
      description: '',
    };
  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener(
      'focus',
      async () => {
        this.setState({isModal: true, isBack: false});
      },
    );
  }

  handleInput = (txt, key) => {
    this.setState({[key]: txt});
  };

  onSubmitPress = () => {
    Keyboard.dismiss();
    const {title, description, location} = this.state;
    if (!title.trim().length) {
      ShowToast(MessageUtils.Errors.titleBlank);
    } else if (!description.trim().length) {
      ShowToast(MessageUtils.Errors.descriptionBlank);
    } else if (!location.trim().length) {
      ShowToast(MessageUtils.Errors.locationBlank);
    } else {
      this.videoUploadRequest();
    }
  };

  // Server Request
  videoUploadRequest = async () => {
    const {title, description, location, videoResponse} = this.state;
    const {
      media_details: {length},
      source_url,
    } = videoResponse;
    this.props.setLoading(true);
    let params = {
      title: title,
      summary: 'My awesome story',
      location: location,
      description: description,
      video_thumbnail: source_url,
      video_file: source_url,
      duration: length,
      category: '22,1109',
    };
    await requestManager.doRequest(
      APIURL.API_POST_VIDEO_DATA,
      params,
      this.onResponse,
      this.onError,
    );
  };

  // API RESPONSE
  onResponse = (response, reqId) => {
    switch (reqId) {
      case APIURL.API_POST_VIDEO_DATA.id: {
        this.props.setLoading(false);
        switch (response.status) {
          case ResponseCode.OK:
          case ResponseCode.CREATED: {
            if (response.status === 200) {
              this.setState({
                videoResponse: '',
                title: '',
                location: '',
                description: '',
              });
              this.props.navigation.goBack();
            }
            console.log(response, 'Response of Video Upload');
            break;
          }
        }
        break;
      }
    }
  };

  onError = (error, reqId) => {
    setLoading(false);
    switch (error.status) {
      case ResponseCode.METHOD_NOT_ALLOWED:
      case ResponseCode.BAD_REQUEST: {
        break;
      }
    }
  };

  async isPlaying() {
    const playerState = await this.JWPlayer.playerState();
    return playerState === JWPlayerState.JWPlayerStatePlaying;
  }

    uploadFiles = (video) => {
        const options = {
            url: `${API_URL}${APIURL.API_POST_UPLOAD_MEDIA.url}`,
            path: video,
            method: 'POST',
            type: 'raw',
            maxRetries: 2, // set retry count (Android only). Default 2
            headers: {
                'Content-Disposition': 'attachment; filename="sample.mp4"',
                'Accept': "*/*",
                'Authorization': `Bearer ${this.props.apiToken}`,
                'Content-Type': 'video/quicktime',
                'Cookie': 'PHPSESSID=8res7486ske8upqbks9ghq4hca; digits_countrycode=91; wp_wpfileupload_1626afd73032762450802ee1744ede79=7YY9SEbfDDCWxLFeztdwFQeZyqeSjcmN'
            },
            notification: {
                enabled: false
            },
            useUtf8Charset: true
        };
        this.setState({isModal: false});
        this.props.setLoading(true);
        Upload.startUpload(options).then((uploadId) => {
            console.log('Upload started')
            Upload.addListener('progress', uploadId, (data) => {
                console.log(`Progress: ${data.progress}%`)
            })
            Upload.addListener('error', uploadId, (data) => {
                console.log(`Error: ${data.error}%`)
            })
            Upload.addListener('cancelled', uploadId, (data) => {
                console.log(`Cancelled!`)
                console.log(data, `data Cancelled!`)
            })
            Upload.addListener('completed', uploadId, (data) => {
                console.log(JSON.parse(data.responseBody), 'Completed!')
                this.setState({
                    videoResponse: JSON.parse(data.responseBody)
                });
                this.props.setLoading(false);
            })
        }).catch((err) => {
            console.log('Upload error!', err)
        })
    };

  onVideoUpload = video => {
    this.uploadFiles(video.uri);
  };

  onGoBack = () => {
    this.setState({isModal: false, isBack: true});
    this.props.navigation.goBack();
  };

  recordVideo = () => {
    const {isRecordStart, isBack} = this.state;
    this.setState({
      isRecordStart: !this.state.isRecordStart,
    });

    if (!isRecordStart) {
      // start record
      try {
        this.camera
          .recordAsync({
            maxDuration: 60,
          })
          .then(video => {
            let urlString = video.uri;
            if (Platform.OS === 'android') {
              urlString = video.uri.replace('file://', '');
            }
            const videoDetails = {
              deviceOrientation: video.deviceOrientation,
              isRecordingInterrupted: video.isRecordingInterrupted,
              uri: urlString,
              videoOrientation: video.videoOrientation,
            };
            this.onVideoUpload(videoDetails);
          })
          .catch(e => {
            this.stopRecord();
          });
      } catch (e) {
        this.stopRecord();
        console.log(e, 'ERRRR');
      }
    } else {
      // stop record
      this.stopRecord();
    }
  };

  stopRecord = () => {
    this.camera.stopRecording();
  };

  toggleCamera = async () => {
    this.setState(prevState => ({
      cameraType:
        prevState.cameraType === RNCamera.Constants.Type.back
          ? RNCamera.Constants.Type.front
          : RNCamera.Constants.Type.back,
    }));
  };

  renderPlayer = () => {
    const {videoResponse} = this.state;
    const {source_url} = videoResponse;

    const playlistItem = {
      title: '',
      image: '',
      desc: '',
      time: 0,
      file: source_url ? source_url : '',
      autostart: false,
      controls: true,
      repeat: false,
      displayDescription: false,
      displayTitle: false,
      tracks: [],
    };
    return (
      <JWPlayer
        ref={p => (this.JWPlayer = p)}
        style={{
          backgroundColor: Colors.primary,
          height: '100%',
          width: '100%',
        }}
        playlistItem={playlistItem} // Recommended - pass the playlistItem as a prop into the player
        //playlist={[playlistItem]}
        onBeforePlay={() => {
          //this.onBeforePlay()
        }}
        onPlay={() => {
          //this.onPlay()
        }}
        onPause={() => {
          //this.onPause()
        }}
        onIdle={() => console.log('onIdle')}
        onPlaylistItem={event => {
          //this.onPlaylistItem(event)
        }}
        onSetupPlayerError={event => {
          //this.onPlayerError(event)
        }}
        onPlayerError={event => {
          //this.onPlayerError(event)
        }}
        onBuffer={() => {
          //this.onBuffer()
        }}
        onTime={event => {
          //this.onTime(event)
        }}
        onFullScreen={() => {
          //this.onFullScreen()
        }}
        onFullScreenExit={() => {
          //this.onFullScreenExit()
        }}
      />
    );
  };

  render() {
    const {
      title,
      location,
      isModal,
      cameraType,
      isRecordStart,
      isBack,
      description,
      videoResponse,
    } = this.state;
    const {source_url} = videoResponse;
    return (
      <>
        <Modal isVisible={isModal} backdropOpacity={1} style={styles.container}>
          <SafeAreaView style={styles.flexView}>
            <RNCamera
              ref={ref => {
                this.camera = ref;
              }}
              style={styles.flexView}
              type={cameraType}
              flashMode={FLASH_MODE[this.state.flashMode]}
              androidCameraPermissionOptions={{
                title: 'Permission to use camera',
                message: 'We need your permission to use your camera',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
              }}
              androidRecordAudioPermissionOptions={{
                title: 'Permission to use audio recording',
                message: 'We need your permission to use your audio',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
              }}
            />
            <View style={styles.buttonsView}>
              <TouchableOpacity
                style={styles.outerCircle}
                // onLongPress={this.recordVideo}
                onPress={this.recordVideo}>
                <View
                  style={[
                    isRecordStart ? styles.innerCircle2 : styles.innerCircle,
                  ]}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.rotateButton}
                onPress={this.toggleCamera}>
                <Image source={Images.rotate} style={styles.rotateImage} />
              </TouchableOpacity>
            </View>
            <Header style={styles.header} onPressBack={this.onGoBack} />
          </SafeAreaView>
        </Modal>
        {!isBack ? (
          <SafeArea
            statusBarColor={Colors.primary}
            bottomBarColor={Colors.primary}>
            <Header onPressBack={() => this.props.navigation.goBack()} />
            {source_url ? (
              <View
                style={{
                  height: '30%',
                  width: '100%',
                }}>
                {this.renderPlayer()}
              </View>
            ) : (
              <View
                style={{
                  height: '30%',
                  width: '100%',
                }}></View>
            )}
            <KeyboardAwareScrollView
              bounces={false}
              overScrollMode="never"
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={CommonStyles.keyboardScrollview}>
              <CustomTextInput
                SecureTextEntry={false}
                PlaceHolder={Strings.title}
                onChangeText={txt => this.handleInput(txt, 'title')}
                isDisbaleIcon
                value={title}
                onSubmitEditing={() => {}}
                inputStyle={styles.videoTitle}
                containerStyle={styles.titleContainer}
              />
              <CustomTextInput
                SecureTextEntry={false}
                PlaceHolder={Strings.videoDesc}
                onChangeText={txt => this.handleInput(txt, 'description')}
                isDisbaleIcon
                value={description}
                onSubmitEditing={() => {}}
                inputStyle={[styles.videoTitle, {minHeight: 150}]}
                containerStyle={styles.titleContainer}
                multiline={true}
              />
              <CustomTextInput
                SecureTextEntry={false}
                PlaceHolder={Strings.location}
                onChangeText={txt => this.handleInput(txt, 'location')}
                isDisbaleIcon
                value={location}
                onSubmitEditing={() => {}}
                inputStyle={styles.videoTitle}
                containerStyle={styles.titleContainer}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.onSubmitPress()}>
                <Text style={styles.buttonText}>{Strings.submitFootage}</Text>
              </TouchableOpacity>
            </KeyboardAwareScrollView>
          </SafeArea>
        ) : null}
      </>
    );
  }
}

const mapStateToProps = state => {
  console.log(state, 'state in Profile');
  return {
    apiToken: state.UserReducer?.apiToken ? state.UserReducer.apiToken : '',
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setLoading: isLoading => dispatch(setLoading(isLoading)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Story);
