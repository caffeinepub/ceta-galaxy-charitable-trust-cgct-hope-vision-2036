import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { ExternalBlob, type NewPhoto, type UserProfile, UserRole } from '../backend';

export function useSubmitSubscription() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (email: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.submitSubscription(email);
    },
  });
}

// Gallery hooks
export function useGetAllPhotos() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<NewPhoto[]>({
    queryKey: ['allPhotos'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllPhotos();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useUploadPhoto() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ blob, caption }: { blob: ExternalBlob; caption: string | null }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.uploadPhoto(blob, caption);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allPhotos'] });
    },
  });
}

export function useDeletePhoto() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deletePhoto(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allPhotos'] });
    },
  });
}

export function useGetCallerUserRole() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<UserRole>({
    queryKey: ['callerUserRole'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserRole();
    },
    enabled: !!actor && !actorFetching,
  });
}

// Profile hooks
export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}
