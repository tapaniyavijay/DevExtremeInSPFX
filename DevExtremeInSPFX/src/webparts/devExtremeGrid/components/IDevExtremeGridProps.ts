import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IDevExtremeGridProps {
  listName: string;
  listInternalName:string;
  context: WebPartContext;
}
