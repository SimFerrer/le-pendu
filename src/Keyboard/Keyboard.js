import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'reactstrap';

import './Keyboard.css'

const Keyboard=({letter,feedback,onClick,gameState})=>(
    <div className={`letterr`} >
        <Button className="symbol" onClick={() => onClick(letter)} disabled= {feedback === 'visible' || gameState!='en cours'  ? true : false}>
           {letter}
        </Button>
    </div>
)


Keyboard.propTypes = {
    letter: PropTypes.string.isRequired,
    feedback: PropTypes.oneOf([
        'hidden',
        'visible'
    ]).isRequired,
    onClick: PropTypes.func.isRequired,
}
export default Keyboard