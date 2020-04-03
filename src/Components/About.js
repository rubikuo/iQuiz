import React from 'react';
import { Helmet } from 'react-helmet';
import './styles/About.scss';

const About = () => {
	return (
		<main className="about">
			<Helmet>
				<title>About iQuiz</title>
			</Helmet>
			<div className="about__circle" />
			<article className="about__article">
				<p className="about__article--content">
					<span className="about__article--textDeco">iQuiz</span> is created with ReactJS and developed based
					on Open Triva DB API. Application is built on UX concepts and is implemented with WAI-ARIA for
					increasing web accessibility to disabilities.{' '}
				</p>
				<p>
					Website's SVG background image as well as Logo icon created in Illustrator are original.
					Images/Icons in the home page and quiz page are licensed and contributed from sources as below:<br />
					Icon made by <a className="about__article--link" href="https://www.flaticon.com/authors/freepik">Freepik</a>  from <a className="about__article--link"  href="www.flaticon.com"> www.flaticon.com</a> <br />
					Icon made by <a className="about__article--link" href="https://www.flaticon.com/authors/smashicons"> Smashicons</a> from <a className="about__article--link"  href="www.flaticon.com"> www.flaticon.com</a>
				</p>
			</article>
		</main>
	);
};

export default About;
