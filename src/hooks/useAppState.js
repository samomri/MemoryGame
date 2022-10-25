import { useState,useEffect, useReducer } from "react";
import shuffle from "../utilities/shuffle";
import useAppBadge from "./useAppBadge";

function playerCounterReducer (state, action) {
    if(action.type === 'end'){
        return state + (action.counter) 
    }
    return state - (action.counter)
}
function scoreArrayReducer (state, action) {
    if(action.type === 'add'){
        return [...state, {counter: action.score.counter,wins: action.score.wins}] 
    }
    return state
}

const useAppState = () => {
    
    const [wins, setWins] = useState(0); // Win streak
    const [cards, setCards] = useState(shuffle); // Cards array from assets
    const [pickOne, setPickOne] = useState(null); // First selection
    const [pickTwo, setPickTwo] = useState(null); // Second selection
    const [disabled, setDisabled] = useState(false); // Delay handler
    const [setBadge, clearBadge] = useAppBadge(); // Handles app badge
    const [counter, setCounter] = useState(0);//Click counter
    const [start,setStart] = useState(true)//initial card states
    const [playerCounter, setPlayerCounter] = useReducer(playerCounterReducer,0)
    const [scoreArray, setScoreArray] =useReducer(scoreArrayReducer,[])

    // Handle card selection
    const handleClick = (card) => {
    if (!disabled) {
        setCounter(counter+1);
        pickOne ? setPickTwo(card) : setPickOne(card);
    }
    };

    const handleTurn = () => {
    setPickOne(null);
    setPickTwo(null);
    setDisabled(false);
    };

    // Start over
    const handleNewGame = () => {
    clearBadge();
    handleTurn();
    setCards(shuffle);
    setCounter(0);
    setStart(true)
    };

    useEffect(() => {
    let startTimer
    if (start) {
        // Prevent selections until after delay
        setDisabled(true);
        // Add delay for snapshot before the game starts
        startTimer = setTimeout(() => {
        setStart(false)
        setDisabled(false)
        }, 2000);
    }
    return () => {
        clearTimeout(startTimer);
    }; 
    },[start])
    // Used for selection and match handling
    useEffect(() => {
    let pickTimer;

    // Two cards have been clicked
    if (pickOne && pickTwo) {
        // Check if the cards the same
        if (pickOne.image === pickTwo.image) {
        setCards((prevCards) => {
            return prevCards.map((card) => {
            if (card.image === pickOne.image) {
                // Update card property to reflect match
                return { ...card, matched: true };
            } else {
                // No match
                return card;
            }
            });
        });
        handleTurn();
        } else {
        // Prevent new selections until after delay
        setDisabled(true);
        // Add delay between selections
        pickTimer = setTimeout(() => {
            handleTurn();
        }, 1000);
        }
    }

    return () => {
        clearTimeout(pickTimer);
    };
    }, [cards, pickOne, pickTwo, setBadge, wins]);


    // If player has found all matches, handle accordingly
    useEffect(() => {
    // Check for any remaining card matches
    const checkWin = cards.filter((card) => !card.matched);

    // All matches made, handle win/badge counters
    if (cards.length && checkWin.length < 1) {
        console.log('You win!');
        setWins(wins + 1);
        setBadge();
        handleTurn();
        setPlayerCounter({counter,type:'end'})
        setScoreArray({type: 'add',score: {counter:counter,wins:wins+1}})
        setCards(shuffle);
        setCounter(0);
    }
    }, [cards, setBadge, wins,counter,scoreArray,playerCounter]);

    return {handleClick,handleNewGame,handleTurn,wins,cards,pickOne,pickTwo,disabled,counter,start,scoreArray,setWins}
}
export default useAppState