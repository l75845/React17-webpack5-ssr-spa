declare interface IContentState {
  id?: number;
  name?: string;
  type?: string;
  content?: unknown;
}

declare interface Window {
  __INITIAL__DATA__?: IContentState;
}
