import React from 'react';
import './App.css';

const Logo = ({className, width, height}) => {
	return (
		<svg
			version="1.1"
			id="Layer_1"
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			x="0px"
			y="0px"
			width={width}
			height={height}
			viewBox="0 0 288 144"
			enableBackground="new 0 0 288 144"
			xmlSpace="preserve"
			className={className}
		>
			<font horizAdvX="2048">
				<font-face
					fontFamily="LOVELYHEART"
					unitsPerEm="2048"
					underlinePosition="-217"
					underlineThickness="150"
				/>
				<missing-glyph horizAdvX="30" />
				<glyph
					unicode="Q"
					horizAdvX="1458"
					d="M683,1430l0,0l0,0C494,1430 333,1361 200,1224C67,1086 0,920 0,725C0,530 67,364 200,227C333,89 494,20 683,20C747,20 809,29 868,46l54,-123l506,144l-219,210C1313,406 1365,555 1365,725C1365,920 1298,1086 1165,1224C1032,1361 871,1430 683,1430M674,806C695,859 736,886 799,886C833,886 862,876 887,855C911,834 923,809 923,780C923,727 898,673 847,620C796,567 739,514 674,461C609,514 552,567 501,620C450,673 425,727 425,780C425,809 437,834 462,855C486,876 515,886 549,886C612,886 653,859 674,806l0,0z"
				/>
				<glyph
					unicode="i"
					horizAdvX="456"
					d="M32,782l0,0l91,-816l204,11l68,844M214,1101l0,0l0,0C201,1121 187,1136 172,1147C157,1157 136,1162 110,1163C79,1163 54,1156 34,1142C13,1128 2,1110 0,1088C1,1048 21,1008 62,967C103,926 150,886 203,845C260,883 311,921 355,959C398,997 422,1036 425,1075C426,1097 416,1116 397,1131C377,1146 352,1155 322,1156C296,1157 275,1153 259,1144C242,1135 227,1120 214,1101z"
				/>
				<glyph
					unicode="u"
					horizAdvX="973"
					d="M419,1060l0,0l0,0C419,1060 420,1033 423,979C425,925 430,859 437,782C444,704 453,627 466,552C479,477 496,415 517,368C538,321 563,301 594,308C631,323 655,362 665,426C674,490 676,562 670,641C663,720 655,789 645,849C635,908 630,938 630,938l236,33l77,-934l-218,-61l-13,146l-148,-132C439,-41 340,-34 265,13C190,60 133,128 95,217C57,306 32,398 19,494C6,589 1,671 2,740C3,809 3,843 3,843z"
				/>
				<glyph
					unicode="z"
					horizAdvX="961"
					d="M109,994l0,0l808,23l-284,-543l171,5l-145,-190l-123,0l-53,-102l448,19l-177,-197l-593,-34l163,313l-142,-1l115,178l121,4l71,137l-489,-28z"
				/>
			</font>

			<text
				transform="matrix(1.0138 0 0 1 45.4888 102.1191)"
				fill="#484C4C"
				fontFamily="'LOVELYHEART'"
				fontSize="93.8924"
			>
				iQuiz
			</text>
			<text
				transform="matrix(1.0138 0 0 1 45.4888 100.2725)"
				fill="#20A8BA"
				fontFamily="'LOVELYHEART'"
				fontSize="93.8924"
			>
				iQuiz
			</text>
		</svg>
	);
};

Logo.defaultProps = {
	width: 288,
    height: 144,
	className: 'logo',
};


export default Logo;
