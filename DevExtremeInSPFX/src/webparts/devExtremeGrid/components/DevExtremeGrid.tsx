import * as React from 'react';
import styles from './DevExtremeGrid.module.scss';
import { IDevExtremeGridProps } from './IDevExtremeGridProps';
import { escape } from "@microsoft/sp-lodash-subset";
import "devextreme/dist/css/dx.material.blue.light.css";
import DataGrid, {
  Column,
  Grouping,
  GroupPanel,
  Pager,
  Paging,
  SearchPanel,
} from "devextreme-react/data-grid";
import ODataStore from "devextreme/data/odata/store";

const pageSizes = [10, 25, 50, 100];

const dataSourceOptions = {
  store: new ODataStore({
    url: "https://js.devexpress.com/Demos/SalesViewer/odata/DaySaleDtoes",
    key: "Id",
    beforeSend(request) {
      request.params.startDate = "2020-05-10";
      request.params.endDate = "2020-05-11";
    },
  }),
};


export default class DevExtremeGrid extends React.Component<IDevExtremeGridProps, any> {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
    this.onContentReady = this.onContentReady.bind(this);
  }
  public render(): React.ReactElement<IDevExtremeGridProps> {
    return (
      <section className={styles.devExtremeGrid}>
        <DataGrid
          dataSource={dataSourceOptions}
          allowColumnReordering={true}
          rowAlternationEnabled={true}
          showBorders={true}
          onContentReady={this.onContentReady}>
          <GroupPanel visible={true} />
          <SearchPanel visible={true} highlightCaseSensitive={true} />
          <Grouping autoExpandAll={false} />

          <Column dataField="Product" groupIndex={0} />
          <Column
            dataField="Amount"
            caption="Sale Amount"
            dataType="number"
            format="currency"
            alignment="right"
          />
          <Column
            dataField="Discount"
            caption="Discount %"
            dataType="number"
            format="percent"
            alignment="right"
            allowGrouping={false}
            cssClass="bullet"
          />
          <Column dataField="SaleDate" dataType="date" />
          <Column dataField="Region" dataType="string" />
          <Column dataField="Sector" dataType="string" />
          <Column dataField="Channel" dataType="string" />
          <Column dataField="Customer" dataType="string" width={150} />

          <Pager allowedPageSizes={pageSizes} showPageSizeSelector={true} />
          <Paging defaultPageSize={10} />
        </DataGrid>
      </section>
    );
  }
  onContentReady(e) {
    if (!this.state.collapsed) {
      e.component.expandRow(["EnviroCare"]);
      this.setState({
        collapsed: true,
      });
    }
  }
}

