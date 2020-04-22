export interface SlackMessage {
  event_ts: string;
  subtype: string;
  suppress_notification: false;
  text: string;
  ts: string;
  type: string;

  // ids:
  channel: string;
  team: string;
  user: string;
}
