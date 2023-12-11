import {showNotification} from '@mantine/notifications';
import {useGoogleOneTapLogin} from '@react-oauth/google';
import {useQuery, useMutation} from '@tanstack/react-query';
import {API, DEFAULT_STALE_TIME, QueryKey} from '~/constants/service';
import {usePersistStore, useStorage} from '~/store';
import {defaultUserInfo} from '~/store/userStore';
import type {ResponseData, UserInfo} from '~/types';
import {ErrorCode} from '~/types/notification';
import {findNotiConfig} from '~/util';
import {http} from '~/util/http';

type LoginPayload = {
  credential: string;
};

type LoginResData = ResponseData<{
  refresh: string;
  access: string;
  user: {
    id: number;
    email: string;
    name: string;
    avatar: string;
  };
}>;

type UseAuthOptions = {
  /** @default true */
  fetchUserInfoOnMount?: boolean;
  /**
   * Enable Google One-tap login
   *
   * Will be ignored if user is already authenticated.
   * @default false
   */
  enableOneTapLogin?: boolean;
  /**
   * This attribute sets the DOM ID of the container element.
   *
   * If it's not set, the One Tap prompt is displayed in the top-right corner of the window.
   * @default undefined
   */
  promptParentId?: string;
};

export default function useAuth(
  {enableOneTapLogin = false, fetchUserInfoOnMount = true, promptParentId}: UseAuthOptions = {
    fetchUserInfoOnMount: true,
  },
) {
  const {isAuthenticated, setToken} = usePersistStore();
  const setUserInfo = useStorage((state) => state.setUserInfo);

  const {
    data: userInfo = defaultUserInfo,
    isLoading: isLoadingUserInfo,
    refetch,
  } = useQuery({
    queryKey: [QueryKey.USER_INFO],
    queryFn: () => http.get<ResponseData<UserInfo>>(API.USER_INFO),
    select: ({body}) => {
      setUserInfo(body);
      return body;
    },
    staleTime: DEFAULT_STALE_TIME,
    enabled: isAuthenticated && fetchUserInfoOnMount,
  });

  const {mutate: loginMutate} = useMutation({
    mutationFn: (payload: LoginPayload) => http.post<LoginResData>(API.LOGIN, payload),
    onSuccess: async ({body}) => {
      setToken({accessToken: body.access, refreshToken: body.refresh});
      await refetch();
    },
  });

  useGoogleOneTapLogin({
    onSuccess: ({credential}) => {
      if (!credential) {
        showNotification(findNotiConfig(ErrorCode.ERR_UNAUTHORIZED));
        return;
      }

      loginMutate({credential});
    },
    onError: () => showNotification(findNotiConfig(ErrorCode.ERR_UNAUTHORIZED)),
    prompt_parent_id: promptParentId,
    auto_select: true,
    disabled: isAuthenticated || !enableOneTapLogin,
  });

  return {loginMutate, userInfo, isLoadingUserInfo, refetchUserInfo: refetch};
}
