import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';

let styleVariables = {
    styleCollibrate: { display: '' },
    styleArea: { background: '#fff' },
    styleSaved: { display: 'none' },
    styleButton: { backgroundColor: 'white' }
}

const styles = createUseStyles({
    myCollibrate:
    {
        display: (props) => props[0].display,
    },
    myTextarea:
    {
        background: (props) => props[1].background,
        width: '70%',
        height: '800px',
        resize: 'none',
        border: [2, '#000', 'solid'],
        padding: 10,
        fontFamily: 'Kaushan Script'
    },
    mySaved:
    {
        display: (props) => props[2].display
    },
    myButton:
    {
        backgroundColor: (props) => props[3].backgroundColor,
        '&:hover':
        {
            backgroundColor: '#4CAF50',
            color: 'white'
        }
    },
});

const Collibrate = (props) => {
    const [text, setText] = useState('');
    const [isValid, setIsValid] = useState(true);
    const [isSaved, setIsSaved] = useState(false);

    const classes = styles([styleVariables.styleCollibrate, styleVariables.styleArea, styleVariables.styleSaved, styleVariables.styleButton]);

    const bracket_coll = (text_in) => {
        let brackets = "()[]{}<>";
        const stack = [];

        for (let char of text_in) {
            let is_bracket = brackets.indexOf(char);
            if (is_bracket >= 0) {
                if (is_bracket % 2 !== 0) {
                    if (stack.lenght === 0) return false; 

                    let last_element = stack.pop();
                    if (last_element !== is_bracket - 1) {
                        return false;
                    }
                }
                else {
                    stack.push(is_bracket);
                }
            }
        }

        if (stack.length === 0) return true;
        else return false;
    }

    const changeText = (e) => {
        setText(e.target.value);

        let isValidIn = bracket_coll(e.target.value);

        setIsValid(isValidIn);

        if(isValidIn === false) 
        {
            styleVariables.styleArea = {background: '#D53032'};
            styleVariables.styleButton = {backgroundColor: 'white'};
        }
        else 
        {
            styleVariables.styleArea = {background: '#fff'};
            styleVariables.styleButton = {backgroundColor: 'yellow'}
        }
    }

    const handleSave = () =>
    {
        styleVariables.styleSaved = {display: ''};
        styleVariables.styleCollibrate = {display: 'none'};
        localStorage.setItem('text', text);
        styleVariables.styleButton = {backgroundColor: 'red'};
        setIsSaved(true);
    }

    const handleClose = () =>
    {
        styleVariables.styleSaved = {display: 'none'};
        styleVariables.styleCollibrate = {display: ''};
        setText(localStorage.getItem('text'));
        styleVariables.styleButton = {backgroundColor: 'yellow'};
        setIsSaved(false);
    }

    const handleErase = () =>
    {
        setText('');
    }

    window.onload = function() {setText(localStorage.getItem('text'))};

    return (
        <div>
            {isSaved ? (
            <div className={classes.mySaved}>
                <p>Текст успешно сохранен</p>
                <button onClick={handleClose}>Закрыть</button>
            </div>
            ) : (
            <div className={classes.myCollibrate}>
                <textarea className={classes.myTextarea} onChange={changeText}
                    value={text}
                    placeholder='Type text' />
                <p> {isValid.toString()} </p>
                <button className={classes.myButton} onClick={handleSave} disabled={!isValid}>Сохранить</button>
                <button onClick={handleErase}>Очистить</button>
            </div>
            )}
        </div>
    );
}

export default Collibrate;