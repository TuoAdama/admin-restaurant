import React, { Component } from "react";
import { firebase } from "../firebase/config";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
    };

    this.plat = {
      categorie: "",
      libelle: "",
      prix: "",
      images: {},
    };

    this.imagesRef = React.createRef();

    this.getCategories = async () => {
      const categorieCollection = await firebase
        .firestore()
        .collection("categories")
        .get();

      return categorieCollection.docs.map((doc) => ({
        id: doc.id,
        libelle: doc.data().libelle,
      }));
    };
  }

  componentWillMount() {
    firebase
      .auth()
      .signInWithEmailAndPassword("tuoadama17@gmail.com", "tuoadama123456");

    this.getCategories().then((categories) => {
      this.setState({
        categories: categories,
      });
      this.plat.categorie = categories[0].libelle || null;
    });
  }

  handlerChangeCategorie(event) {}

  onChangeInput(event) {
    this.plat = {
      ...this.plat,
      [event.target.name]: event.target.value,
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    const { libelle, prix } = this.plat;
    if (libelle.trim().length === 0 || prix.trim().length === 0) {
      alert("Remplir correctement les champs");
      return;
    }
    this.onSaveImagesInStorage(this.getImages());
  }

  onSavePlatInFirebase(plats) {
    firebase
      .firestore()
      .collection("plats")
      .add(this.plat)
      .then((doc) => {
        console.log(doc);
      })
      .catch((error) => console.log(error));
  }

  async onSaveImagesInStorage(images) {
    var storageRef = firebase.storage().ref();
    for (const i in images) {
      if (Object.hasOwnProperty.call(images, i)) {
        const img = images[i];

        const fileRef = storageRef.child("images/" + img.name);
        await fileRef.put(img, { contentType: img.type });
        this.plat.images[i] = await fileRef.getDownloadURL();
      }
    }
    this.onSavePlatInFirebase(this.plat);
  }

  getImages() {
    let images = {};

    var files = this.imagesRef.current.files;

    for (const key in files) {
      if (Object.hasOwnProperty.call(files, key)) {
        let currentFile = files[key];
        images[key] = new File(
          [currentFile],
          this.getFileName(currentFile.name, key),
          { type: currentFile.type }
        );
      }
    }
    return images;
  }

  getFileName(name, key) {
    let fileInformations = name.split(".");
    const fileExtension = fileInformations[fileInformations.length - 1];
    const fileName = this.plat.libelle
      .replace(/[^a-z0-9]/gi, "_")
      .toLowerCase();
    return `${fileName}-${key}.${fileExtension}`;
  }

  render() {
    return (
      <div className="container mt-3">
        <form action="#" onSubmit={this.handleSubmit.bind(this)}>
          <div className="row">
            <div className="form-group col-4 mb-3">
              <label htmlFor="categorie" className="form-label">
                categories
              </label>
              <select
                name="categorie"
                id="categorie"
                className="form-select"
                onChange={this.onChangeInput}
              >
                {this.state.categories.map((categorie) => (
                  <option value={categorie.libelle} key={categorie.id}>
                    {categorie.libelle}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group col-4 col-md-3 mb-3">
              <label htmlFor="platName" className="form-label">
                Nom du plat
              </label>
              <input
                onChange={this.onChangeInput.bind(this)}
                type="text"
                className="form-control"
                name="libelle"
              />
            </div>
            <div className="form-group col-4 col-md-3 mb-3">
              <label htmlFor="platName" className="form-label">
                Prix
              </label>
              <input
                onChange={this.onChangeInput.bind(this)}
                type="number"
                className="form-control"
                name="prix"
              />
            </div>
            <div className="form-group col col-md-6 mb-3">
              <label htmlFor="images" className="form-label">
                Images du plat
              </label>
              <input
                type="file"
                className="form-control"
                name="images"
                ref={this.imagesRef}
                multiple
              />
            </div>
            <div className="col-12">
              <button className="btn btn-primary">Enregistrer</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Form;
