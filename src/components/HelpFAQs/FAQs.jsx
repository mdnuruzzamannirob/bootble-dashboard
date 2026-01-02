import { useState, useEffect } from "react";
import {
  Plus,
  Edit3,
  Trash2,
  Loader2,
  HelpCircle,
  X,
  Save,
  ChevronLeft,
  AlertTriangle,
  Loader,
} from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// API Hooks
import {
  useGetFaqQuery,
  useDeleteFaqMutation,
  useCreateFaqMutation,
  useUpdateFaqMutation,
} from "@/store/features/cms/cmsApi";

import PrimaryButton from "../SharedComponents/PrimaryButton";

export default function FAQManagement() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [faqToDelete, setFaqToDelete] = useState(null);

  // API Hooks
  const { data: faqData, isLoading } = useGetFaqQuery();
  const [deleteFaq, { isLoading: isDeleting }] = useDeleteFaqMutation();
  const [createFaq, { isLoading: isCreating }] = useCreateFaqMutation();
  const [updateFaq, { isLoading: isUpdating }] = useUpdateFaqMutation();

  // Form State
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    category: "Workout",
    order: 1,
  });

  const faqs = faqData?.faqs || [];

  // Reset or Fill Form when editing/adding
  useEffect(() => {
    if (selectedFaq) {
      setFormData({
        question: selectedFaq.question,
        answer: selectedFaq.answer,
        category: selectedFaq.category || "Workout",
        order: selectedFaq.order || 1,
      });
    } else {
      setFormData({ question: "", answer: "", category: "Workout", order: 1 });
    }
  }, [selectedFaq, isModalOpen]);

  // Edit Helper
  const handleEdit = (faq) => {
    setSelectedFaq(faq);
    setIsModalOpen(true);
  };

  const openDeleteModal = (id) => {
    setFaqToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteFaq(faqToDelete).unwrap();
      toast.success("FAQ removed successfully");
      setIsDeleteModalOpen(false);
    } catch (err) {
      toast.error("Failed to delete FAQ");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedFaq) {
        await updateFaq({ id: selectedFaq._id, ...formData }).unwrap();
        toast.success("FAQ updated successfully");
      } else {
        await createFaq(formData).unwrap();
        toast.success("FAQ created successfully");
      }
      setIsModalOpen(false);
    } catch (err) {
      toast.error(err?.data?.message || "Operation failed");
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-blue-600 mb-2" size={40} />
        <p className="text-slate-500 font-medium">Loading FAQs...</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4  ">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-all group"
          >
            <ChevronLeft size={20} className="group-hover:-translate-x-0.5" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-slate-800">FAQ Management</h1>
            <p className="text-xs text-slate-500">
              Total {faqs.length} questions published
            </p>
          </div>
        </div>
        <button
          onClick={() => {
            setSelectedFaq(null);
            setIsModalOpen(true);
          }}
          className="group relative text-sm inline-flex items-center gap-2 px-5 py-3 bg-gray-800 text-white font-bold rounded-2xl hover:bg-gray-700 transition-all duration-300 active:scale-95 shadow-lg shadow-blue-200 overflow-hidden"
        >
          <Plus size={18} strokeWidth={3} />
          Add New FAQ
        </button>
      </div>

      {/* --- FAQ LIST GRID --- */}
      {faqs.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {faqs?.map((faq, index) => (
            <div
              key={index}
              className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-md hover:border-blue-100 transition-all group relative"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-2">
                  <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                    {faq.category}
                  </span>
                  <span className="bg-slate-100 text-slate-500 text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                    Order: {faq.order}
                  </span>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleEdit(faq)} // Function defined below
                    className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit3 size={16} onClick={() => handleEdit(faq)} />
                  </button>
                  <button
                    onClick={() => openDeleteModal(faq._id)}
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <h3 className="text-lg font-bold text-slate-800 mb-2 flex items-start gap-2">
                <span className="text-blue-500 font-mono text-sm mt-1">Q.</span>
                {faq.question}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed pl-6">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
          <HelpCircle className="mx-auto text-slate-300 mb-4" size={48} />
          <p className="text-slate-500 font-medium">
            No FAQs found. Start by adding one!
          </p>
        </div>
      )}

      {/* --- MODAL (CONDITIONAL RENDERING) --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-all">
          <div className="bg-white w-full max-w-lg rounded-[2rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-xl font-bold text-slate-800">
                {selectedFaq ? "Edit FAQ" : "Add New FAQ"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-white hover:shadow-sm rounded-full transition-all border border-transparent hover:border-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">
                  Question
                </label>
                <input
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-slate-400"
                  value={formData.question}
                  onChange={(e) =>
                    setFormData({ ...formData, question: e.target.value })
                  }
                  placeholder="e.g. How do I cancel my subscription?"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">
                  Answer
                </label>
                <textarea
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none placeholder:text-slate-400"
                  value={formData.answer}
                  onChange={(e) =>
                    setFormData({ ...formData, answer: e.target.value })
                  }
                  placeholder="Explain the solution clearly..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">
                    Category
                  </label>
                  <input
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-slate-400"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    placeholder="e.g. Workout"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">
                    Order (Sort Index)
                  </label>
                  <input
                    type="number"
                    min="1"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    value={formData.order}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        order: parseInt(e.target.value) || 1,
                      })
                    }
                  />
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex gap-3 pt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3.5 px-4 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition-all uppercase text-xs tracking-widest"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreating || isUpdating}
                  className="flex-1 py-3.5 px-4 rounded-xl bg-gray-800 font-bold text-white hover:bg-gray-700 disabled:opacity-70 flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-200 uppercase text-xs tracking-widest"
                >
                  {isCreating || isUpdating ? (
                    <Loader2 className="animate-spin" size={18} />
                  ) : (
                    <Save size={18} />
                  )}
                  {selectedFaq ? "Update FAQ" : "Publish FAQ"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- CUSTOM DELETE MODAL --- */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-all">
          <div className="bg-white p-8 text-center w-full max-w-lg rounded-[2rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle size={40} className="text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">
              Delete FAQ?
            </h2>
            <p className="text-slate-500 mb-8 leading-relaxed">
              Are you sure you want to remove this question? This action cannot
              be undone.
            </p>

            <div className="flex items-center gap-3">
              {" "}
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="w-full py-4 rounded-2xl text-sm border border-slate-200 font-bold text-slate-500 hover:bg-slate-50 transition-all"
              >
                No, Keep It
              </button>
              <button
                onClick={confirmDelete}
                disabled={isDeleting}
                className="w-full py-4 rounded-2xl bg-red-500 text-sm font-bold border border-red-500 text-white hover:bg-red-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-200"
              >
                {isDeleting ? (
                  <Loader className="animate-spin" size={22} />
                ) : (
                  "Yes, Delete It"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
