import { useAuth } from '@utils/useAuth';
import { useEffect } from 'react';
import { useEnsAvatar, useEnsName } from 'wagmi';

export const useENS = () => {
    const { state, address } = useAuth();

    const {
        data: Name,
        isError: NameIsError,
        isLoading: NameIsLoading,
        isSuccess: NameIsSuccess,
    } = useEnsName({
        address,
    });

    const {
        data: Avatar,
        isError: AvatarIsError,
        isLoading: AvatarIsLoading,
        isSuccess: AvatarIsSuccess,
    } = useEnsAvatar({
        addressOrName: Name || address,
    });

    useEffect(() => {
        console.log({ Avatar });
    }, [Avatar]);

    useEffect(() => {
        console.log({ Name });
    }, [Name]);

    return {
        NameIsError,
        NameIsLoading,
        NameIsSuccess,
        Name,
        AvatarIsError,
        AvatarIsLoading,
        AvatarIsSuccess,
        Avatar,
    };
};
