export interface NextTickOptions {
  callback: (...args: any[]) => void;
  duration: number;
  before: () => void;
  after: () => void;
}