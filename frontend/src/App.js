import './App.css';
import React, { useState } from "react";

function App() {
  const [ingredients, setIngredients] = useState("");
  const [cuisine, setCuisine] = useState("Italian");
  const [servings, setServings] = useState(1);
  const [notes, setNotes] = useState("");

  return (
    <div className="App py-5 bg-dark">
      <h2 className='text-white'>Recipe Input Form</h2>
      <form className="w-50 bg-secondary-subtle p-4 rounded" onSubmit={(e) => e.preventDefault()}>
        <div className="mb-3">
          <label for="ingredients" className="form-label">Ingredients</label>
          <textarea className="form-control" id="ingredients" rows="3" value={ingredients} onChange={(e) => setIngredients(e.target.value)}></textarea>
        </div>

        <div className="mb-3">
          <label for="cuisine" className="form-label">Cuisine</label>
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
          <label for="servings" className="form-label">Servings</label>
          <input min="1" max="8" type="number" className="form-control" id="servings" value={servings} onChange={(e) => setServings(e.target.value)} />
        </div>

        <div className="mb-3">
          <label for="notes" className="form-label">Notes</label>
          <textarea className="form-control" id="notes" rows="3" value={notes} onChange={(e) => setNotes(e.target.value)}></textarea>
        </div>

        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default App;
