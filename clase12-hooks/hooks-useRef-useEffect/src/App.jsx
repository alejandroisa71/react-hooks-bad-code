import { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  let abortController = useRef();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      abortController = new AbortController();

      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          signal: abortController.signal,
        }
      );
      try {
        if (!response.ok) {
          console.log("Error al realizar la solicitud");
          return;
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error al realizar la solicitud:", error.message);
        setError("Error al cargar los datos. Por favor, intenta nuevamente.");
        abortController.abort();
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {isLoading && <p>Cargando datos...</p>}

      <div>
        {error ? (
          <p>{error}</p>
        ) : (
          <div>
            <h1>Publicaciones:</h1>
            <ul>
              {data.map((post) => (
                <li key={post.id}>{post.title}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
