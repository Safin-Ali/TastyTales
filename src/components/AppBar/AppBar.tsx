import { Button, Navbar, Input, Icon } from "keep-react";
import { PiGoogleLogo } from "react-icons/pi";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import Private_NavLinks from '../../private/components/AppBar/Private_NavLinks';
import Current_Users from '../../private/components/AppBar/Current_Users';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import User_Coins from '../../private/components/AppBar/User_Coins';

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

	const { pathname } = useLocation();

	const { userAuth } = useSelector((state: RootState) => state.userData)

	return (
		<Navbar
			fluid={ true }
			bordered
		>
			<Navbar.Container className="flex w-full justify-between items-center">
				<Navbar.Container className="flex items-center">
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
							routes.map(({ label, path }) => {
								return <Navbar.Link
									href={ path }
									className={ `${path === pathname ? '[&>span]:text-primary-500' : '[&>span]:hover:text-primary-500'}` }
									linkName={ label }
								/>
							})
						}

						{
							userAuth
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
								routes.map(({ label, path }) => {
									return <Navbar.Link
										href={ path }
										className={ `${path === pathname ? '[&>span]:text-primary-500' : '[&>span]:hover:text-primary-500'}` }
										linkName={ label }
									/>
								})
							}

							{
								userAuth
								&&
								<Private_NavLinks currentPath={ pathname } />
							}

						</Navbar.Container>
					</Navbar.Collapse>
				</Navbar.Container>

				<Navbar.Container
					className="lg:flex ml-auto mr-5 hidden items-center justify-between gap-4"
				>
					<div className={ `relative` }>
						<Input
							placeholder="Search recipes"
							color="gray"
							type="text"
							className={ `ps-10 focus-visible:ring-0` }
						/>
						<Icon>
							<HiOutlineMagnifyingGlass size={ 20 } color="#5E718D" />
						</Icon>
					</div>

					{
						userAuth
						&&
						<div>
							<User_Coins coins={ 10 } />
						</div>
					}

					<div>
						<button>
							{
								userAuth
									?
									<Current_Users />
									:
									<Button
										size={ 'sm' }
									>
										Sign In
									</Button>

							}


						</button>
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
