const Footer = () => {
	return (
		<footer className="bg-white py-8">
			<div className="container mx-auto flex justify-between items-center">
				<div>
					<p>Connect with me:</p>
					<div className="flex mt-2">
						<a
							href="https://github.com/Safin-Ali/"
							target="_blank"
							rel="noopener noreferrer"
							className="mr-4 hover:text-primary-500 duration-150"
						>
							GitHub
						</a>
						<a
							href="https://www.linkedin.com/in/safin-ali/"
							target="_blank"
							rel="noopener noreferrer"
							className="mr-4 hover:text-primary-500 duration-150"
						>
							LinkedIn
						</a>
						<a
							href="https://safin-ali.vercel.app/"
							target="_blank"
							rel="noopener noreferrer"
							className={`hover:text-primary-500 duration-150`}
						>
							Portfolio
						</a>
					</div>
				</div>
				<div>
					<p className="mb-2">TastyTales - Your Destination for Delicious Recipes and Fresh Ingredients</p>
					<p>© 2024 TastyTales. All rights reserved.</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
