import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  EyeOutlined,
  LeftOutlined,
  RightOutlined,
  SearchOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";
import BackButton from "../SharedComponents/BackButton";
import {
  useBlockUnblockUserMutation,
  useGetAllUsersQuery,
} from "@/store/features/user/userApi";

const ITEMS_PER_PAGE = 10;

export default function User() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // 1. Search Debouncing
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(1);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // 2. API Call
  const { data, isFetching, isLoading } = useGetAllUsersQuery({
    page: currentPage,
    limit: ITEMS_PER_PAGE,
    search: debouncedSearch,
  });

  const [blockUnblockUser, { isLoading: isBlocking }] =
    useBlockUnblockUserMutation();

  const users = data?.users || [];
  const totalPages = data?.pagination?.pages || 1;

  // 3. Handlers
  const handleBlockToggle = async (user) => {
    const action = user.isBlocked ? "unblock" : "block";

    if (!window.confirm(`Are you sure you want to ${action} ${user.fullName}?`))
      return;

    try {
      await blockUnblockUser({
        id: user.id,
        data: { isBlocked: !user.isBlocked },
      }).unwrap();
      toast.success(`User ${action}ed successfully`);
    } catch (err) {
      toast.error(err?.data?.message || "Operation failed");
    }
  };

  // 4. Pagination Component (Helper)
  const renderPaginationButtons = useMemo(() => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        buttons.push(
          <button
            key={i}
            onClick={() => setCurrentPage(i)}
            className={`w-10 h-10 rounded-lg text-sm font-semibold transition-all shadow-sm ${
              currentPage === i
                ? "bg-slate-900 text-white"
                : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
            }`}
          >
            {i}
          </button>
        );
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        buttons.push(
          <span key={i} className="px-2 text-slate-400">
            ...
          </span>
        );
      }
    }
    return buttons;
  }, [totalPages, currentPage]);

  return (
    <>
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
        <BackButton text="User Management" />

        <div className="relative max-w-sm w-full">
          <SearchOutlined className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all "
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl border border-slate-200  overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-[13px] font-bold text-slate-500 uppercase tracking-wider">
                  SL
                </th>
                <th className="px-6 py-4 text-[13px] font-bold text-slate-500 uppercase tracking-wider">
                  User Profile
                </th>
                <th className="px-6 py-4 text-[13px] font-bold text-slate-500 uppercase tracking-wider text-center">
                  Plan
                </th>
                <th className="px-6 py-4 text-[13px] font-bold text-slate-500 uppercase tracking-wider text-center">
                  Status
                </th>
                <th className="px-6 py-4 text-[13px] font-bold text-slate-500 uppercase tracking-wider text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {isFetching ? (
                // Table Skeleton Loading
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan="5" className="px-6 py-6 h-16 bg-slate-50/50" />
                  </tr>
                ))
              ) : users.length > 0 ? (
                users.map((user, index) => (
                  <tr
                    key={user.id}
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-slate-500 font-medium">
                      {String(
                        (currentPage - 1) * ITEMS_PER_PAGE + index + 1
                      ).padStart(2, "0")}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            user.profilePhoto?.url ||
                            `https://ui-avatars.com/api/?name=${user.fullName}&background=random`
                          }
                          className="w-10 h-10 rounded-full object-cover ring-2 ring-white"
                          alt={user.fullName}
                        />
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-slate-900 leading-tight">
                            {user.fullName}
                          </span>
                          <span className="text-xs text-slate-500">
                            {user.email}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-md text-xs font-semibold capitalize">
                        {user.subscription?.plan || "Free"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-tight uppercase ${
                          user.isBlocked
                            ? "bg-red-50 text-red-500"
                            : "bg-emerald-50 text-emerald-600"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            user.isBlocked ? "bg-red-500" : "bg-emerald-500"
                          }`}
                        ></span>
                        {user.isBlocked ? "Blocked" : "Active"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => navigate(`/user-details/${user.id}`)}
                          className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                          title="View Details"
                        >
                          <EyeOutlined className="text-lg" />
                        </button>
                        <button
                          onClick={() => handleBlockToggle(user)}
                          disabled={isBlocking}
                          className={`p-2 rounded-lg transition-all ${
                            user.isBlocked
                              ? "text-emerald-500 hover:bg-emerald-50"
                              : "text-red-400 hover:bg-red-50"
                          }`}
                          title={user.isBlocked ? "Unblock User" : "Block User"}
                        >
                          {isBlocking ? (
                            <LoadingOutlined />
                          ) : (
                            <img
                              src="/images/users/danger.png"
                              alt="action"
                              className={`w-5 h-5 ${
                                user.isBlocked ? "grayscale-0" : "grayscale"
                              }`}
                            />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-20 text-center text-slate-400"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <SearchOutlined className="text-4xl opacity-20" />
                      <p className="text-lg">
                        No users found matching your search
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Footer */}
      {!isLoading && users.length > 0 && (
        <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500 font-medium">
            Showing <span className="text-slate-900">{users.length}</span> of{" "}
            <span className="text-slate-900">
              {data?.pagination?.total || 0}
            </span>{" "}
            users
          </p>

          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="size-10 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
            >
              <LeftOutlined className="text-xs" />
            </button>

            <div className="flex items-center gap-1.5">
              {renderPaginationButtons}
            </div>

            <button
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="size-10 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
            >
              <RightOutlined className="text-xs" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
