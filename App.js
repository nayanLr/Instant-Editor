import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View,
  Platform,
  NativeModules,
} from 'react-native';
const {VideoEditorModule} = NativeModules;

// Set Banuba license token for Video Editor SDK
// const LICENSE_TOKEN =
//   '9nvBCEK1PvH9Mo8V1moSJTRKfl6KoEI4M7W1GH3HmBnIrkvZ5UFkfyXBArfdDPJ+ruILLhDjOrIbQji4RQLoFqZ6zIvTZOOVAcdrM/qGgzdNiv1jLHq12mexlUOOm7mxDBeuccYFsN5AggiYDzhEQAD42AxMTvFOvMP+3tmO8h9yOzUbFjK4AlOFL0jWE703NrxoOfEsvoPafNvv3HjOMFV5eFD8GOi8WRrRmirS/R+yTKVtg9avaJoCtoxZp2Pp2Hs/r+Id2/7WwqUx4N3+g75l5B1UwBsQv73urcNXlx4AeW+3p5opSq9L4TGg0+ZrRBvzffK5uUkZyaDTNmyca7Bxn4Xq9RAcNUtdijPckDB9Z1kGxCTsnEtYif1xEk0tEfAfowi5yzbo7N2XajwXILQu8/PoWZznRxZ4o59cfcl41AMOhwmc0o7Tek5pHZ/RI1/ArbVAGuHmMpNm0QY2y9Lrtlpw286nxmwIO+s+8kum6Ax3U2bGQC44jP0Et1EWRicHV4Fs51exQuTf2CqNKLXWayhmZF1ZNp8WEw==';

// Wrong License Token
const LICENSE_TOKEN =
  '9nvBCEK1PvH9Mo8V1moSJTRKfl6KoEI4M7W1GH3HmBnIrkvZ5UFkfyXBArfdDPJ+ruILLhDjOrIbQji4RQLoFqZ6zIvTZOOVAcdrM/qGgzdNiv1jLHq12mexlUOOm7mxDBeuccYFsN5AggiYDzhEQAD42AxMTvFOvMP+3tmO8h9yOzUbFjK4AlOFL0jWE703NrxoOfEsvoPafNvv3HjOMFV5eFD8GOi8WRrRmirS/R+yTKVtg9avaJoCtoxZp2Pp2Hs/r+Id2/7WwqUx4N3+g75l5B1UwBsQv73urcNXlx4AeW+3p5opSq9L4TGg0+ZrRBvzffK5uUkZyaDTNmyca7Bxn4Xq9RAcNUtdijPckDB9Z1kGxCTsnEtYif1xEk0tEfAfowi5yzbo7N2XajwXILQu8/PoWZznRxZ4o59cfcl41AMOhwmc0o7Tek5pHZ/RI1/ArbVAGuHmMpNm0QY2y9Lrtlpw286nxmwIO+s+8kum6Ax3U2bGQC44jP0Et1EWRicHV4Fs51exQuTf2CqNKLXW';

const ERR_SDK_NOT_INITIALIZED_CODE = 'ERR_VIDEO_EDITOR_NOT_INITIALIZED';
const ERR_SDK_NOT_INITIALIZED_MESSAGE = 'Banuba Video Editor SDK is not initialized: license token is unknown or incorrect.\nPlease check your license token or contact Banuba';

const ERR_LICENSE_REVOKED_CODE = 'ERR_VIDEO_EDITOR_LICENSE_REVOKED';
const ERR_LICENSE_REVOKED_MESSAGE = 'License is revoked or expired. Please contact Banuba https://www.banuba.com/faq/kb-tickets/new';

function initVideoEditor() {
  VideoEditorModule.initVideoEditor(LICENSE_TOKEN);
}

async function startIosVideoEditor() {
  initVideoEditor();
  return await VideoEditorModule.openVideoEditor();
}

async function startIosVideoEditorPIP() {
  initVideoEditor();
  return await VideoEditorModule.openVideoEditorPIP();
}

async function startIosVideoEditorTrimmer() {
  initVideoEditor();
  return await VideoEditorModule.openVideoEditorTrimmer();
}

async function startAndroidVideoEditorTrimmer() {
  initVideoEditor();
  return await VideoEditorModule.openVideoEditorTrimmer();
}

