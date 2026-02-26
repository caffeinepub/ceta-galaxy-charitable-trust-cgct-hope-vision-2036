import { useMutation } from '@tanstack/react-query';
import { useActor } from './useActor';

export function useSubmitSubscription() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (email: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.submitSubscription(email);
    },
  });
}
