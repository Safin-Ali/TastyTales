import Dev_Info_Section from './Dev_Info_Section';
import Hero_Section from './Hero_Section';
import Why_TastyTales_Section from './Why_TastyTales_Section';


const Home: React.FC = () => {

	return (
		<section className={`space-y-8`}>
			<Hero_Section/>
			<Why_TastyTales_Section/>
			<Dev_Info_Section/>
		</section>
	);
}

export default Home;
