import React, { useEffect, useState } from 'react';

interface SelectMarcheProps {
  setMarca: (marca : string) => void;
}

const SelectMarca: React.FC<SelectMarcheProps> = ({ setMarca }) => {
  const [marche, setMarche] = useState<{ marca: string }[]>([]);
  useEffect(() => {
    const fetchMarche = async () => {
      let token = localStorage.getItem('token');
            const response = await fetch('http://localhost:4000/api/get/marche', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

      const data = await response.json();
      setMarche(data);
    };
    fetchMarche();
  }, []);

  return (
    <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
      onChange={(e) => setMarca(e.target.value)}>
      <option value=''>Seleziona marca</option>
      {marche.map((marca) => (
        <option key={marca.marca} value={marca.marca}>
          {marca.marca}
        </option>
      ))}
    </select>
  );
};

export default SelectMarca;