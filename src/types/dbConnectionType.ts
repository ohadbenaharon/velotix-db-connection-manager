export interface DbConnectionType {
  id: string;
  name: string;
  url: string;
  username: string;
  password: number;
  type: dbType;
}

export enum dbType {
  SNOWFLAKE = "Snowflake",
  TRINO = "Trino",
  MYSQL = "MySQL",
}
