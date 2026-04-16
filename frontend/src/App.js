import './App.css';
import React, { useState } from "react";

function App() {
  const [ingredients, setIngredients] = useState("");
  const [cuisine, setCuisine] = useState("Italian");
  const [servings, setServings] = useState(1);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);  // Track loading state
  const [response, setResponse] = useState("");  // To store the API response

  const url = process.env.REACT_APP_BACKEND_URL;

  const handleSubmit = async () => {
    setLoading(true); // Start loading

    try {
      const res = await fetch(`${url}/api/generate-recipe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ingredients,
          cuisine,
          servings,
          notes,
        }),
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();
      setResponse(data.result); // Update the response state
    } catch (error) {
      console.error("Error submitting recipe:", error);
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="App py-5 bg-dark">
      <h2 className='text-white'>Recipe Input Form</h2>
      <form className="w-50 bg-secondary-subtle p-4 rounded" onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}>
        <div className="mb-3">
          <label htmlFor="ingredients" className="form-label">Ingredients</label>
          <textarea className="form-control" id="ingredients" rows="3" value={ingredients} onChange={(e) => setIngredients(e.target.value)}></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="cuisine" className="form-label">Cuisine</label>
          <select className="form-control" id="cuisine" value={cuisine} onChange={(e) => setCuisine(e.target.value)}>
            <option value="Italian">Italian</option>
            <option value="Mexican">Mexican</option>
            <option value="Indian">Indian</option>
            <option value="Chinese">Chinese</option>
            <option value="French">French</option>
            <option value="Japanese">Japanese</option>
            <option value="Mediterranean">Mediterranean</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="servings" className="form-label">Servings</label>
          <input min="1" max="8" type="number" className="form-control" id="servings" value={servings} onChange={(e) => setServings(e.target.value)} />
        </div>

        <div className="mb-3">
          <label htmlFor="notes" className="form-label">Notes</label>
          <textarea className="form-control" id="notes" rows="3" value={notes} onChange={(e) => setNotes(e.target.value)}></textarea>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      {/* Show loading indicator */}
      {loading && <div className='bg-opacity-50 fixed-top vh-100 w-100 bg-dark text-white d-flex align-items-center justify-content-center'>
        <div className='bg-white text-dark p-5 rounded d-flex flex-column align-items-center justify-content-center gap-2'>
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className='mt-2'>Generating recipe...</div>
        </div>
      </div>}
      {response && <div className='bg-opacity-50 fixed-top vh-100 w-100 bg-dark text-white d-flex align-items-center justify-content-center'>
        <div className='w-50 bg-white text-dark p-5 rounded d-flex flex-column align-items-center justify-content-center gap-2'>
          <h2>Generated Recipe</h2>
          <div className='mt-2'>{response}</div>
          <button className='btn btn-secondary' onClick={() => setResponse("")}>Close</button>
        </div>
      </div>}
    </div>
  );
}

export default App;
