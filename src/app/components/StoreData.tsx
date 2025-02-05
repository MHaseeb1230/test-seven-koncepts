import React, { useEffect, useState } from "react";
import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { fetchStoreFamilies, fetchParentStores } from "../../app/utils/api/api"; // Import the API functions

const TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyNiIsImp0aSI6IjdlMDE2MzRmMzRhZGFhZWIxMzhmMjM5YzVkOWE3N2U3ZWMzYmRkNzBhZTgzYzQ1MTkzMTExMTdlNWUyNDUwODVkNzNhYzJlZTIzNjE3ZmQyIiwiaWF0IjoxNzM4NjczMjAyLjc2MTMyNCwibmJmIjoxNzM4NjczMjAyLjc2MTMyNywiZXhwIjoxNzcwMjA5MjAyLjQ0MjI0OSwic3ViIjoiNSIsInNjb3BlcyI6W119.k2M_xWbdRCB0cIHZigRH7U1l0BYGFNVcvXqTEGhrahxxPKHOSRYIlLGTGlqmBs8EhuJ2v_kJUW_SmeeL18Xcc26U12lEqpOrA7Gf8lrj_HAmjI0b938Qgrg4EReeAXcSu-GEgQNbnQ5EgJh-d3P-NgJjlmE1Lwki0I-UWWnUFiQ2ngSzSkPal3q-taR9KgAIkAZw8GvhRh_BnbZ2XhRvFZGCyQzoZ38w0PxX7nFlDuUydbV8YoPM4ATWiCtPOhoCEnwBUSL_EM9asuiLWMbRIFQLsEi7Rqx3JhQYvjBb4c8aiNbuggE_HWzbff5gM89VhfphbYf2PfMbi2gQtFlknXWBnMJ407y2x8vbJF7zcvFGRUUUl4cnX6PeV0T9jC8S4Tmx8j3qTfxBwiIb7X5z-eWa7npNpxICWumNMsqEFoHfsJhdWk7wG4yELjmOblBcwLDz7SW3shD6NnSRw9w4mPwbQ8-NvLVNfGGrh0jn5RVm6_tcsiTRNEYVObf1_SfN4lb6i38jZdVEDWw34YVviSeiRDtdgkEZDW9wsY-qCzbS9ax2_tEgdOYweZA_4hibDYFiW-YKkc4HaqlOgkw97ErTG8e7WuVKzyh00P5dIQPwnt5oQ6LFJa-XE3g7hdJGNS--XLwK-2rimr3B3dN5rg4bAmws8baTmSXzX7uZ5os"; // Replace with actual token

type StoreFamily = {
  id: number;
  name: string;
  interval: number;
  storeName: string;
  store: string;
  marketplaceName: string;
  companyName: string;
  created_at: string;
  nick_name: string;
  company: string;
};

const columnHelper = createColumnHelper<StoreFamily>();

const StoreData = () => {
  const [data, setData] = useState<StoreFamily[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [parentStoresList, setParentStoresList] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);

  const fetchData = async (page: number) => {
    setLoading(true);
    setError(null);
    try {
      const result1 = await fetchStoreFamilies(TOKEN, page);
      const extractedData = result1?.Lists?.storesList?.data || [];
      setData(extractedData);
      setLastPage(result1?.Lists?.storesList?.last_page || 1);
    } catch (error) {
      console.error("Error fetching Store Families data:", error);
      setError("Failed to fetch Store Families data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const fetchParentStoresList = async () => {
    try {
      const result3 = await fetchParentStores(TOKEN);
      setParentStoresList(result3.data || []);
    } catch (error) {
      console.error("Error fetching Parent Stores List data:", error);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  useEffect(() => {
    fetchParentStoresList();
  }, []);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (id: number, key: string, value: any) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, [key]: value } : item
      )
    );
  };

  const columns: ColumnDef<StoreFamily, any>[] = [
    columnHelper.accessor("interval", {
      header: "Interval",
      cell: (info) =>
        isEditing ? (
          <input
            type="text"
            value={info.getValue() as string}
            onChange={(e) =>
              handleChange(info.row.original.id, "interval", e.target.value)
            }
          />
        ) : (
          (info.getValue() as string) || "N/A"
        ),
    }),
    columnHelper.accessor("companyName", {
      header: "Company Name",
      cell: (info) =>
        isEditing ? (
          <input
            type="text"
            value={info.getValue() as string}
            onChange={(e) =>
              handleChange(info.row.original.id, "companyName", e.target.value)
            }
          />
        ) : (
          (info.getValue() as string) || "N/A"
        ),
    }),
    columnHelper.accessor("created_at", {
      header: "Created At",
      cell: (info) =>
        isEditing ? (
          <input
            type="date"
            value={new Date(info.getValue() as string).toISOString().split('T')[0]}
            onChange={(e) =>
              handleChange(info.row.original.id, "created_at", e.target.value)
            }
          />
        ) : (
          new Date(info.getValue() as string).toLocaleDateString()
        ),
    }),
    columnHelper.accessor("company", {
      header: "Company Nick Name",
      cell: (info) => {
        const value = info.getValue() as { nick_name?: string };
        return isEditing ? (
          <input
            type="text"
            value={value?.nick_name || ""}
            onChange={(e) =>
              handleChange(info.row.original.id, "company", {
                ...value,
                nick_name: e.target.value,
              })
            }
          />
        ) : (
          value?.nick_name || "N/A"
        );
      },
    }),
    columnHelper.accessor("store", {
      header: "Parent Store",
      cell: (info) => {
        const value = info.getValue() as { storeName?: string };
        return isEditing ? (
          <select
            value={value?.storeName || ""}
            onChange={(e) =>
              handleChange(info.row.original.id, "store", {
                ...value,
                storeName: e.target.value,
              })
            }
          >
            {parentStoresList.map((store) => (
              <option key={store.id} value={store.storeName}>
                {store.storeName}
              </option>
            ))}
          </select>
        ) : (
          value?.storeName || "N/A"
        );
      },
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      <button
        onClick={handleEdit}
        className="mb-4 p-2 bg-blue-500 text-white rounded"
      >
        {isEditing ? "Save" : "Edit"}
      </button>
      <table className="border-collapse border border-gray-300 w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="bg-gray-200">
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="border p-2">
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="border p-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="mr-2 p-2 bg-blue-500 text-white rounded"
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, lastPage))}
          disabled={currentPage === lastPage}
          className="p-2 bg-blue-500 text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default StoreData;