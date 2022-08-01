import * as React from 'react';
import styles from './VoiceRecordingTiny.module.scss';
import { IVoiceRecordingTinyProps } from './IVoiceRecordingTinyProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { useEffect, useState } from "react";
import { useVoiceRecorder } from 'use-voice-recorder';
import { saveAs } from 'file-saver';
import { SPHttpClient } from '@microsoft/sp-http';
import { DefaultButton, Icon, PrimaryButton } from 'office-ui-fabric-react';

//const AuditoLibraryName = 'NewDocuments';

export default class VoiceRecordingTiny extends React.Component<IVoiceRecordingTinyProps, any> {
  public render(): React.ReactElement<IVoiceRecordingTinyProps> {
    return (
      <div>
        <div>
          {/* <MyRecorder contaxt={}></MyRecorder> */}
        </div>
      </div>
    );
  }
}

export interface IComponentProps {
  context: any;
  libraryInternalName: string;
  callBack: () => void
}

export const MyRecorder: React.FunctionComponent<IComponentProps> = (props: React.PropsWithChildren<IComponentProps>) => {

  const [records, updateRecords] = useState([]);
  const { isRecording, stop, start } = useVoiceRecorder((data) => {
    //updateRecords([...records, window.URL.createObjectURL(data)]);
    //updateRecords([window.URL.createObjectURL(data)]);
    updateRecords([data]);
  });
  return (
    <div>
      <div>
        <div className={'records'}>
          {records.map((data, idx) => (
            <div key={idx}>
              <audio src={window.URL.createObjectURL(data)} controls preload={'metadata'} />
            </div>
          ))}
        </div>
        <div>
          <PrimaryButton text='Start' onClick={start}></PrimaryButton>
          <PrimaryButton text='Stop' onClick={stop}></PrimaryButton>
          {/* <PrimaryButton
            text="Press and hold to record"
            iconProps={{ iconName: "Record2" }}
            style={{ marginRight: 5 }}
            label={"Hold to record"}
            className={`btn ${isRecording ? 'active' : ''}`}
            onMouseDown={start}
            onMouseUp={stop}
            onTouchStart={start}
            onTouchEnd={stop}>
          </PrimaryButton> */}
          <DefaultButton
            text="Reset"
            style={{ marginRight: 5 }}
            iconProps={{ iconName: "Delete" }}
            onClick={e => { updateRecords([]) }}>
            {/* <img style={{ height: 50 }} src='https://findicons.com/files/icons/1262/amora/128/delete.png' /> */}
            {/* <Icon iconName='Delete'></Icon> */}
          </DefaultButton>
          <DefaultButton
            text="Upload"
            style={{ marginRight: 5 }}
            iconProps={{ iconName: "CloudUpload" }}
            onClick={e => {
              if (records.length > 0) {
                debugger;
                var fileName = 'MyRecord_' + new Date().getTime() + '.mp3';
                var url = props.context.pageContext.web.absoluteUrl + "/_api/web/GetFolderByServerRelativeUrl('" + props.context.pageContext.web.serverRelativeUrl + "/" + props.libraryInternalName + "')/Files/Add(url='" + fileName + "', overwrite=" + true + ")";
                props.context.spHttpClient.post(url, SPHttpClient.configurations.v1, { body: records[0] }).then(res => {
                  if (res.ok) {
                    res.json().then(resJSON => {
                      props.callBack();
                    });
                  }
                });
              }
              else
                alert('No file to upload')
            }}>
            {/* <img style={{ height: 50 }} src='https://cdn-icons-png.flaticon.com/512/338/338864.png' /> */}
            {/* <Icon iconName='CloudUpload'></Icon> */}
          </DefaultButton>
          <h3 className={['onair', isRecording ? styles.blink : ''].join(' ')}>Recording: {isRecording ? 'on' : 'off'}</h3>
        </div>
      </div>
    </div>
  );
};
