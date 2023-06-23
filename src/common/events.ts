export type Event = {
  uuid: string;
  name: string;
};

export type EventDay = {
  uuid: string;
  event_uuid: string;
  date: number;
};
