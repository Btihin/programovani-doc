import { FC, useState } from 'react';
import styles from './prevodnik.module.css';
import { log } from 'console';

export interface IPrevodItem {
  original: string;
  mixovany: string;
  desitkovy: number;
}

type Variant = variant.ORIGINAL | variant.MIXOVANY | variant.DESITKOVY;
export enum variant {
  ORIGINAL = 'original',
  MIXOVANY = 'mixovany',
  DESITKOVY = 'desitkovy',
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
    if (item.length > 15) {
      let bezNul = item.substring(8, item.length);
      console.log('bez nul', bezNul);

      let jedna = bezNul.substring(0, 2);
      let dva = bezNul.substring(2, 4);
      let tri = bezNul.substring(4, 6);
      let ctyri = bezNul.substring(6, 8);
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

  const handleCopy = (hodnota: string[]) => {
    // let vybraneHodnoty = '';
    // if (desitky) {
    //     vybraneHodnoty = vysledek.filter()
    // } else {
    // }
    console.log('Kopírovaný', hodnota);

    navigator.clipboard.writeText(hodnota.toString());
  };

  const ButtonCopy: FC<{ typ: Variant }> = (props) => {
    let kopirovany = [];
    let text = '';
    if (props.typ === variant.ORIGINAL) {
      kopirovany = vysledek.filter((f) => f.original);
      text = props.typ;
    }
    if (props.typ === variant.MIXOVANY) {
      kopirovany = vysledek.filter((f) => f.mixovany);
      text = 'original';
    }
    if (props.typ === variant.ORIGINAL) {
      kopirovany = vysledek.filter((f) => f.desitkovy);
      text = 'original';
    }
    return (
      <div>
        <button className={styles.btn} onClick={() => handleCopy(kopirovany)}>
          Kopírovat {props.typ}
        </button>
      </div>
    );
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
          <div className={styles.divContainer}>
            <div>
              {vysledek.map((item) => (
                <div className={styles.divCol}>
                  <div>{item.original}</div>
                </div>
              ))}
            </div>
            <div>
              {/* </div>
          <div className={styles.divContainer}> */}
              {vysledek.map((item) => (
                <div className={styles.divCol}>
                  <div>{item.mixovany}</div>
                </div>
              ))}
            </div>
            <div>
              {/* </div>
          <div className={styles.divContainer}> */}
              {vysledek.map((item) => (
                <div className={styles.divCol}>
                  <div>{item.desitkovy}</div>
                </div>
              ))}
            </div>
          </div>
          {vysledek.length > 0 && (
            <div className={styles.divContainer}>
              <div>
                <ButtonCopy typ={variant.ORIGINAL} />
              </div>
              <div>
                <ButtonCopy typ={variant.MIXOVANY} />
              </div>
              <div>
                <ButtonCopy typ={variant.DESITKOVY} />
              </div>
            </div>
          )}
        </div>
        <div></div>
      </div>
    </div>
  );
}
