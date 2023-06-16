import React, { useEffect, useMemo, useState } from 'react';
import { createUseStyles } from 'react-jss';

const styles = createUseStyles({
    myCollibrate:
    {
        display: (props) => props.saved ? 'none' : 'flex',
        justifyContent: 'flex-end',
        flexDirection: 'column',
        alignItems: 'flex-end',
        padding: 10,
        margin: 'auto' 
    },

    myTextarea:
    {
        background: (props) => props.valid ? 'white' : '#D53032',
        width: '97vw',
        height: '80vh',
        resize: 'none',
        border: [2, '#000', 'solid'],
        padding: 10,
        fontFamily: 'Kaushan Script',
        paddingBottom: 20
    },

    mySaved:
    {
        display: (props) => props.saved ? '' : 'none'
    },

    myButtonSave:
    {
        alignSelf: 'center',
        cursor: 'pointer',
        backgroundColor: (props) => props.valid ? 'yellow' : 'white',
        '&:hover':
        {
            backgroundColor: '#4CAF50',
            color: 'white'
        }
    }
});

const Collibrate = () => {
    const [text, setText] = useState('');
    const [isSaved, setIsSaved] = useState(false);

    const bracket_coll = (text_in) => {
        let brackets = "()[]{}<>";
        const stack = [];
        
        if(text_in)
        {
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
        else
        {
            return true;
        }
    }

    const isValid = useMemo(() => bracket_coll(text), [text]);

    const classes = styles({valid: isValid, saved: isSaved});

    const handleSave = () =>
    {
        localStorage.setItem('text', text);

        setIsSaved(true);
    }

    const handleClose = () =>
    {
        setText(localStorage.getItem('text'));

        setIsSaved(false);
    }

    const handleErase = () =>
    {
        setText('');
    }

    useEffect(() => {localStorage.getItem('text') ? setText(localStorage.getItem('text')) : setText('')}, []);

    return (
        <div>
            {isSaved ? (
            <div className={classes.mySaved}>
                <p>Текст успешно сохранен</p>
                <button onClick={handleClose}>Закрыть</button>
            </div>
            ) : (
            <div className={classes.myCollibrate}>
                <textarea className={classes.myTextarea} onChange={(e) => setText(e.target.value)}
                    value={text}
                    placeholder='Type text' />
                <p> {isValid.toString()} </p>
                <button className={classes.myButtonSave} onClick={handleSave} disabled={!isValid}>Сохранить</button>
                <button onClick={handleErase}>Очистить</button>
            </div>
            )}
        </div>
    );
}

export default Collibrate;