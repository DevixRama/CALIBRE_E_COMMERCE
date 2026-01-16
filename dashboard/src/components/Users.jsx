import React, { useEffect, useState } from "react";
import avatar from "../assets/avatar.jpg";
import { useDispatch, useSelector } from "react-redux";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Header from "./Header";
import { deleteUser, fetchAllUsers } from "../store/slices/adminSlice";

const Users = () => {
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(null);
  const dispatch = useDispatch();
  const { loading, users, totalUsers } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchAllUsers(page));

  }, [dispatch, page]);

  useEffect(() => {
    if (totalUsers !== undefined) {
      const maxPage = Math.ceil(totalUsers / 10);
      setMaxPage(maxPage || 1);
    }
  }, [totalUsers]);

  useEffect(() => {
    if (maxPage && page > maxPage) {

      setPage(maxPage);
    }
  }, [maxPage, page]);


  const handleDeleteUser = (id) => {
    dispatch(deleteUser({ id, page }));
  };

  return (
    <div className="max-h-screen w-full px-12 py-3 flex flex-col">
      <Header />
      <div className="p-4 w-full max-w-8xl h-full mx-auto">
        <h1 className="text-3xl font-bold text-purple-600 mb-4">Users</h1>

        <div className="bg-white overflow-y-auto w-full rounded shadow">

          <div className=" h-[65vh]">

            <table className="w-full border-collapse">
              <thead className="bg-purple-400 font-bold text-left py-2">
                <tr className="border-b">
                  <th className="p-3">Avatar</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Registered On</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" className="text-center py-6">Loading...</td>
                  </tr>
                ) : users?.length > 0 ? (
                  users.map((user, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-3">
                        <img src={user?.avatar?.url || avatar} className="w-12 h-12 rounded-full" />
                      </td>
                      <td className="p-3">{user.name}</td>
                      <td className="p-3">{user.email}</td>
                      <td className="p-3">
                        {new Date(user.created_at).toLocaleDateString()}
                      </td>
                      <td className="p-3">
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="px-3 py-1  bg-red-600 text-white rounded-md hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-gray-500">No users found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>


        <div className="flex justify-center items-center gap-3 mt-4">
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
            className="px-2 py-2 bg-purple-400 text-white rounded-full"
          >
            <ChevronLeft />
          </button>
          <span className="font-semibold">{page} / {maxPage}</span>
          <button
            disabled={page === maxPage}
            onClick={() => setPage((prev) => prev + 1)}
            className="px-2 py-2 bg-purple-400 text-white rounded-full"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Users;