import * as React from 'react';
import styles from './DevExtremeGrid.module.scss';
import { IDevExtremeGridProps } from './IDevExtremeGridProps';
import { escape } from "@microsoft/sp-lodash-subset";
import "devextreme/dist/css/dx.material.blue.light.css";
import DataGrid, {
  Button,
  Column,
  Grouping,
  GroupPanel,
  Pager,
  Paging,
  SearchPanel,
} from "devextreme-react/data-grid";
import ODataStore from "devextreme/data/odata/store";
import { SPHttpClient } from '@microsoft/sp-http';
import { MyRecorder } from '../../voiceRecordingTiny/components/VoiceRecordingTiny';


export default class DevExtremeGrid extends React.Component<IDevExtremeGridProps, any> {
  constructor(props) {
    super(props);
    this.state = {
      listData: null,
    };

    debugger;
    this.fillGridData();
  }

  private fillGridData() {
    this.getListData(this.props.listName, '$select=Id,File/Name,File/ServerRelativeUrl&$expand=File&$orderby=Id desc').then(res => {
      if (res.ok) {
        res.json().then(resJSON => {
          this.setState({ listData: resJSON.value });
        });
      }
    });
  }

  public getListData(listName: string, filter: string = null) {
    return this.props.context.spHttpClient.get(
      this.props.context.pageContext.web.absoluteUrl + `/_api/web/lists/getbytitle('${listName}')/Items` + (filter ? "?" + filter : ""),
      SPHttpClient.configurations.v1);
  }

  public render(): React.ReactElement<IDevExtremeGridProps> {
    return (
      <section className={styles.devExtremeGrid}>
        <div>
          Library Name : {this.props.listName}
        </div>
        <div>
          Library Internal Name : {this.props.listInternalName}
        </div>
        <div>
          <MyRecorder
            context={this.props.context}
            callBack={() => { this.fillGridData(); }}
            libraryInternalName={this.props.listInternalName}></MyRecorder>
        </div>
        <div>
          {
            this.state.listData ? <DataGrid
              dataSource={this.state.listData}>
              <Column dataField="Id" dataType="number" />
              <Column dataField="File.Name" dataType="string" />
              <Column type="buttons" width={110}>
                <Button icon="copy" onClick={(e) => {
                  debugger;
                  window.open(e.row.data.File.ServerRelativeUrl + "?web=1", '_blank')
                }} />
              </Column>
            </DataGrid> : <></>
          }
        </div>
      </section >
    );
  }
}

