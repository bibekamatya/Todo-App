import Button from "./Button";
interface CardHeaderProps {
  setOpen: (open: boolean) => void;
  isPending: boolean;
}
const CardHeader = ({ setOpen, isPending }: CardHeaderProps) => {
  return (
    <div className="bg-linear-to-r from-purple-600 to-pink-600 px-6 py-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">My Tasks</h2>
        <Button
          onClick={() => setOpen(true)}
          disabled={isPending}
          className="px-4 py-2 bg-white text-purple-600 rounded-lg font-medium hover:bg-purple-50 transition shadow-lg disabled:opacity-50 flex items-center gap-2 text-sm"
        >
          + New Task
        </Button>
      </div>
    </div>
  );
};

export default CardHeader;
