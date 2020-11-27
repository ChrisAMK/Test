import React from "react";

// This function is rendered when the user enters an incorrect URL
function FourOhFour() {
    return(
        <div className="noMatch" >
            <h1>404 Page Not Found</h1>
            <h1>
            <span role="img" aria-label="Face With Rolling Eyes Emoji">
                🙄
            </span>
            </h1>
        </div>
    )
}

export default FourOhFour;