import cors from 'cors';

export default function () {
  return [cors({ origin: true, credentials: true })];
}
