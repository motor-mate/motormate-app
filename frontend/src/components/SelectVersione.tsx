import React, { useEffect, useState } from 'react';

interface SelectMaodelloProps {
  marca: string;
  modello: string;
  setIdModello: (id : number) => void;
}

const SelectModello: React.FC<SelectMaodelloProps> = ({ marca, modello, setIdModello }) => {
  const [versioni, setVersioni] = useState<{ versione: string, id: number }[]>([]);
  useEffect(() => {
    const fetchMarche = async () => {
      let token = localStorage.getItem('token');
          const response = await fetch(`http://localhost:4000/api/get/modelli?marca=${marca}&modello=${modello}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

      const data = await response.json();
      setVersioni(data);
    };
    fetchMarche();
  }, [marca, modello]);

  return (
    <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
      onChange={(e) => {
        setIdModello(versioni.find((v) => v.versione === e.target.value)?.id || -1);
      }} disabled={!(marca && modello)}>
      <option value=''>Seleziona versione</option>
      {/* {versioni.map((versione) => (
        <option key={versione.versione} value={versione.versione}>
          {versione.versione}
        </option>
      ))} */}
    </select>
  );
};

export default SelectModello;