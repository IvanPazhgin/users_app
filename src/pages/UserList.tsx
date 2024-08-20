import { useCallback, useEffect, useState } from "react";
import { requestUsers, User } from "../api";
import { InputComponent } from "../components/Input";
import { Pagination } from "../components/Pagination";

export const UserList = () => {
  const [userList, setUserList] = useState<User[]>([]);
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // пагинация
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(4);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setUserList([]);
      const offset = (page - 1) * limit; // Рассчитываем смещение
      const users: User[] = await requestUsers({
        name: name,
        age: age,
        limit: limit,
        offset: offset,
      });
      setUserList(users);
      setError(null);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Произошла неизвестная ошибка");
      }
      setUserList([]);
    } finally {
      setLoading(false);
    }
  }, [name, age, page, limit]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <>
      <h2>Список пользователей</h2>

      <div style={{ display: "flex", gap: "1rem" }}>
        <InputComponent
          labelName="Имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <InputComponent
          labelName="Возраст"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </div>

      {loading ? (
        <p>Загрузка...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : userList.length === 0 ? (
        <p>Users not found</p>
      ) : (
        <ul style={{ padding: "0" }}>
          {userList.map((user) => (
            <li key={user.id} style={{ display: "block" }}>
              {user.name}, {user.age}
            </li>
          ))}
        </ul>
      )}

      <Pagination
        page={page}
        limit={limit}
        setLimit={(e) => setLimit(Number(e.target.value))}
        prevPage={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
        nextPage={() => setPage((prevPage) => prevPage + 1)}
      />
    </>
  );
};
