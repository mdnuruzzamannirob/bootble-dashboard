import { useNavigate, useParams } from "react-router-dom";
import {
  Mail,
  Loader2,
  Flame,
  Footprints,
  Moon,
  Droplets,
  UserCheck,
  Ban,
  ShieldCheck,
  Clock,
  Target,
  Zap,
  Activity,
  AlertCircle,
  CheckCircle2,
  ChevronLeft,
} from "lucide-react";
import { toast } from "react-toastify";
import BackButton from "../SharedComponents/BackButton";
import {
  useGetUserDetailsQuery,
  useBlockUnblockUserMutation,
} from "@/store/features/user/userApi";

export default function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: { user = [] } = {},
    isLoading,
    isError,
  } = useGetUserDetailsQuery(id);
  const [blockUnblockUser, { isLoading: isBlocking }] =
    useBlockUnblockUserMutation();

  if (isLoading)
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="animate-spin text-slate-400" />
      </div>
    );

  if (isError || !user)
    return (
      <div className="p-10 text-center text-slate-500 font-medium">
        User not found or something went wrong.
      </div>
    );

  const handleStatusToggle = async () => {
    try {
      await blockUnblockUser({
        id: user?.id,
        data: { block: !user?.isBlocked },
      }).unwrap();
      toast.success(
        `User ${user?.isBlocked ? "unblocked" : "blocked"} successfully`
      );
    } catch (err) {
      toast.error(err?.data?.message || "Operation failed");
    }
  };

  return (
    <>
      {/* Header Area */}
      <div className="flex mb-6 flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex gap-4 items-center">
          {/* Back Button Box */}
          <button
            onClick={() => navigate("/user-management")}
            className="flex items-center justify-center size-10 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all  cursor-pointer group"
          >
            <ChevronLeft
              size={22}
              strokeWidth={2.5}
              className="group-hover:-translate-x-0.5 transition-transform"
            />
          </button>

          {/* Title */}
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
            User Details
          </h2>
        </div>

        <button
          onClick={handleStatusToggle}
          disabled={isBlocking}
          className={`px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-sm ${
            user?.isBlocked
              ? "bg-emerald-600 text-white  hover:bg-emerald-700"
              : "bg-red-600 text-white hover:bg-red-700"
          }`}
        >
          {isBlocking ? (
            <Loader2 className="size-4 animate-spin" />
          ) : user?.isBlocked ? (
            <UserCheck className="size-4" />
          ) : (
            <Ban className="size-4" />
          )}
          {user?.isBlocked ? "Unblock User" : "Block User"}
        </button>
      </div>

      {/* Profile Card */}
      <div className="bg-white mb-6 rounded-2xl border border-slate-200 p-6 flex flex-col md:flex-row items-center gap-6">
        <img
          src={
            user?.profilePhoto?.url ||
            `https://ui-avatars.com/api/?name=${user?.fullName}&background=random`
          }
          className="size-28 rounded-full border-4 border-slate-50 object-cover"
          alt=""
        />
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl font-extrabold text-slate-900">
            {user?.fullName}
          </h2>
          <p className="text-slate-500 flex items-center justify-center md:justify-start gap-2 mt-1">
            <Mail className="size-4" /> {user?.email}
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-4">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-bold uppercase ${
                user?.isBlocked
                  ? "bg-red-50 text-red-600"
                  : "bg-emerald-50 text-emerald-600"
              }`}
            >
              <span
                className={`size-1.5 rounded-full ${
                  user?.isBlocked ? "bg-red-500" : "bg-emerald-500"
                }`}
              />
              {user?.isBlocked ? "Blocked" : "Active"}
            </span>

            <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-lg text-[10px] font-bold uppercase">
              {user?.subscription?.plan} - {user?.subscription?.status}
            </span>
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-bold uppercase border transition-all ${
                user?.isVerified
                  ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                  : "bg-amber-50 text-amber-600 border-amber-100"
              }`}
            >
              {user?.isVerified ? (
                <ShieldCheck className="size-3" strokeWidth={2.5} />
              ) : (
                <AlertCircle className="size-3" strokeWidth={2.5} />
              )}
              {user?.isVerified ? "Verified" : "Unverified"}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: Account Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-5 flex items-center gap-2">
              <Clock className="size-4" /> Account Info
            </h3>
            <div className="space-y-4">
              <InfoRow
                label="Joined"
                value={new Date(user?.createdAt).toLocaleDateString()}
              />
              <InfoRow
                label="Last Update"
                value={new Date(user?.updatedAt).toLocaleDateString()}
              />
              <InfoRow
                label="Trial Ends"
                value={new Date(
                  user?.subscription.trialEnds
                ).toLocaleDateString()}
              />
              <InfoRow
                label="Height Unit"
                value={
                  user?.height.value
                    ? user?.height.value + " " + user?.height.unit
                    : "-"
                }
              />
              <InfoRow
                label="Weight Unit"
                value={
                  user?.weight.value
                    ? user?.weight.value + " " + user?.weight.unit
                    : "-"
                }
              />
            </div>
          </div>
        </div>

        {/* Right Side: Targets & Stats */}
        <div className="lg:col-span-2 space-y-6">
          {/* Health Targets Grid */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 ">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-5 flex items-center gap-2">
              <Target className="size-4" /> Daily Targets
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <TargetItem
                icon={<Zap className="text-orange-500" />}
                label="Calories"
                value={`${user?.healthTargets.calories} kcal`}
              />
              <TargetItem
                icon={<Footprints className="text-blue-500" />}
                label="Steps"
                value={user?.healthTargets.steps}
              />
              <TargetItem
                icon={<Activity className="text-red-500" />}
                label="Workout"
                value={`${user?.healthTargets.workout} min`}
              />
              <TargetItem
                icon={<Moon className="text-indigo-500" />}
                label="Sleep"
                value={`${user?.healthTargets.sleep} hrs`}
              />
              <TargetItem
                icon={<Droplets className="text-cyan-500" />}
                label="Water"
                value={`${user?.healthTargets.water} L`}
              />
            </div>
          </div>

          {/* Life-time Statistics */}
          <div className="bg-slate-900 rounded-2xl p-6 text-white">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-5 flex items-center gap-2">
              <Activity className="size-4 text-indigo-400" /> Lifetime
              Statistics
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4">
              <StatItem
                label="Days Tracked"
                value={user?.statistics.health.daysTracked}
              />
              <StatItem
                label="Total Steps"
                value={user?.statistics.health.totalSteps}
              />
              <StatItem
                label="Total Burned"
                value={`${user?.statistics.health.totalCaloriesBurned} kcal`}
              />
              <StatItem
                label="Sleep Logged"
                value={`${user?.statistics.health.totalSleepHours} hrs`}
              />
              <StatItem
                label="Water Intake"
                value={`${user?.statistics.health.totalWaterIntake} L`}
              />
              <StatItem
                label="Transactions"
                value={user?.statistics.totalTransactions}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Internal Small Components for Organization
function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between items-center border-b border-slate-50 pb-2">
      <span className="text-xs font-semibold text-slate-400 uppercase">
        {label}
      </span>
      <span className="text-sm font-bold text-slate-700">{value}</span>
    </div>
  );
}

function TargetItem({ icon, label, value }) {
  return (
    <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
      <div className="size-8 bg-white rounded-lg flex items-center justify-center shadow-sm mb-3">
        {icon}
      </div>
      <p className="text-[10px] font-bold text-slate-400 uppercase leading-none">
        {label}
      </p>
      <p className="text-sm font-extrabold text-slate-800 mt-1">{value}</p>
    </div>
  );
}

function StatItem({ label, value }) {
  return (
    <div>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
        {label}
      </p>
      <p className="text-xl font-bold text-white mt-0.5">{value}</p>
    </div>
  );
}
