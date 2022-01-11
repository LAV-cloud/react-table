import Item from './Item';

export default interface Page {
  id: number;
  data: Item[];
  select: boolean;
}
