import {Helmet} from 'react-helmet-async';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AuthorizationStatus } from '../../const';
import { Link, Navigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { FormEvent, useRef } from 'react';
import { logIn } from '../../store/api-actions';

function LoginPage(): JSX.Element {
	const loginRef = useRef<null | HTMLInputElement>(null);
	const passwordRef = useRef<null | HTMLInputElement>(null);

	const authStatus = useAppSelector((state) => state.authorizationStatus);
	const dispatch = useAppDispatch();
	const handleSubmitForm = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if(loginRef.current !== null && passwordRef.current !== null) {
			dispatch(logIn({
				login: loginRef.current.value,
				password: passwordRef.current.value
			}));
		}
	};

	return (
		authStatus !== AuthorizationStatus.Auth ?
			<div className="page page--gray page--login">
				<Helmet><title>6 cities. Login</title></Helmet>
				<header className="header">
					<div className="container">
						<div className="header__wrapper">
							<div className="header__left">
								<Link className="header__logo-link" to={AppRoute.Main}>
									<img
										className="header__logo"
										src="img/logo.svg"
										alt="6 cities logo"
										width={81}
										height={41}
									/>
								</Link>
							</div>
						</div>
					</div>
				</header>
				<main className="page__main page__main--login">
					<div className="page__login-container container">
						<section className="login">
							<h1 className="login__title">Sign in</h1>
							<form onSubmit={handleSubmitForm} className="login__form form" action="#" method="post">
								<div className="login__input-wrapper form__input-wrapper">
									<label className="visually-hidden">E-mail</label>
									<input
										ref={loginRef}
										className="login__input form__input"
										type="email"
										name="email"
										placeholder="Email"
										required
									/>
								</div>
								<div className="login__input-wrapper form__input-wrapper">
									<label className="visually-hidden">Password</label>
									<input
										ref={passwordRef}
										className="login__input form__input"
										type="password"
										name="password"
										placeholder="Password"
										required
									/>
								</div>
								<button className="login__submit form__submit button" type="submit">
									Sign in
								</button>
							</form>
						</section>
						<section className="locations locations--login locations--current">
							<div className="locations__item">
								<a className="locations__item-link" href="#">
									<span>Amsterdam</span>
								</a>
							</div>
						</section>
					</div>
				</main>
			</div>
			: <Navigate to={AppRoute.Main}/>);
}
export default LoginPage;
