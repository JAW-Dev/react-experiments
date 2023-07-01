import { useQuery } from 'react-query';
import { fetchNote } from './apiCalls';

const getCurrentBehaviorNote = (behavior) => {
  const { data } = useQuery(['currentNote', { behavior_id: behavior.id }], fetchNote);

  return data?.notes[0];
};

export default getCurrentBehaviorNote;
