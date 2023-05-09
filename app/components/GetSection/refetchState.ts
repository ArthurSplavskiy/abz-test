import { create } from 'zustand';

interface Props {
	refetchIsAvailable: boolean;
	refetchReset: () => void;
	refetchUsers: () => void;
}

export const useUserRefetch = create<Props>((set) => ({
	refetchIsAvailable: false,
	refetchReset: () => set({ refetchIsAvailable: false }),
	refetchUsers: () => set({ refetchIsAvailable: true })
}));
