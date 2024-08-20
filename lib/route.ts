export const AppRoutes = {
	HOME: '/',
	CREATE: '/create',
    MANAGE: '/manage',
    PROFILE: '/profile',
    REVIEW: '/review',
	SUBSCRIPTION: '/subscription',
} as const;


export type CardifyRoute = (typeof AppRoutes)[keyof typeof AppRoutes];

export const ProtectedRoutes: CardifyRoute[] = [AppRoutes.CREATE, AppRoutes.MANAGE, AppRoutes.PROFILE, AppRoutes.SUBSCRIPTION];


