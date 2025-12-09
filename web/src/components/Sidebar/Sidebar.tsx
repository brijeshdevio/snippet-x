import { Link, useSearchParams } from "react-router-dom";
import { ChevronDown, ChevronRight, ChevronUp, Plus, X } from "lucide-react";
import { languages } from "@/data";
import { useEffect, useState } from "react";
import { useFolder } from "@/hooks/useFolder";

interface FolderItemProps {
  name: string;
  _id: string;
}

interface LanguageItemProps {
  name: string;
}

function FolderItem({ name, _id }: FolderItemProps) {
  const [query, setQuery] = useSearchParams();

  const handleClick = () => {
    const folder = new URLSearchParams(query);
    if (folder) {
      setQuery({ folder: _id });
    } else {
      setQuery({});
    }
  };

  return (
    <li
      key={name}
      onClick={handleClick}
      className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-base-200 hover:drop-shadow"
    >
      <div className="w-8 h-8 flex items-center justify-center text-xs bg-base-200 border border-white/5 rounded-xl">
        <span>{name[0]}</span>
      </div>
      <div className="text-sm">
        <p>{name}</p>
      </div>
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
    isSidebarOpen: false,
  });
  const { refetch, data } = useFolder().getFoldersQuery;

  const handleFolderToggle = () => {
    setToggle((pre) => ({ ...pre, isFolderOpen: !toggle.isFolderOpen }));
  };

  const handleLanguageToggle = () => {
    setToggle((pre) => ({ ...pre, isLanguageOpen: !toggle.isLanguageOpen }));
  };

  const handleSidebarToggle = () => {
    setToggle((pre) => ({ ...pre, isSidebarOpen: !toggle.isSidebarOpen }));
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div
      className={`fixed md:sticky left-0 h-[calc(100vh-57px)] w-full z-50 bg-base-300/70 md:w-fit ${
        !toggle.isSidebarOpen && "!w-fit"
      }`}
    >
      <div
        className={`fixed top-16 left-[-5px] w-fit h-fit rounded md:hidden ${
          toggle.isSidebarOpen && "hidden"
        }`}
      >
        <button
          className="btn btn-primary !px-0 "
          onClick={handleSidebarToggle}
        >
          <ChevronRight />
        </button>
      </div>
      <div
        className={`fixed top-16 left-[290px] sm:left-96 w-fit h-fit rounded md:hidden  ${
          !toggle.isSidebarOpen && "hidden"
        }`}
      >
        <button className="btn btn-circle btn-sm" onClick={handleSidebarToggle}>
          <X />
        </button>
      </div>
      <aside
        className={`w-[280px] sm:w-80 h-[calc(100vh-57px)] ${
          toggle.isSidebarOpen ? "fixed flex" : "hidden"
        } md:sticky  md:flex flex-col gap-5 p-3 bg-base-100 border-r border-white/5 z-50`}
      >
        <div className="text-center px-3">
          <Link to="/new" className="btn btn-primary btn-sm w-full">
            <Plus size={20} />
            New Snippet
          </Link>
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
              {data?.folders?.map((f: FolderItemProps) => (
                <FolderItem key={f._id} {...f} />
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
    </div>
  );
}
