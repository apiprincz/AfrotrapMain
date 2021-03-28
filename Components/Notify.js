import { useContext } from "react";
import { DataContext } from "../store/GlobalState";
import Loading from "./Loading";
import Toast from "./Toast";

const Notify = () => {
  const [state, dispatch] = useContext(DataContext);
  const { cart } = state;

  return (
    <>
      {Notify.loading && <Loading></Loading>}
      {Notify.error && <Toast></Toast>}
      {Notify.sucess && <Toast></Toast>}
    </>
  );
};

export default Notify;
