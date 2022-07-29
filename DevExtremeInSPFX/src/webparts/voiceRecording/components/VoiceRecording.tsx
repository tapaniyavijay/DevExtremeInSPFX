import * as React from 'react';
import styles from './VoiceRecording.module.scss';
import { IVoiceRecordingProps } from './IVoiceRecordingProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Recorder } from 'react-voice-recorder'
import 'react-voice-recorder/dist/index.css'
import { saveAs } from 'file-saver';

export default class VoiceRecording extends React.Component<IVoiceRecordingProps, any> {
  constructor(props) {
    super(props);
    this.state = {
      audioDetails: {
        url: null,
        blob: null,
        chunks: null,
        duration: {
          h: null,
          m: null,
          s: null,
        }
      }
    }
  }

  private handleAudioStop(data) {
    console.log(data)
    this.setState({ audioDetails: data });
  }
  private handleAudioUpload(file) {
    console.log(file);
    saveAs(file, "recording.mp3");
    //console.log("Above file object can be used to upload the audio file to sharepoint library");
    //alert('Please hit F12 and check developer console...');
  }
  private handleReset() {
    const reset = {
      url: null,
      blob: null,
      chunks: null,
      duration: {
        h: null,
        m: null,
        s: null,
      }
    }
    this.setState({ audioDetails: reset });
  }

  public render(): React.ReactElement<IVoiceRecordingProps> {
    const {
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName
    } = this.props;

    return (
      <div>
        <Recorder
          hideHeader={true}
          showUIAudio={false}
          record={true}
          title={"Start your recording here..."}
          audioURL={this.state.audioDetails.url}
          //showUIAudio
          handleAudioStop={data => this.handleAudioStop(data)}
          //handleOnChange={(value) => this.handleOnChange(value, 'firstname')}
          handleAudioUpload={data => this.handleAudioUpload(data)}
          handleReset={() => {
            debugger;
            this.handleReset()
          }} />
      </div>
    );
  }
}
