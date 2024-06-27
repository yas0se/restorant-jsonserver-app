import React, { useState } from "react";
import { saveArticle } from "../Repository/articlesRepository";
import axios from "axios";
export default function NewArticle() {
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [categorie, setCategorie] = useState("");
  const [image, setImage] = useState(null);
  const cloud_name = "du1w6cmsb";
  const preset_key = "aauez9ty";
  

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSaveArticle = async (event) => {
    event.preventDefault();
    try {
      if (image) {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", preset_key);

        const res = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData);
        console.log(res.data);

    
    const article = {
      titre,
      description,
      categorie,
      imageUrl: res.data.secure_url,
    };

    const response = await saveArticle(article);
    alert(JSON.stringify(response.data));
  } else {
    alert("Please select an image to upload.");
  }
} catch (error) {
  console.error(error);
  alert("An error occurred while saving the article.");
}

  };

  return (
    <div className="p-3">
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSaveArticle} method="post">
            <div className="mb-3">
              <label htmlFor="titre" className="form-label">
                Titre
              </label>
              <input
                id="titre"
                type="text"
                className="form-control"
                value={titre}
                onChange={(e) => setTitre(e.target.value)}
              ></input>
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <input
                id="description"
                type="text"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></input>
            </div>
            <div className="mb-3">
              <label htmlFor="categorie" className="form-label">Categorie
              </label>
              <select id="categorie"
                className="form-select"
                aria-label="Default select example"
                value={categorie}
                onChange={(e) => setCategorie(e.target.value)}>
                <option value="" disabled selected>Categorie</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Boissan">Boissan</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                Image
              </label>
              <input
                id="image"
                type="file"
                className="form-control"
                onChange={handleImageChange}
              />
            </div>
            <button className="btn btn-primary">Save</button>
          </form>
        </div>
      </div>
    </div>
  );
}
