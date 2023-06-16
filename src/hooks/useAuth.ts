import { useCallback, useContext, useState } from "react";
import axios from "axios";
import { User } from "../types/api/user";
import { useHistory } from "react-router-dom";
import { useMessage } from "./useMessage";
import { LoginUserContext } from "../provider/LoginUserProvider";

export const useAuth = () => {
  const history = useHistory();
  const { showMessage } = useMessage();
  const { setLoginUser } = useContext(LoginUserContext);

  const [loading, setLoading] = useState(false);

  const login = useCallback((id: string) => {
    setLoading(true);
    axios.get<User>(`https://jsonplaceholder.typicode.com/users/${id}`)
    .then((res) => {
      if (res.data) {
        const isAdmin = res.data.id === 10 ? true : false;
        setLoginUser({ ...res.data, isAdmin });
        showMessage({ title: "ログインしました", status: "success" })
        history.push("/home");
        setLoading(false)
      } else {
        showMessage({ title: "ユーザーが見つかりません", status: "error" })
        setLoading(false)
      }
    }).catch(() => {
      showMessage({ title: "ログインできません", status: "error" })
      setLoading(false)
    });
  }, [history, showMessage, setLoginUser]);
  return { login, loading }
}
