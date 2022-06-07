import React, { useEffect, useState } from 'react';
import './home.css';
import Axios from 'axios';
import Bikes from '../../components/bikeCard/Bikes';
import SearchBar from '../../components/SearchBar/SearchBar';

const allCategories = ['all', 'found', 'lost'];

export default function Home() {
  const [allBikes, setAllBikes] = useState([]);
  const [bikes, setBikes] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function getBikes() {
      const response = await Axios.get('/bike');
      const lostAndFoundBikes = response.data.filter(
        (bike) => bike.status !== 'owner'
      );
      setAllBikes(lostAndFoundBikes);
      setCategories(allCategories);
    }
    getBikes();
  }, []);

  const filterBikes = (category) => {
    if (category === 'all') {
      setBikes(allBikes);
      return;
    }
    const filteredItems = allBikes.filter((bike) => bike.status === category);
    setBikes(filteredItems);
  };

  return (
    <main>
      <section className='home-screen'>
        <div className='bike-title'>
          <h2>Bikes </h2>
          <div className='underline'></div>
        </div>
        <SearchBar categories={categories} filterItems={filterBikes} />
        <Bikes bikes={bikes} setBikes={setBikes} allBikes={allBikes} />
      </section>
    </main>
  );
}
