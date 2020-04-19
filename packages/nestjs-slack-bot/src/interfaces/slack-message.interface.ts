export interface SlackMessage {
  type: string;
  text: string;
  event_ts: string;
  ts: string;
  suppress_notification: false;

  // ids:
  channel: string;
  team: string;
  user: string;
}
