import CountUp from 'react-countup';

const Why_TastyTales_Section = () => {
	return (
		<div className="py-16">
			<div className="px-8 text-center">
				<h2 className="text-4xl font-bold mb-12">Why Choose TastyTales?</h2>
				<div className="grid grid-cols-4 gap-8 text-left">
					<div className="p-8 rounded-lg border">
						<h3 className="text-2xl font-semibold mb-4">Discover New Recipes</h3>
						<p className="mb-4">
							Discover thousands of unique recipes, shared by culinary enthusiasts like you.
						</p>
					</div>
					<div className="p-8 rounded-lg border">
						<h3 className="text-2xl font-semibold mb-4">Join Our Community</h3>
						<p className="mb-4">
							Join a vibrant community of food lovers and share your own culinary creations.
						</p>
					</div>
					<div className="p-8 rounded-lg border">
						<h3 className="text-2xl font-semibold mb-4">Save Your Favorites</h3>
						<p className="mb-4">
							Save your favorite recipes and create a personalized cookbook.
						</p>
					</div>
					<div className="p-8 rounded-lg border">
						<h3 className="text-2xl font-semibold mb-4">Daily Inspiration</h3>
						<p className="mb-4">
							Get inspired with new recipes every day and elevate your cooking skills.
						</p>
					</div>
				</div>
				<div className="mt-10 flex justify-center space-x-8">
					<div className="p-8 rounded-lg border text-center">
						<h3 className="text-2xl font-semibold mb-4">Recipes Available</h3>
						<CountUp end={ 5000 } duration={ 3 } className="text-4xl font-bold" /> {/* Adjust the end value to the actual count */ }
					</div>
					<div className="p-8 rounded-lg border text-center">
						<h3 className="text-2xl font-semibold mb-4">Happy Users</h3>
						<CountUp end={ 2000 } duration={ 3 } className="text-4xl font-bold" /> {/* Adjust the end value to the actual count */ }
					</div>
				</div>
			</div>
		</div>
	);
};

export default Why_TastyTales_Section;
