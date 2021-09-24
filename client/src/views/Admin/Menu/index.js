import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import routes from "../../../routes/restaurant";

import "./logo.css";

const MenuPage = () => {
  const [profileImage, setProfileImage] = useState("../../img/no_image.png");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);

  const [societyName, setSocietyName] = useState("");
  const [imageMenu, setImageMenu] = useState("");

  useEffect(() => {
    const { societyName, ImageMenu } = JSON.parse(localStorage.getItem("user"));
    setSocietyName(societyName);
    setImageMenu(imageMenu ? `${imageMenu}` : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQYV2NgAAIAAAUAAarVyFEAAAAASUVORK5CYII=");
  }, []);


  const onButtonClickHandler = () => {
    window.alert( 'fichier téléchargé avec succès')
  };


  const onFileChange = (event) => {
    var file = event.target.files[0];

    console.log(file);

    const MIME_TYPES = {
      'image/jpg': 'jpg',
      'image/jpeg': 'jpg',
      'image/png': 'png',
      'application/pdf' : 'pdf',
    };

    if (file) {
      var reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
      setFileName(event.target.files[0].name);
      setFile(event.target.files[0]);
      setIsBtnDisabled(false);
    }
    else{
      setProfileImage(null);
      setFileName(null);
      setIsBtnDisabled(true);
    }
  };

  async function uploadLogic(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);

    await axios({
      url: "/api/restaurant/uploadM",
      method: "POST",
      data: formData,
      headers: {
        Authorization: `auth-token:${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
    })
        .then((res) => {
          if (res.data.success === true) {
            e.target.reset();
            let user = JSON.parse(localStorage.getItem("user"));
            user.imageMenu = res.data.filename;
            localStorage.setItem("user", JSON.stringify(user));

            setImageMenu(`${res.data.filename}`);

            setFile(null);
            setFileName(false);
            setProfileImage(false);
            setIsBtnDisabled(true);
          }
        })
        .catch((e) => {});
  }

  return (
      <>
        <div className="logo-container">
          <div className="logo-content">
            <Link className="btn-back" to={routes.adminHomePage}>
              <img alt="loading" src="../../img/btn-back.png" />
              <span>Retour</span>
            </Link>


            <div className="container-right">
              <div className="account">


                <div className="logo-title logo-title-input">
                  Ajouter/Modifier l’image:
                </div>

                <div className="container-upload">
                  <label className="upload-text" htmlFor="uplaod">
                    <div>
                      <span>
                        {fileName ? fileName : "Aucun fichier sélectionné"}
                      </span>
                    </div>
                  </label>
                  <label className="btn button" htmlFor="uplaod">
                    Télécharger PDF
                  </label>
                </div>
                <form onSubmit={uploadLogic}>
                  <input
                      className="logo-hide-input"
                      id="uplaod"
                      type="file"
                      name="file"
                      accept="file/*"
                      onChange={(e) => onFileChange(e)}
                      required
                  />
                  <button
                      type="submit"
                      className="btn btn-logo-submit"
                      onClick={onButtonClickHandler}
                      disabled={isBtnDisabled}
                  >
                    Enregistrer
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

      </>
  );
};

export default MenuPage;