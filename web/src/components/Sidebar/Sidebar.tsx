import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp, Plus } from "lucide-react";
import { languages, snippetFolders } from "@/data";
import { useState } from "react";

interface FolderItemProps {
  name: string;
}

interface LanguageItemProps {
  name: string;
}

function FolderItem({ name }: FolderItemProps) {
  return (
    <li key={name}>
      <Link
        to="/"
        className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-base-200 hover:drop-shadow"
      >
        <div className="w-8 h-8 flex items-center justify-center text-xs bg-base-200 border border-white/5 rounded-xl">
          <span>{name[0]}</span>
        </div>
        <div className="text-sm">
          <p>{name}</p>
        </div>
      </Link>
    </li>
  );
}

function LanguageItem({ name }: LanguageItemProps) {
  return (
    <li key={name}>
      <Link
        to="/"
        className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-base-200 hover:drop-shadow"
      >
        <div className="w-8 h-8 flex items-center justify-center text-xs bg-base-200 border border-white/5 rounded-xl">
          <span>{name[0]}</span>
        </div>
        <div className="text-sm">
          <p>{name}</p>
        </div>
      </Link>
    </li>
  );
}

export function Sidebar() {
  const [toggle, setToggle] = useState({
    isFolderOpen: true,
    isLanguageOpen: true,
  });

  const handleFolderToggle = () => {
    setToggle((pre) => ({ ...pre, isFolderOpen: !toggle.isFolderOpen }));
  };

  const handleLanguageToggle = () => {
    setToggle((pre) => ({ ...pre, isLanguageOpen: !toggle.isLanguageOpen }));
  };

  return (
    <aside className="w-80 h-[calc(100vh-57px)] hidden md:flex flex-col gap-5 p-3 bg-base-100 border-r border-white/5 ">
      <div className="text-center px-3">
        <button className="btn btn-primary btn-sm w-full">
          <Plus size={20} />
          New Snippet
        </button>
      </div>

      <div>
        <div className="flex items-center gap-3">
          <span className="text-sm opacity-70">Folders</span>
          <button
            className="btn btn-sm btn-ghost btn-circle"
            onClick={handleFolderToggle}
          >
            {toggle.isLanguageOpen ? (
              <ChevronDown size={20} />
            ) : (
              <ChevronUp size={20} />
            )}
          </button>
          <button className="ml-auto btn btn-sm btn-ghost btn-circle">
            <Plus size={15} />
          </button>
        </div>

        {toggle.isFolderOpen && (
          <ul className="max-h-[calc(100vh-160px*2.5)] overflow-y-scroll">
            {snippetFolders?.map((f) => (
              <FolderItem key={f} name={f} />
            ))}
          </ul>
        )}
      </div>

      <div>
        <div className="flex items-center gap-3">
          <span className="text-sm opacity-70">Language</span>
          <button
            className="btn btn-sm btn-ghost btn-circle"
            onClick={handleLanguageToggle}
          >
            {toggle.isLanguageOpen ? (
              <ChevronDown size={20} />
            ) : (
              <ChevronUp size={20} />
            )}
          </button>
        </div>
        {toggle.isLanguageOpen && (
          <ul className="max-h-[calc(100vh-160px*3)] overflow-y-scroll">
            {languages?.map((f) => (
              <LanguageItem key={f} name={f} />
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
}
