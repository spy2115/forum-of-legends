import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from "../components/Button"
import ListElement from "../components/list/ListElement"
import ListHeader from "../components/list/ListHeader"


export default function Home() {
    const [threadsData, setThreadsData] = useState("");
    const [newThreadAddress, setNewThreadAddress] = useState("login");
    const [followedAddress, setFollowedAddress] = useState("login");

    useEffect(() => {
      const storedUser = localStorage.getItem("userName");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setNewThreadAddress("new_thread");
        setFollowedAddress("followed");
      }
    }, []);

      useEffect(() => {
        axios.get('/api/threads', {
          headers: {
            'ngrok-skip-browser-warning': 'true',
          },
        })
        .then(response => {
          setThreadsData(Array.from(response.data).slice(0, 6));
        })
        .catch(error => console.error(error));
      }, []);

    return (
        <div className="mt-4 grid place-items-center">
            <div className="my-8 grid grid-cols-4 gap-24">
                <div className="col-span-2 my-8 relative w-96">
                <img
                    alt=""
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/League_of_Legends_2019_vector.svg/1200px-League_of_Legends_2019_vector.svg.png"
                    className="absolute object-cover"
                    />
                </div>
                <div className="col-span-2 my-8 grid grid-cols-1 gap-3">
                <Button label="Kategorie" address="categories"/>
                <Button label="Utwórz wątek" address={newThreadAddress}/>
                <Button label="Obserwowane" address={followedAddress} />
                </div>
            </div>
            <h1 className="text-2xl text-white font-bold mt-12"> Przeglądaj najnowsze wątki: </h1>
            <div className="my-8 grid grid-cols-12 gap-2">
                <ListHeader />
                {Array.isArray(threadsData) && threadsData.map(thread => (
                    <ListElement key={thread.id} date={thread.date_of_creation} topic={thread.title} author={thread.author.name} comments={thread.comments_count} threadId={thread.id} />
                ))}
            </div>
        </div>
    )
}