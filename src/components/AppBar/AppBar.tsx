import { Button, Navbar, Input, Icon } from "keep-react";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import Private_NavLinks from '../../private/components/AppBar/Private_NavLinks';
import Current_Users from '../../private/components/AppBar/Current_Users';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import User_Coins from '../../private/components/AppBar/User_Coins';
import { google_redirect_auth } from '../../firebase/utils/firebase_auth_utils';
import React from 'react';
import { setFilterMode, setFilteredData } from '../../redux/slicer/recipesData_slicer';

const routes = [
	{
		label: 'Home',
		path: '/'
	},
	{
		label: 'Recipes',
		path: '/recipes'
	}
]

const AppBar: React.FC = () => {

	const navigate = useNavigate();

	const { pathname } = useLocation();

	const dispatch = useDispatch();

	const { userData,recipesData } = useSelector((state: RootState) => state);

	const handleSearch = (evt:React.ChangeEvent<HTMLInputElement>) => {

		const fieldVal = evt.currentTarget.value;

		dispatch(setFilterMode(!!fieldVal.length));

		const filteredData = recipesData.data.filter(dt => dt.recipeName.toLowerCase().includes(fieldVal.toLowerCase()));

		dispatch(setFilteredData(filteredData));
	}

	return (
		<Navbar
			fluid={ true }
			bordered
		>
			<Navbar.Container
				className="flex w-full justify-between items-center">
				<Navbar.Container
					className="flex items-center">
					<Navbar.Brand
						className={ `text-heading-5` }
					>
						TastyTales
					</Navbar.Brand>
					<Navbar.Divider></Navbar.Divider>
					<Navbar.Container
						tag="ul"
						className="lg:flex hidden items-center justify-between gap-8"
					>

						{
							routes.map(({ label, path }, idx) => {
								return <Navbar.Link
									key={ idx }
									href={ path }
									className={ `${path === pathname ? '[&>span]:text-primary-500' : '[&>span]:hover:text-primary-500'}` }
									linkName={ label }
								/>
							})
						}

						{
							userData.userAuth
							&&
							<Private_NavLinks currentPath={ pathname } />

						}

					</Navbar.Container>

					<Navbar.Collapse
						collapseType="sidebar"
						className={ `border-l` }
					>
						<Navbar.Container
							tag="ul"
							className="flex flex-col gap-5"

						>
							{
								routes.map(({ label, path }, idx) => {
									return <Navbar.Link
										key={ idx }
										href={ path }
										className={ `${path === pathname ? '[&>span]:text-primary-500' : '[&>span]:hover:text-primary-500'}` }
										linkName={ label }
									/>
								})
							}

							{
								userData.userAuth
								&&
								<Private_NavLinks currentPath={ pathname } />
							}

						</Navbar.Container>
					</Navbar.Collapse>
				</Navbar.Container>

				<Navbar.Container
					className="lg:flex ml-auto mr-5 hidden items-center justify-between gap-4"
				>
					<div className={ `relative ${pathname !== '/recipes' && 'select-none'}` }>
						<Input
							placeholder="Search recipes"
							color="gray"
							type="text"
							disabled={pathname !== '/recipes'}
							className={ `ps-10 focus-visible:ring-0` }
							onChange={pathname !== '/recipes' ? () => null : handleSearch}
						/>
						<Icon>
							<HiOutlineMagnifyingGlass size={ 20 } color="#5E718D" />
						</Icon>
					</div>

					{
						userData.userAuth
						&&
						<div>
							<User_Coins coins={ userData.userAuth.coin } />
						</div>
					}

					<div>
						<div>
							{
								userData.userAuth
									?
									<Current_Users userData={ userData.userAuth } />
									:
									<Button
										onClick={ () => {
											!userData.userAuth && google_redirect_auth()
										} }
										size={ 'sm' }
									>
										Sign In
									</Button>

							}


						</div>
					</div>
				</Navbar.Container>

				<Navbar.Container>
					<Navbar.Toggle />
				</Navbar.Container>
			</Navbar.Container>
		</Navbar>
	);
}

export default AppBar
