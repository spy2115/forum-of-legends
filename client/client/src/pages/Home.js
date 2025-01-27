import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from "../components/Button"
import ListElement from "../components/list/ListElement"
import ListHeader from "../components/list/ListHeader"


export default function Home() {
    const [data, setData] = useState('');
    const [threadsData, setThreadsData] = useState("");

    useEffect(() => {
        axios.get('/api/users', {
          headers: {
            'ngrok-skip-browser-warning': 'true',
          },
        })
        .then(response => {
          setData(response.data);
        })
        .catch(error => console.error(error));
      }, []);

      useEffect(() => {
        axios.get('/api/threads', {
          headers: {
            'ngrok-skip-browser-warning': 'true',
          },
        })
        .then(response => {
          setThreadsData(response.data);
        })
        .catch(error => console.error(error));
      }, []);

    return (
        <div className="mt-4 grid place-items-center">
            <h2 className="text-xl font-bold mb-4 text-white">Użytkownicy z bazy danych:</h2>
            <ul>
                {Array.isArray(data) && data.map(user => (
                <li key={user.id} className='text-white'>
                    {user.name} - {user.email}
                </li>
                ))}
            </ul>
            <div className="my-8 grid grid-cols-4 gap-24">
                <div className="col-span-2 my-8 relative w-64">
                <img
                    alt=""
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/League_of_Legends_2019_vector.svg/1200px-League_of_Legends_2019_vector.svg.png"
                    className="absolute object-cover"
                    />
                </div>
                <div className="col-span-2 my-8 grid grid-cols-2 gap-4">
                <Button label="Najnowsze wątki" />
                <Button label="Kategorie" />
                <Button label="Utwórz wątek" address="new_thread" />
                <Button label="Obserwowane" />
                </div>
            </div>
            
            <div className="my-8 grid grid-cols-12 gap-2">
                <ListHeader />
                {Array.isArray(threadsData) && threadsData.map(thread => (
                    <ListElement key={thread.id} date={thread.date_of_creation} topic={thread.title} author={thread.author.name} comments={thread.comments_count} threadId={thread.id} />
                ))}
            </div>
        </div>
    )
}