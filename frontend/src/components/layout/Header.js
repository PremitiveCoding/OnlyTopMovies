import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { logout } from "../../actions/userActions";

import "../../App.css";

const Header = () => {
	const alert = useAlert();
	const dispatch = useDispatch();

	const { isAuthenticated, user } = useSelector((state) => state.auth);

	const logoutHandler = () => {
		dispatch(logout());
		alert.success("Logged out successfully.");
	};

	return (
		<Fragment>
			<header
				className="header-1"
				style={{ backgroundColor: "#e3e1e1", padding: "0" }}
			>
				<div className="container-fluid">
					<div
						className="row"
						style={{ justifyContent: "space-between !important" }}
					>
						<div className=" col-lg-5 col-md-5 col-sm-2 col-8 d-flex align-items-center">
							<nav className="main-nav d-none d-lg-block">
								<ul className="d-flex align-items-center">
									<li className="menu-item">
										<Link to="/" className="menu-link">
											ICinema
										</Link>
									</li>
								</ul>
							</nav>
							<nav className="main-nav d-block d-lg-none">
								<ul className="d-flex align-items-center">
									<Link to="/" className="menu-link">
										ICinema
									</Link>
									{user ? (
										<>
											<li className="menu-item">
												<a href="#" className="menu-link">
													Menu
												</a>
												<ul className="submenu-home1">
													{user && user.role !== "admin" ? (
														<></>
													) : (
														<li>
															<Link to="/dashboard">Dashboard</Link>
														</li>
													)}

													<li>
														<Link to="/me">Profile</Link>
													</li>
													<li>
														<Link to="/" onClick={logoutHandler}>
															Logout
														</Link>
													</li>
												</ul>
											</li>
										</>
									) : (
										<>
											<li className="menu-item">
												<Link to="/login">
													<i className="las la-user"></i>
												</Link>
											</li>
										</>
									)}
								</ul>
							</nav>
						</div>
						<div class="col-lg-2 col-md-2 col-sm-2 col-4">
							<Link to="/" class="header-1-logo text-center">
								<img src="/images/logo.png" alt="" width="60%" />
							</Link>
						</div>
						<div className=" col-lg-5 col-md-5 col-sm-8 d-sm-block d-none">
							<div className="header-right-area d-flex justify-content-end align-items-center">
								<div className="header-1-icons">
									<ul className="d-flex">
										{isAuthenticated ? (
											<>
												<li>
													<nav className="main-nav d-none d-lg-block">
														<ul className="d-flex align-items-center">
															<li className="menu-item">
																<figure className="avatar avatar-nav">
																	<img
																		src={user.avatar && user.avatar.url}
																		alt={user && user.name}
																		className="rounded-circle"
																	/>
																</figure>
																<Link to="" className="menu-link ">
																	{user.name}
																	<svg
																		xmlns="http://www.w3.org/2000/svg"
																		width="16"
																		height="16"
																		fill="currentColor"
																		className="bi bi-caret-down-fill"
																		viewBox="0 0 16 16"
																	>
																		<path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
																	</svg>
																</Link>
																<ul className="submenu-home1">
																	{user && user.role !== "admin" ? (
																		<></>
																	) : (
																		<li>
																			<Link to="/dashboard">Dashboard</Link>
																		</li>
																	)}

																	<li>
																		<Link to="/me">Profile</Link>
																	</li>
																	<Link
																		to="/"
																		className="text-danger"
																		onClick={logoutHandler}
																	>
																		Logout
																	</Link>
																</ul>
															</li>
														</ul>
													</nav>
												</li>
											</>
										) : (
											<li>
												<Link to="/login">
													<i className="fa fa-user mt-3"></i>
												</Link>
											</li>
										)}
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</header>
		</Fragment>
	);
};

export default Header;
