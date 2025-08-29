import { Search as SearchIcon } from "lucide-react";
import Button from "./button";

type SearchProps = {
  type?: "text" | "number" | "email";
  placeholder?: string;
  className?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: () => void;
};

const SearchInput = ({
  type = "text",
  placeholder = "Search...",
  className,
  value,
  onChange,
  onSubmit,
}: SearchProps) => {
  return (
    <div className="flex items-center w-full max-w-md">
      {/* Input wrapper */}
      <div className="rounded flex items-center flex-1 border border-gray-300 rounded-l overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
        <SearchIcon className="ml-2 text-gray-500" size={20} />
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`flex-1 p-2 bg-transparent outline-none ${
            className || ""
          }`}
        />
      </div>

      {/* Outside button */}
      <Button
        type="submit"
        className="rounded-r px-4 bg-blue-500 text-white hover:bg-blue-600 ml-2"
        onClick={onSubmit}
      >
        Search
      </Button>
    </div>
  );
};

export default SearchInput;
