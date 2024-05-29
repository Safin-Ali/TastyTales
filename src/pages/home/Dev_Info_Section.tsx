import React from 'react';

const Dev_Info_Section: React.FC = () => {
	return (
		<div className={ `pb-8` }>
			<h2 className="text-4xl font-bold mb-12 text-center">
				Developer Information
			</h2>

			<div className="grid grid-cols-2 w-4/5 mx-auto gap-10">

				{/* Introduction Section */ }
				<div className="flex flex-col space-y-4">
					<h3 className="text-lg font-medium mb-1">Introduction</h3>
					<p className="text-base leading-relaxed">
						Welcome to TastyTales! I'm <strong>Safin Ali</strong>, a MERN stack developer and the creator of this platform for sharing recipes and purchasing ingredients. TastyTales offers a seamless experience, blending my passion for software development with culinary exploration. Join me in discovering a world of flavors, one dish at a time!
					</p>
				</div>

				{/* Educational Background Section */ }
				<div className="flex flex-col space-y-4">
					<h3 className="text-lg font-medium mb-1">Educational Background</h3>
					<p className="text-base leading-relaxed">
						I pursued Digital Technology in Business at Bera Govt Degree College, achieving a GPA of 4.50. While I haven't completed my degree, my college education provided me with valuable insights into the intersection of technology and business.
					</p>
				</div>

				{/* Experience Section */ }
				<div className="flex flex-col space-y-4">
					<h3 className="text-lg font-medium mb-1">Experience</h3>
					<p className="text-base leading-relaxed">
						Despite lacking formal professional experience, I have dedicated over 2 years to self-learning and coding. During this time, I have undertaken various projects, honing my skills in frontend and backend development.
					</p>
				</div>

				{/* Technology Section */ }
				<div className="flex flex-col space-y-4">
					<h3 className="text-lg font-medium mb-1">Technology</h3>
					<div className="flex flex-wrap gap-2">
						<span className="inline-block bg-gray-200 px-2 py-1 rounded text-sm font-medium text-gray-700">
							TypeScript
						</span>
						<span className="inline-block bg-gray-200 px-2 py-1 rounded text-sm font-medium text-gray-700">
							Next.js
						</span>
						<span className="inline-block bg-gray-200 px-2 py-1 rounded text-sm font-medium text-gray-700">
							Node.js
						</span>
						<span className="inline-block bg-gray-200 px-2 py-1 rounded text-sm font-medium text-gray-700">
							Redux
						</span>
						<span className="inline-block bg-gray-200 px-2 py-1 rounded text-sm font-medium text-gray-700">
							MongoDB
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Dev_Info_Section;
