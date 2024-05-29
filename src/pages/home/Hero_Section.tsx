import { Button } from 'keep-react';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { google_redirect_auth } from '../../firebase/utils/firebase_auth_utils';
import bgImages from '../../../public/assets/6269761_3227596.webp';
import { RootState } from '../../redux/store';

const Hero_Section: React.FC = () => {

	const { userAuth } = useSelector((state: RootState) => state.userData);

	const navigate = useNavigate();

	return (
		<div className={`h-[calc(100vh-15vh)] relative`}>
			<div className="absolute inset-0 rounded-lg overflow-hidden">
				<img
					src={ bgImages }
					alt="hero_section_banner"
					className="object-cover w-full h-full"
				/>
			</div>

			<div className="relative flex rounded-lg flex-col items-center justify-center h-full bg-black bg-opacity-35 text-white p-6">
				<h1 className="text-5xl font-bold mb-4">Discover Amazing Recipes</h1>
				<p className="text-xl mb-4">Cook with love, serve with passion</p>
				<p className="text-lg mb-8 max-w-2xl text-center">
					Explore a world of culinary delights with our extensive collection of recipes. Whether you're a novice cook or a seasoned chef, you'll find inspiration and guidance to create mouth-watering dishes that will impress your family and friends. Join our community and share your own recipes to inspire others!
				</p>

				<div className="flex gap-6">
					<Button
						onClick={ () => navigate('/recipes') }
					>
						See recipes
					</Button>
					<Button
						onClick={ () => {
							if (!userAuth) {
								google_redirect_auth()
								return
							}

							navigate('/addRecipe')
						} }
					>
						Add recipes
					</Button>
				</div>
			</div>
		</div>
	);
}

export default Hero_Section;