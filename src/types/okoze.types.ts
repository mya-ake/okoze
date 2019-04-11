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

export interface OkozeCliOptions extends OkozeOptions {
  config: string;
}

export interface OkozeEnvOptions {
  port?: number;
  host?: string;
  origin?: string;
  snapshotDir?: string;
}
