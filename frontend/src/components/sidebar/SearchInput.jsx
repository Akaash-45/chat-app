import React, { useState } from "react";
import { Search, Terminal } from "lucide-react";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;

    const conversation = conversations.find((c) =>
      c.fullName.toLowerCase().includes(search.toLowerCase()),
    );

    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      toast.error("USER_NOT_FOUND");
    }
  };

  return (
    <div className="relative animate-slideIn2D">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-white/40 group-focus-within:text-white transition-colors duration-300" />
        </div>
        <input
          type="text"
          placeholder="Search users..."
          className="input-2d w-full pl-10 pr-4 py-2 text-sm text-mono"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="absolute inset-y-0 right-3 flex items-center">
          <Terminal className="h-4 w-4 text-white/20" />
        </div>
      </form>

      {/* Search indicator line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mt-2"></div>
    </div>
  );
};

export default SearchInput;
