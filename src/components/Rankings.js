import { db } from '../utilities/firestore';
import { collection, getDocs } from "firebase/firestore"; 
import { useEffect, useState } from 'react';

//Component
const Rankings = () => {
    const [data,setData] = useState([]);
    let rankig =[];

    const fetchData = async() => {
        const docSnap = await getDocs(collection(db, "players"))
        docSnap.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data().wins);
            rankig.push({player: doc.id,wins: doc.data().wins})
        });
        setData(rankig.sort((a,b) => b.wins-a.wins));
        console.log(data);
    }

    useEffect(()=>{fetchData()},[])

    //rendring Rankings component
    return (
    <>
        <header className="header">
            <button onClick={fetchData}>Refresh Ranking</button>
        </header>
        <header className="header">
            <ol>
                {data.map((player)=><li>{player.player} ----- {player.wins}</li>)}
            </ol>
        </header>
    </>
    );
};

export default Rankings;