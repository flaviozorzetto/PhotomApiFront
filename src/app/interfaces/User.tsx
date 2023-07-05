import { Dispatch, SetStateAction } from 'react';

export default interface User {
	bearer: string | undefined;
	setBearer: Dispatch<SetStateAction<string | undefined>>;
}
