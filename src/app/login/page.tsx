'use client';
import { FormEvent, useContext, useState } from 'react';
import Cookies from 'js-cookie';
import Header from '../components/Header';
import { useRouter } from 'next/navigation';
import jwtDecode from 'jwt-decode';
import { LoginApiResponse } from '../interfaces/LoginApiResponse';
import { CurrentUserContext } from '../components/UserContext';

export default function Page() {
	const [name, setName] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const [hasError, setHasError] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string>('');

	const router = useRouter();

	async function submitHandler(event: FormEvent) {
		event.preventDefault();
		setHasError(false);
		setErrorMessage('');
		if (name == '') {
			setHasError(true);
			setErrorMessage('Preencha o nome no formulario');
			return;
		}
		if (password == '') {
			setHasError(true);
			setErrorMessage('Preencha a senha no formulario');
			return;
		}

		const user = JSON.stringify({ clientID: name, clientSecret: password });

		const res = await fetch(`${process.env.NEXT_PUBLIC_PHOTOM_API_URL}/login`, {
			method: 'POST',
			body: user,
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (res.status != 200) {
			setHasError(true);
			if (res.status == 404 || res.status == 400) {
				setErrorMessage('Credencial inválida');
			} else {
				setErrorMessage('Erro no servidor');
			}
			return;
		}

		const bearerToken = await res.text();
		const obj: LoginApiResponse = jwtDecode(bearerToken);
		const dateInMsToExpire = obj.exp * 1000;

		Cookies.set('bearer', bearerToken, { expires: new Date(dateInMsToExpire) });

		router.push('/home');
	}

	return (
		<>
			<Header />
			<main className="h-full pt-20 bg-home">
				<section className="h-full flex items-center justify-center">
					<div className="bg-purple-200 py-8 px-4 rounded-md border-gray-800 border-[1px] shadow-md">
						<form
							className="flex items-center flex-col gap-4"
							onSubmit={submitHandler}
						>
							<div className="flex flex-col gap-2">
								<label htmlFor="name">Nome</label>
								<input
									id="name"
									type="text"
									value={name}
									className="border border-black focus:outline-black"
									onChange={event => {
										setName(event.target.value);
									}}
								/>
							</div>
							<div className="flex flex-col gap-2">
								<label htmlFor="password">Senha</label>
								<input
									id="password"
									type="password"
									value={password}
									className="border border-black focus:outline-black"
									onChange={event => {
										setPassword(event.target.value);
									}}
								/>
							</div>
							{hasError && <p className="text-red-600">{errorMessage}</p>}
							<button
								className="bg-white py-2 px-4 rounded-md mt-4 border border-black focus:outline-black"
								type="submit"
							>
								Logar
							</button>
						</form>
					</div>
				</section>
			</main>
		</>
	);
}
