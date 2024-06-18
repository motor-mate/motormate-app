import React, { useEffect, useState } from 'react';

interface SelectMaodelloProps {
  marca: string;
  setModello: (modello : string) => void;
}

const SelectModello: React.FC<SelectMaodelloProps> = ({ marca, setModello }) => {
  const [modelli, setModelli] = useState<{ modello: string }[]>([]);
  useEffect(() => {
    const fetchMarche = async () => {
      let token = localStorage.getItem('token');
            const response = await fetch('http://localhost:4000/api/get/modelli?modelli='+marca, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

      const data = await response.json();
      console.log(data);
      setModelli(data);
      console.log(modelli);
    };
    fetchMarche();
  }, [marca]);

  return (
    <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
      onChange={(e) => setModello(e.target.value)} disabled={!marca}>
      <option value=''>Seleziona modello</option>
      {modelli.map((modello) => (
        <option key={modello.modello} value={modello.modello}>
          {modello.modello}
        </option>
      ))}
    </select>
  );
};

export default SelectModello;