import { useState, useEffect } from 'react';
import Resizer from 'react-image-file-resizer';
export const useFetchData = (url) => {
  const [donnees, setDonnees] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`);
        }

        const data = await response.json();
        setDonnees(data); 
      } catch (error) {
        console.error(`Erreur lors de la récupération des données depuis ${url} :`, error);
      }
    })();
  }, [url]);

  return donnees;
};
export const useFetchDataToken = (url,token) => {
  const [donnees, setDonnees] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(url, {
          headers: {
            'Authorization': `Bearer ${token}`, 
          },
        });

        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`);
        }

        const data = await response.json();
        setDonnees(data); 
      } catch (error) {
        console.error(`Erreur lors de la récupération des données depuis ${url} :`, error);
      }
    })();
  }, [url]);

  return donnees;
};
export const useSubmitDataToken = () => {
  const submitData = async (url, formData,token) => {
    try {
      const response = await fetch(url, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
      }
      // Vous pouvez traiter la réponse si nécessaire
      const responseData = await response.json();
      return responseData; // Retourne la réponse si besoin
    } catch (error) {
      throw error; // Propage l'erreur pour que le composant puisse la gérer
    }
  };

  return submitData;
};
export const useUpdateDataToken = () => {
  const submitData = async (url, formData,token) => {
    try {
      const response = await fetch(url, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
      }
      // Vous pouvez traiter la réponse si nécessaire
      const responseData = await response.json();
      return responseData; // Retourne la réponse si besoin
    } catch (error) {
      throw error; // Propage l'erreur pour que le composant puisse la gérer
    }
  };

  return submitData;
};

export const useSubmitData = () => {
  const submitData = async (url, formData) => {
    try {
      // console.log(JSON.stringify(formData));
      const response = await fetch(url, {
        method: 'POST', // ou 'PUT' ou 'PATCH', selon votre besoin
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
      }
      // Vous pouvez traiter la réponse si nécessaire
      const responseData = await response.json();
      return responseData; // Retourne la réponse si besoin
    } catch (error) {
      throw error; // Propage l'erreur pour que le composant puisse la gérer
    }
  };

  return submitData;
};



export function lireContenuImage(fichier) {
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onload = function (e) {
      const arrayBuffer = e.target.result;
      const bytesArray = new Uint8Array(arrayBuffer);
      const blob = new Blob([bytesArray], { type: fichier.type });
      resolve({ bytesArray, blob });
    };

    reader.onerror = function (error) {
      reject(error);
    };

    reader.readAsArrayBuffer(fichier);
  });
}

export default async function resizeAndCompressImage(file) {
  return new Promise((resolve, reject) => {
    Resizer.imageFileResizer(
      file,
      undefined, // Nouvelle largeur
      undefined, // Nouvelle hauteur
      'PNG', // Format de sortie
      70, // Qualité de compression (0-100)
      0, // Rotation (0 pour aucune rotation)
      (uri) => {
        // La variable uri contiendra l'image redimensionnée et compressée en base64
        // Vous pouvez maintenant faire quelque chose avec cette valeur, par exemple l'envoyer au serveur.
        resolve(uri);
        // Ajoutez le code ici pour effectuer des actions supplémentaires avec l'image redimensionnée (uri)
      },
      'base64' // Format de sortie (base64 ou blob)
    );
  });
}
export function getFormValues (form) 
 {
  const formData = new FormData(form);
  const values = {};
  formData.forEach((value, key) => {
    if (values[key]) {
      if (Array.isArray(values[key])) {
        values[key].push(value);
      } else {
        values[key] = [values[key], value];
      }
    } else {
      values[key] = value;
    }
  });

  return values;
};
