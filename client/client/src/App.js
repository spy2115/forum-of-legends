import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from './components/Button';
import ListElement from './components/list/ListElement';
import ListHeader from './components/list/ListHeader';
import Header from './components/Header';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('/api/users')
      .then(response => {
        setData(response.data);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="px-6 bg-slate-900 min-h-screen">
      <Header />
      <div className="mt-4 grid place-items-center">
        <div className="text-white">
          <h2 className="text-xl font-bold mb-4">Użytkownicy z bazy danych:</h2>
          <ul>
            {Array.isArray(data) && data.map(user => (
              <li key={user.id}>
                {user.name} - {user.email}
              </li>
            ))}
          </ul>
        </div>
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
            <Button label="Utwórz wątek" />
            <Button label="Obserwowane" />
          </div>
        </div>

        <div className="my-8 grid grid-cols-12 gap-2">
          <ListHeader />
          <ListElement date="2 dni temu" topic="Jak grać Dariusem - poradnik od eksperta" author="spy2115" comments="4" />
          <ListElement date="6 dni temu" topic="temat asd asdasdasdasd asdasdasd" author="BugisMax2115" comments="13" />
          <ListElement date="14 dni temu" topic="Tryndamere to cwel" author="SodaDrink" comments="999" />
        </div>
      </div>
    </div>
  );
}

export default App;