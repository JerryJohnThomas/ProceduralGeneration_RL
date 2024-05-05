import React from 'react';

const MovementButton = ({ direction, onClick }) => {
    // Determine the button text based on the direction
    const buttonText = {
        forward: 'Forward',
        backward: 'Backward',
        left: 'Left',
        right: 'Right',
    }[direction];

    // Handle button click
    const handleClick = () => {
        onClick(direction);
    };

    return (
        <button onClick={handleClick}>
            {buttonText}
        </button>
    );
};

export default MovementButton;
