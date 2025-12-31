import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Eye,
  ChevronLeft,
  ChevronRight,
  Ban,
  UserCheck,
  Loader2,
} from "lucide-react";
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

  // Modal State
  const [confirmModal, setConfirmModal] = useState({ open: false, user: null });

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setCurrentPage(1);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const { data, isFetching, isLoading } = useGetAllUsersQuery({
    page: currentPage,
    limit: ITEMS_PER_PAGE,
    search: debouncedSearch,
  });

  const [blockUnblockUser, { isLoading: isMutationLoading }] =
    useBlockUnblockUserMutation();

  const users = data?.users || [];
  const totalPages = data?.pagination?.pages || 1;

  const handleToggleStatus = async () => {
    const { user } = confirmModal;
    const action = user.isBlocked ? "unblock" : "block";

    try {
      await blockUnblockUser({
        id: user.id,
        data: { block: !user.isBlocked },
      }).unwrap();

      toast.success(`User ${action}ed successfully!`);
      setConfirmModal({ open: false, user: null });
    } catch (err) {
      toast.error(err?.data?.message || "Failed to update user status");
    }
  };

  const renderPagination = useMemo(() => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(
          <button
            key={i}
            onClick={() => setCurrentPage(i)}
            className={`w-9 h-9 rounded-lg text-sm font-semibold transition-all ${
              currentPage === i
                ? "bg-slate-900 text-white shadow-md"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            {i}
          </button>
        );
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        pages.push(
          <span key={i} className="px-1 text-slate-400">
            ...
          </span>
        );
      }
    }
    return pages;
  }, [totalPages, currentPage]);

  const totalItems = data?.pagination?.total || 0;
  const startIndex =
    totalItems === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const endIndex = Math.min(currentPage * ITEMS_PER_PAGE, totalItems);

  return (
    <div className="p-4 lg:p-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <BackButton text="User Management" />
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 size-4" />
          <input
            type="text"
            placeholder="Search users..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table Content */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50/50 h-16 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  SL
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  User Info
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">
                  Subscription
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isFetching ? (
                [...Array(ITEMS_PER_PAGE)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan="5" className="px-6 py-4 h-16 bg-slate-50/20" />
                  </tr>
                ))
              ) : users.length > 0 ? (
                users.map((user, index) => (
                  <tr
                    key={user.id}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-slate-400">
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
                          className="size-10 rounded-full object-cover border border-slate-100"
                          alt=""
                        />
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-slate-900">
                            {user.fullName}
                          </span>
                          <span className="text-xs text-slate-500">
                            {user.email}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-block px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-[11px] font-bold uppercase">
                        {user.subscription?.plan || "Basic"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase ${
                          user.isBlocked
                            ? "bg-red-50 text-red-600"
                            : "bg-emerald-50 text-emerald-600"
                        }`}
                      >
                        <span
                          className={`size-1.5 rounded-full ${
                            user.isBlocked ? "bg-red-500" : "bg-emerald-500"
                          }`}
                        />
                        {user.isBlocked ? "Blocked" : "Active"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() =>
                            navigate(`/user-management/${user.id}`)
                          }
                          className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                        >
                          <Eye className="size-5" />
                        </button>
                        <button
                          onClick={() => setConfirmModal({ open: true, user })}
                          className={`p-2 rounded-lg transition-all ${
                            user.isBlocked
                              ? "text-emerald-500 hover:bg-emerald-50"
                              : "text-slate-400 hover:text-red-500 hover:bg-red-50"
                          }`}
                        >
                          {user.isBlocked ? (
                            <UserCheck className="size-5" />
                          ) : (
                            <Ban className="size-5" />
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
                    No users found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {!isLoading && users.length > 0 && (
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-slate-500 font-medium">
            Showing{" "}
            <span className="text-slate-900 font-bold">{startIndex}</span>
            <span className="mx-0.5">-</span>
            <span className="text-slate-900 font-bold">{endIndex}</span> of{" "}
            <span className="text-slate-900 font-bold">{totalItems}</span> users
          </div>
          <div className="flex items-center  gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="size-9 flex items-center justify-center rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 transition-all"
            >
              <ChevronLeft className="size-4" />
            </button>
            <div className="flex items-center gap-1.5">{renderPagination}</div>
            <button
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="size-9 flex items-center justify-center rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 transition-all"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      )}

      {/* Custom Confirmation Modal */}
      {confirmModal.open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-[2px] p-4">
          <div className="bg-white rounded-2xl p-6 flex items-center justify-center flex-col max-w-sm w-full shadow-2xl animate-in fade-in zoom-in duration-200">
            <div
              className={`size-12 rounded-full flex items-center justify-center mb-4 ${
                confirmModal.user?.isBlocked
                  ? "bg-emerald-50 text-emerald-600"
                  : "bg-red-50 text-red-600"
              }`}
            >
              {confirmModal.user?.isBlocked ? (
                <UserCheck className="size-6" />
              ) : (
                <Ban className="size-6" />
              )}
            </div>
            <h3 className="text-lg font-bold text-slate-900">Confirm Action</h3>
            <p className="text-slate-500 text-sm mt-2">
              Are you sure you want to{" "}
              {confirmModal.user?.isBlocked ? "unblock" : "block"}{" "}
              <strong>{confirmModal.user?.fullName}</strong>?
            </p>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setConfirmModal({ open: false, user: null })}
                className="flex-1 px-5 py-2 text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
              >
                Cancel
              </button>
              <button
                disabled={isMutationLoading}
                onClick={handleToggleStatus}
                className={`flex-1 py-2 px-5 text-sm font-semibold text-white rounded-xl transition-all flex items-center justify-center gap-2 ${
                  confirmModal.user?.isBlocked
                    ? "bg-emerald-600 hover:bg-emerald-700"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {isMutationLoading && (
                  <Loader2 className="size-4 animate-spin" />
                )}
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
