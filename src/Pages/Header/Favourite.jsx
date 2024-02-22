import heartImg from "../../assets/heart.svg";

const Favourite = ({ showFavModal, setShowFavModal }) => {
  return (
    <button
      onClick={() => setShowFavModal(!showFavModal)}
      className="p-2 hover:bg-black/30 cursor-pointer flex gap-2 items-center rounded-md transition-all"
    >
      <img src={heartImg} alt="" />
      <span>Favourite Locations</span>
    </button>
  );
};

export default Favourite;
