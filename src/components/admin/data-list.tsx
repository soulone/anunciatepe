"use client";

import { Search } from "lucide-react";
import { useState } from "react";

interface Column {
  key: string;
  label: string;
  render?: (value: any, item: any) => React.ReactNode;
}

interface DataListProps {
  columns: Column[];
  data: any[];
  searchKeys?: string[];
  filterOptions?: { label: string; value: string }[];
  filterKey?: string;
  onEdit?: (item: any) => void;
  onDelete?: (item: any) => void;
  onNew?: () => void;
  newLabel?: string;
  emptyMessage?: string;
  loading?: boolean;
}

export function DataList({
  columns,
  data,
  searchKeys = ["title", "name"],
  filterOptions,
  filterKey,
  onEdit,
  onDelete,
  onNew,
  newLabel = "+ Nuevo",
  emptyMessage = "No hay elementos todavía.",
  loading,
}: DataListProps) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  const filtered = data.filter((item) => {
    const matchesSearch = search
      ? searchKeys.some((key) =>
          String(item[key] ?? "").toLowerCase().includes(search.toLowerCase())
        )
      : true;
    const matchesFilter = filter && filterKey
      ? item[filterKey] === filter
      : true;
    return matchesSearch && matchesFilter;
  });

  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex flex-1 items-center gap-3 rounded-[16px] bg-[#141416] px-4 py-2.5">
          <Search className="h-4 w-4 text-[#909296]" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar..."
            className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-[#909296]/50"
          />
        </div>
        {filterOptions && (
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-[12px] bg-[#141416] px-4 py-2.5 text-sm text-white outline-none"
          >
            <option value="">Todos</option>
            {filterOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        )}
        {onNew && (
          <button
            onClick={onNew}
            className="inline-flex h-10 shrink-0 items-center gap-2 rounded-full bg-[#F26A2E] px-5 text-sm font-bold text-white transition-colors hover:bg-[#F26A2E]/90 active:scale-[0.97]"
          >
            {newLabel}
          </button>
        )}
      </div>

      {loading ? (
        <div className="space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-20 animate-pulse rounded-[16px] bg-white/5" />
          ))}
        </div>
      ) : filtered.length > 0 ? (
        <div className="space-y-2">
          {filtered.map((item, i) => (
            <div key={item.id ?? i} className="card-dark flex items-center gap-4 rounded-[16px] p-4 transition-all hover:bg-white/5">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap gap-2">
                  {columns.map((col) => (
                    <div key={col.key} className={col.key === "title" || col.key === "name" ? "w-full" : ""}>
                      {col.render
                        ? col.render(item[col.key], item)
                        : <span className="text-sm text-white">{String(item[col.key] ?? "")}</span>
                      }
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                {onEdit && (
                  <button onClick={() => onEdit(item)} className="flex h-9 w-9 items-center justify-center rounded-xl text-[#909296] transition-colors hover:bg-white/10 hover:text-white active:scale-[0.97]">
                    ✏️
                  </button>
                )}
                {onDelete && (
                  <button onClick={() => onDelete(item)} className="flex h-9 w-9 items-center justify-center rounded-xl text-[#909296] transition-colors hover:bg-red-500/10 hover:text-red-400 active:scale-[0.97]">
                    🗑️
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-[24px] bg-[#141416] p-12 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F26A2E]/10 text-2xl">
            📦
          </div>
          <p className="mt-4 text-sm text-[#909296]">{emptyMessage}</p>
          {onNew && (
            <button onClick={onNew} className="mt-4 inline-flex h-10 items-center gap-2 rounded-full bg-[#F26A2E] px-5 text-sm font-bold text-white transition-colors hover:bg-[#F26A2E]/90 active:scale-[0.97]">
              {newLabel}
            </button>
          )}
        </div>
      )}

      {filtered.length > 0 && (
        <p className="mt-3 text-xs text-[#909296]/60">
          Mostrando {filtered.length} de {data.length} resultados
        </p>
      )}
    </div>
  );
}
