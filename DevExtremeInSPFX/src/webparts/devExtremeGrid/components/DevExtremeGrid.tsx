import * as React from 'react';
import styles from './DevExtremeGrid.module.scss';
import { IDevExtremeGridProps } from './IDevExtremeGridProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class DevExtremeGrid extends React.Component<IDevExtremeGridProps, {}> {
  public render(): React.ReactElement<IDevExtremeGridProps> {
    const {
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName
    } = this.props;

    return (
      <div>I will render webpart here...</div>
    );
  }
}
