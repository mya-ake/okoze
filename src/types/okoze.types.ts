export interface OkozeResponse {
  status: number;
  data: any;
  headers: { [key: string]: string };
}

export interface OkozeOptions {
  update: boolean;
  port: number;
  host: string;
  origin: string;
  snapshotDir: string;
}
