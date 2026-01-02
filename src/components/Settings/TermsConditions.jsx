import { useEffect, useState, useRef } from "react";
import {
  useGetTermsQuery,
  useUpdateTermsMutation,
} from "@/store/features/cms/cmsApi";
import JoditEditor from "jodit-react";
import { joditConfig } from "@/utils/joditConfig";
import PrimaryButton from "../SharedComponents/PrimaryButton";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { decodeHtml } from "@/utils/decodeHtml";

export default function TermsConditionsAdmin() {
  const editor = useRef(null);
  const { data, isLoading } = useGetTermsQuery();
  const [updateTerms, { isLoading: isSaving }] = useUpdateTermsMutation();

  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (data?.terms) {
      setContent(decodeHtml(data.terms.content || ""));
      setTitle(data.terms.title || "Terms & Conditions");
    }
  }, [data]);

  const handleSave = async () => {
    try {
      await updateTerms({
        title,
        content,
        version: data?.terms.version || "1.0",
      }).unwrap();
      toast.success("Terms & Conditions updated successfully");
    } catch (err) {
      toast.error("Failed to update Terms & Conditions");
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-5">
        <div className="h-12 w-1/3 bg-slate-200 animate-pulse rounded-lg" />
        <div className="h-[550px] w-full bg-slate-200 animate-pulse rounded-xl" />
        <div className="mx-auto h-10 w-40 bg-slate-200 animate-pulse rounded-xl" />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Top Bar */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/user-management")}
          className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors group"
        >
          <ChevronLeft
            size={20}
            className="group-hover:-translate-x-0.5 transition-transform"
          />
        </button>
        <div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">
            Terms & Conditions
          </h1>
          <p className="text-xs text-slate-500">
            Edit and publish your latest terms & conditions
          </p>
        </div>
      </div>

      {/* Main Editor Card */}
      <JoditEditor
        ref={editor}
        value={content}
        config={{
          ...joditConfig,
          height: 550,
          placeholder: "Start writing content...",
        }}
        onBlur={(newContent) => setContent(newContent)}
      />

      <div className="flex items-center justify-center ">
        <PrimaryButton
          text={isSaving ? "Publishing..." : "Save Changes"}
          disabled={isSaving}
          onClick={handleSave}
          className="px-8 shadow-md"
        />
      </div>
    </div>
  );
}
