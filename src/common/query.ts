export type IQueryType = 'all' | 'run';

export type IParameterType = (string | number)[];

export type IRunQuery = {
  type: IQueryType;
  query: string;
  parameters: IParameterType;
};
