import { store } from "../store/store";
import { Provider } from "react-redux";
// configure react-hot-toast
import { Toaster } from "react-hot-toast";

const Wrapper = ({ children }) => {
  
  return (
    <>
      <Provider store={store}>
        {children}
        <Toaster />
      </Provider>
    </>
  );
};

export default Wrapper;
