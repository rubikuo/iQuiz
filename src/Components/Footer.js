import React from 'react';
import "../App.css";


const Footer =() =>{
    return(
        <footer>
            <p>&copy; iQuiz developed by Ju-I Kuo || April 2020</p>
        </footer>
    )

}

const MemoFooter = React.memo(Footer)

export default MemoFooter;