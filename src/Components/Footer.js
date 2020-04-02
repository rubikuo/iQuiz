import React from 'react';
import "../App.css";


const Footer =() =>{
    return(
        <footer>
            <p>&copy; Ju-I Kuo || April 2020</p>
        </footer>
    )

}

const MemoFooter = React.memo(Footer)

export default MemoFooter;