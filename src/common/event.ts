import { EVENT_NAME } from './stateEvent';

interface IEvent {
  name: EVENT_NAME;
  data: object;
}

// TODO здесь хочется прописать интерфейсы полезной нагрузки, передаваемых каждым event'ом

export { IEvent };