async function startAndroidVideoEditor() {
  initVideoEditor();
  return await VideoEditorModule.openVideoEditor();
}

async function startAndroidVideoEditorPIP() {
  initVideoEditor();
  return await VideoEditorModule.openVideoEditorPIP();
}

export default class App extends Component {
  
  constructor() {
    super();
    this.state = {
      errorText: '',
    };
  }

  handleExportException(e) {
    var message = '';
    switch (e.code) {
      case ERR_SDK_NOT_INITIALIZED_CODE:
        message = ERR_SDK_NOT_INITIALIZED_MESSAGE;
        break;
      case ERR_LICENSE_REVOKED_CODE:
        message = ERR_LICENSE_REVOKED_MESSAGE;
        break;
      default:
        message = '';
        console.log(
          'Banuba ' +
            Platform.OS.toUpperCase() +
            ' Video Editor export video failed = ' +
            e,
        );
        break;
    }
    this.setState({errorText: message});
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{padding: 16, textAlign: 'center',color:'#000'}}>
          Sample integration of Banuba Video Editor into React Native CLI
          project
        </Text>

        <Text
          style={{
            padding: 16,
            textAlign: 'center',
            color: '#ff0000',
            fontSize: 16,
            fontWeight: '800',
          }}>
          {this.state.errorText}
        </Text>

        <View style={{marginVertical: 8}}>
          <Button
            title="Open Video Editor - Default"
            onPress={async () => {
              if (Platform.OS === 'android') {
                startAndroidVideoEditor()
                  .then(videoUri => {
                    console.log(
                      'Banuba Android Video Editor export video completed successfully. Video uri = ' +
                        videoUri,
                    );
                  })
                  .catch(e => {
                    this.handleExportException(e);
                  });
              } else {
                startIosVideoEditor()
                  .then(response => {
                    const exportedVideoUri = response?.videoUri;
                    const exportedVideoPreviewUri = response?.previewUri;
                    console.log(
                      'Banuba iOS Video Editor export video completed successfully. Video uri = '
                      + exportedVideoUri
                      + ' previewUri = '
                      + exportedVideoPreviewUri,
                    );
                  })
                  .catch(e => {
                    this.handleExportException(e);
                  });
              }
            }}
          />
        </View>

        <View style={{marginVertical: 8}}>
          <Button
            title="Open Video Editor - PIP"
            color="#00ab41"
            onPress={async () => {
              if (Platform.OS === 'android') {
                startAndroidVideoEditorPIP()
                  .then(videoUri => {
                    console.log(
                      'Banuba Android Video Editor export video completed successfully. Video uri = ' +
                        videoUri,
                    );
                  })
                  .catch(e => {
                    this.handleExportException(e);
                  });
              } else {
                startIosVideoEditorPIP()
                  .then(response => {
                    const exportedVideoUri = response?.videoUri;
                    const exportedVideoPreviewUri = response?.previewUri;
                    console.log(
                      'Banuba iOS Video Editor export video completed successfully. Video uri = '
                      + exportedVideoUri
                      + ' previewUri = '
                      + exportedVideoPreviewUri,
                    );
                  })
                  .catch(e => {
                    this.handleExportException(e);
                  });
              }
            }}
          />
        </View>

        <View style={{marginVertical: 8}}>
          <Button
            title="Open Video Editor - Trimmer"
            color="#ff0000"
            onPress={async () => {
              if (Platform.OS === 'android') {
                startAndroidVideoEditorTrimmer()
                  .then(videoUri => {
                    console.log(
                      'Banuba Android Video Editor export video completed successfully. Video uri = ' +
                        videoUri,
                    );
                  })
                  .catch(e => {
                    this.handleExportException(e);
                  });
              } else {
                startIosVideoEditorTrimmer()
                  .then(response => {
                    const exportedVideoUri = response?.videoUri;
                    const exportedVideoPreviewUri = response?.previewUri;
                    console.log(
                      'Banuba iOS Video Editor export video completed successfully. Video uri = '
                      + exportedVideoUri
                      + ' previewUri = '
                      + exportedVideoPreviewUri,
                    );
                  })
                  .catch(e => {
                    this.handleExportException(e);
                  });
              }
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
