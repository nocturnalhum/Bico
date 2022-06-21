import React, { useContext, useEffect, useState } from 'react';
import './home.css';
import Axios from 'axios';
import Bikes from '../../components/bikeCard/BikeCard';
import SearchBar from '../../components/SearchBar/SearchBar';
import BikeContext from '../../components/Context/BikeContext';

const allCategories = ['all', 'found', 'lost'];

export default function Home() {
  const [allBikes, setAllBikes] = useState([]);
  const [bikes, setBikes] = useState([]);
  const [categories, setCategories] = useState([]);

  const { item } = useContext(BikeContext);

  useEffect(() => {
    (async function getBikes() {
      const config = {
        header: {
          'Content-Type': 'application/json',
        },
      };
      try {
        const response = await Axios.get('/bike/', {}, config);
        const lostAndFoundBikes = await response.data.filter(
          (bike) => bike.status !== 'owner'
        );
        await setAllBikes(lostAndFoundBikes);
        await setBikes(lostAndFoundBikes);
        setCategories(allCategories);
      } catch (error) {
        console.log(error);
      }
    })();
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
    <section className='home-screen'>
      <div className='bike-title'></div>
      <SearchBar categories={categories} filterItems={filterBikes} />
      <Bikes bikes={bikes} setBikes={setBikes} allBikes={allBikes} />
    </section>
  );
}
