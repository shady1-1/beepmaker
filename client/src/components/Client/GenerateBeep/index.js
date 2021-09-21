import { useState } from "react";
import { generateBeppApi } from "../../../api/beep.api";

const GenerateBip = ({ setBeepToken, restaurantId, setShowBepp }) => {
  const [generating, setGenerating] = useState(false);

  const handleClick = async () => {
    setGenerating(true);
    await generateBeppApi(restaurantId)
      .then((data) => {
        setGenerating(false);
        localStorage.setItem("beepToken", data);
        setBeepToken(data);
      })
      .catch((err) => {});
  };
  return (
    <button className="btn-submit btn text" disabled={generating} onClick={handleClick}>
      Générer un beep
    </button>
  );
};

export default GenerateBip;