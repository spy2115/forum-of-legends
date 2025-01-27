import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ListHeader from "../components/list/ListHeader";
import ListElement from "../components/list/ListElement";

export default function CategoryThreads() {
    const [threadsData, setThreadsData] = useState("");

    useEffect(() => {
        const storedUser = localStorage.getItem("userName");

        axios.get(`/api/${JSON.parse(storedUser)}/followed_threads`, {
          headers: {
            'ngrok-skip-browser-warning': 'true',
          },
        })
        .then(response => {
            console.log(response.data);
          setThreadsData(response.data);
        })
        .catch(error => console.error(error));
      }, []);

    return (
        <div className="mt-4 grid place-items-center">
          { Array.isArray(threadsData) && threadsData.length > 0 ? 
          <>
            <h1 className="text-2xl text-white font-bold mt-12"> Obserwowane wątki:</h1>
            <div className="my-8 grid grid-cols-12 gap-2">
                <ListHeader />
                {Array.isArray(threadsData) && threadsData.map(thread => (
                  <ListElement key={thread.id} date={thread.date_of_creation} topic={thread.title} author={thread.author} comments={thread.comments_count} threadId={thread.id} />
                ))}
            </div>
          </>
          : <h1 className="text-2xl text-white font-bold mt-12"> Nie obserwujesz żadnych wątków!</h1>}
        </div>
)}