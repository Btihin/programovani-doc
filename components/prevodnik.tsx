import { useState } from 'react';
import styles from './prevodnik.module.css';

export interface IPrevodItem {
  original: string;
  mixovany: string;
  desitkovy: number;
}

export default function Prevodnik() {
  const [hodnoty, setHodnoty] = useState<string>();
  const [chyba, setChyba] = useState('');
  const [vysledek, setVysledek] = useState<IPrevodItem[]>([]);

  const handleValue = (e) => {
    setHodnoty(e.target.value);
  };

  const handleProhodit = () => {
    if (hodnoty === undefined) {
      setChyba('Zadejte hodnoty');
    } else {
      setChyba(() => '');
      let raw = hodnoty.split('\n');
      const prohozenePole = raw.map((item) => prohodit(item));
      console.log('prohozene', prohozenePole);
      setVysledek(prohozenePole);
    }
  };

  function prohodit(item): IPrevodItem {
    console.log('item', item);
    console.log('item lenght', item.length);
    if (item.length > 7) {
      let jedna = item.substring(0, 2);
      let dva = item.substring(2, 4);
      let tri = item.substring(4, 6);
      let ctyri = item.substring(6, 8);
      let novy = ctyri + tri + dva + jedna;
      let novyDesitkovy = parseInt(novy, 16);

      return { original: item, mixovany: novy, desitkovy: novyDesitkovy };
    } else {
      setChyba((prev) => prev + ' item: ' + item);
      return { original: item, mixovany: '', desitkovy: 0 };
    }
  }

  const handleSmazat = () => {
    setChyba('');
    setHodnoty('');
    setVysledek([]);
  };

  const handleCopy = (hodnota: string) => {
    // let vybraneHodnoty = '';
    // if (desitky) {
    //     vybraneHodnoty = vysledek.filter()
    // } else {
    // }
    navigator.clipboard.writeText(hodnota);
  };
  return (
    <div>
      {/* <Callout type='info' emoji='ℹ️'>
        Today is Friday.
      </Callout> */}
      {chyba && (
        <div className={styles.calloutError}> ❗ Chyba v položce: {chyba}</div>
      )}
      <div className={styles.divContainer}>
        <div className={styles.divFlexNula}>
          <p>Zadejte:</p>
          <p>
            <textarea value={hodnoty} onChange={handleValue} rows={20} />
          </p>
          <div className={styles.btnGroup}>
            <button className={styles.btn} onClick={handleProhodit}>
              Prohodit
            </button>
            <button className={styles.btn} onClick={handleSmazat}>
              Vymazat
            </button>
          </div>
        </div>
        <div className={styles.divFlexJedna}>
          <p>Převedeno:</p>
          <div className={styles.divContainer}>
            <div>Original</div>
            <div>Mixovany</div>
            <div>Desitkovy</div>
          </div>
          {vysledek.map((item) => (
            <div className={styles.divContainer}>
              <div onClick={() => handleCopy(item.original)}>
                {item.original}
              </div>
              <div onClick={() => handleCopy(item.mixovany)}>
                {item.mixovany}
              </div>
              <div onClick={() => handleCopy(item.desitkovy.toString())}>
                {item.desitkovy}
              </div>
            </div>
          ))}
        </div>
        <div></div>
      </div>
    </div>
  );
}
