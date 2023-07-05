'use client';

import { createContext, useState } from 'react';
import User from '../interfaces/User';
export const CurrentUserContext = createContext<User | undefined>(undefined);

export default function UserContext({
	children,
}: {
	children: React.ReactNode;
}) {
	const [bearer, setBearer] = useState<string | undefined>(undefined);
	const user: User = {
		bearer,
		setBearer,
	};
	return (
		<>
			<CurrentUserContext.Provider value={user}>
				{children}
			</CurrentUserContext.Provider>
		</>
	);
}
