"use client";

import * as React from "react";
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  columnFilteringFeature,
  columnVisibilityFeature,
  createColumnHelper,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  FlexRender,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  tableFeatures,
  useTable,
  type ColumnFiltersState,
  type ColumnVisibilityState,
  type Row,
  type SortingState,
} from "@tanstack/react-table";
import { z } from "zod";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  GripVerticalIcon,
  EllipsisVerticalIcon,
  Columns3Icon,
  ChevronDownIcon,
  ChevronsLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsRightIcon,
} from "lucide-react";

// New in v9: declare the features this table uses — anything you don't
// register is tree-shaken out of the bundle.
const features = tableFeatures({
  columnFilteringFeature,
  columnVisibilityFeature,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  filteredRowModel: createFilteredRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  sortedRowModel: createSortedRowModel(),
});

const columnHelper = createColumnHelper<
  typeof features,
  z.infer<typeof schema>
>();

export const schema = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.email(),
  phone: z.string().optional(),
  role: z.enum(["admin", "technician"]).optional(),
  status: z.string().optional(),
  reviewer: z.string().optional(),
  /** Technician assigned to this client's appointment (clients table only). */
  personnelId: z.number().nullable().optional(),
});

export type TechnicianOption = {
  value: string;
  label: string;
};

/** The clients table shows a phone column and an editable status; the
 *  personnel table shows a role column instead. */
export type DataTableVariant = "clients" | "personnel";

const UNASSIGNED_VALUE = "unassigned";

export type Client = z.infer<typeof schema>;

export type Personnel = z.infer<typeof schema>;

const reviewerOptions = [
  "Maya Johnson",
  "Carlos Rodriguez",
  "Sarah Chen",
  "Raj Patel",
  "Leila Ahmadi",
  "Thomas Wilson",
  "Emma Davis",
];

const statusOptions = ["Open", "Requested", "Closed"] as const;

// Create a separate component for the drag handle
function DragHandle({ id }: { id: number }) {
  const { attributes, listeners } = useSortable({
    id,
  });
  return (
    <Button
      {...attributes}
      {...listeners}
      variant="ghost"
      size="icon"
      className="size-7 text-muted-foreground hover:bg-transparent"
    >
      <GripVerticalIcon className="size-3 text-muted-foreground" />
      <span className="sr-only">Drag to reorder</span>
    </Button>
  );
}
function createColumns(
  updateClient: (
    id: number,
    changes: Pick<Client, "reviewer" | "status">,
  ) => void,
  technicianOptions?: TechnicianOption[],
  assignTechnician?: (id: number, personnelId: number | null) => void,
  variant: DataTableVariant = "clients",
) {
  return columnHelper.columns([
    columnHelper.display({
      id: "drag",
      header: () => null,
      cell: ({ row }) => <DragHandle id={row.original.id} />,
    }),
    columnHelper.display({
      id: "select",
      header: ({ table }) => (
        <div className="flex items-center justify-center">
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            indeterminate={
              table.getIsSomePageRowsSelected() &&
              !table.getIsAllPageRowsSelected()
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    }),
    columnHelper.accessor("lastName", {
      header: "Last Name",
      cell: ({ getValue }) => getValue(),
      enableHiding: false,
    }),
    columnHelper.accessor("firstName", {
      header: "First Name",
      cell: ({ getValue }) => getValue(),
      enableHiding: false,
    }),
    columnHelper.accessor("email", {
      header: "Email Address",
      cell: ({ getValue }) => getValue(),
      enableHiding: false,
    }),
    ...(variant === "clients"
      ? [
          columnHelper.accessor("phone", {
            header: "Phone Number",
            cell: ({ getValue }) => getValue(),
            enableHiding: false,
          }),
        ]
      : []),
    ...(variant === "clients"
      ? [
          columnHelper.accessor("status", {
            header: "Status",
            cell: ({ row }) => (
              <Select
                value={row.original.status}
                onValueChange={(status) =>
                  updateClient(row.original.id, {
                    status: status as Client["status"],
                    reviewer: row.original.reviewer,
                  })
                }
                items={statusOptions.map((status) => ({
                  label: status,
                  value: status,
                }))}
              >
                <SelectTrigger
                  className="w-30 border-slate-200 bg-white shadow-sm"
                  size="sm"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {statusOptions.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            ),
          }),
        ]
      : []),
    ...(variant === "personnel"
      ? [
          columnHelper.accessor("role", {
            header: "Role",
            cell: ({ getValue }) => {
              const role = getValue();
              return role
                ? role.charAt(0).toUpperCase() + role.slice(1)
                : "";
            },
            enableHiding: false,
          }),
        ]
      : []),

    ...(assignTechnician && technicianOptions
      ? [
          columnHelper.display({
            id: "technician",
            header: "Technician",
            cell: ({ row }: { row: Row<typeof features, Client> }) => {
              const options: TechnicianOption[] = [
                { value: UNASSIGNED_VALUE, label: "Unassigned" },
                ...technicianOptions,
              ];
              const current = row.original.personnelId;
              return (
                <Select
                  value={current != null ? String(current) : UNASSIGNED_VALUE}
                  onValueChange={(value) => {
                    if (value === null) return;
                    assignTechnician(
                      row.original.id,
                      value === UNASSIGNED_VALUE ? null : Number(value),
                    );
                  }}
                  items={options}
                >
                  <SelectTrigger
                    className="w-44 border-slate-200 bg-white shadow-sm"
                    size="sm"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              );
            },
          }),
        ]
      : []),
    columnHelper.accessor("phone", {
      header: "Phone Number",
      cell: ({ getValue }) => getValue(),
      enableHiding: false,
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: ({ row }) => (
        <Select
          value={row.original.status}
          onValueChange={(status) =>
            updateClient(row.original.id, {
              status: status as Client["status"],
              reviewer: row.original.reviewer,
            })
          }
          items={statusOptions.map((status) => ({
            label: status,
            value: status,
          }))}
        >
          <SelectTrigger
            className="w-30 border-slate-200 bg-white shadow-sm"
            size="sm"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {statusOptions.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      ),
    }),
    columnHelper.accessor("reviewer", {
      header: "Reviewer",
      cell: ({ row }) => (
        <Select
          value={row.original.reviewer}
          onValueChange={(reviewer) => {
            if (reviewer) {
              updateClient(row.original.id, {
                reviewer,
                status: row.original.status,
              });
            }
          }}
          items={reviewerOptions.map((reviewer) => ({
            label: reviewer,
            value: reviewer,
          }))}
        >
          <SelectTrigger
            className="w-40 border-slate-200 bg-white shadow-sm"
            size="sm"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {reviewerOptions.map((reviewer) => (
                <SelectItem key={reviewer} value={reviewer}>
                  {reviewer}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      ),
    }),
    columnHelper.display({
      id: "actions",
      cell: () => (
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="ghost"
                className="flex size-8 text-muted-foreground data-open:bg-muted"
                size="icon"
              />
            }
          >
            <EllipsisVerticalIcon />
            <span className="sr-only">Open menu</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-32">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Make a copy</DropdownMenuItem>
            <DropdownMenuItem>Favorite</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    }),
  ]);
}
function DraggableRow({
  row,
}: {
  row: Row<typeof features, z.infer<typeof schema>>;
}) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id,
  });
  return (
    <TableRow
      data-state={row.getIsSelected() && "selected"}
      data-dragging={isDragging}
      ref={setNodeRef}
      className="relative z-0 bg-white data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          <FlexRender cell={cell} />
        </TableCell>
      ))}
    </TableRow>
  );
}
export function DataTable({
  data: initialData,
  actions,
  technicianOptions,
  onTechnicianChange,
  variant = "clients",
}: {
  data: z.infer<typeof schema>[];
  actions?: React.ReactNode;
  technicianOptions?: TechnicianOption[];
  onTechnicianChange?: (id: number, personnelId: number | null) => void;
  variant?: DataTableVariant;
}) {
  const [data, setData] = React.useState(() => initialData);
  const [syncedData, setSyncedData] = React.useState(() => initialData);

  if (syncedData !== initialData) {
    setSyncedData(initialData);
    setData(initialData);
  }
  const updateClient = React.useCallback(
    (id: number, changes: Pick<Client, "reviewer" | "status">) => {
      setData((clients) =>
        clients.map((client) =>
          client.id === id ? { ...client, ...changes } : client,
        ),
      );
    },
    [],
  );
  const assignTechnician = React.useCallback(
    (id: number, personnelId: number | null) => {
      setData((clients) =>
        clients.map((client) =>
          client.id === id ? { ...client, personnelId } : client,
        ),
      );
      onTechnicianChange?.(id, personnelId);
    },
    [onTechnicianChange],
  );

  const columns = React.useMemo(
    () => createColumns(updateClient, technicianOptions, assignTechnician, variant),
    [updateClient, technicianOptions, assignTechnician, variant],
  );
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<ColumnVisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const sortableId = React.useId();
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {}),
  );
  const dataIds = React.useMemo<UniqueIdentifier[]>(
    () => (Array.isArray(data) ? data.map(({ id }) => id) : []),
    [data],
  );
  const table = useTable({
    features,
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
  });
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setData((data) => {
        const oldIndex = dataIds.indexOf(active.id);
        const newIndex = dataIds.indexOf(over.id);
        return arrayMove(data, oldIndex, newIndex);
      });
    }
  }
  return (
    <Tabs
      defaultValue="outline"
      className="w-full flex-col justify-start gap-6"
    >
      <div className="flex items-center justify-between px-4 lg:px-6">
        <Label htmlFor="view-selector" className="sr-only">
          View
        </Label>
        <Select
          defaultValue="outline"
          items={[
            { label: "Outline", value: "outline" },
            { label: "Past Performance", value: "past-performance" },
            { label: "Key Personnel", value: "key-personnel" },
            { label: "Focus Documents", value: "focus-documents" },
          ]}
        >
          <SelectTrigger
            className="flex w-fit @4xl/main:hidden"
            size="sm"
            id="view-selector"
          >
            <SelectValue placeholder="Select a view" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="outline">Outline</SelectItem>
              <SelectItem value="past-performance">Past Performance</SelectItem>
              <SelectItem value="key-personnel">Key Personnel</SelectItem>
              <SelectItem value="focus-documents">Focus Documents</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <TabsList className="hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:bg-muted-foreground/30 **:data-[slot=badge]:px-1 @4xl/main:flex">
          <TabsTrigger value="outline">Outline</TabsTrigger>
          <TabsTrigger value="past-performance">
            Past Performance <Badge variant="secondary">3</Badge>
          </TabsTrigger>
          <TabsTrigger value="key-personnel">
            Key Personnel <Badge variant="secondary">2</Badge>
          </TabsTrigger>
          <TabsTrigger value="focus-documents">Focus Documents</TabsTrigger>
        </TabsList>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="outline"
                  size="sm"
                  className="border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-slate-50 hover:text-slate-900 dark:border-slate-200 dark:bg-white dark:text-slate-700 dark:hover:bg-slate-50 dark:hover:text-slate-900"
                />
              }
            >
              <Columns3Icon data-icon="inline-start" />
              Columns
              <ChevronDownIcon data-icon="inline-end" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
              {table
                .getAllColumns()
                .filter(
                  (column) =>
                    typeof column.accessorFn !== "undefined" &&
                    column.getCanHide(),
                )
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
          {actions}
        </div>
      </div>
      <TabsContent
        value="outline"
        className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6"
      >
        <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm">
          <DndContext
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis]}
            onDragEnd={handleDragEnd}
            sensors={sensors}
            id={sortableId}
          >
            <Table>
              <TableHeader className="sticky top-0 z-10 bg-slate-50/90">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id} className="bg-slate-50/90">
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id} colSpan={header.colSpan}>
                          {header.isPlaceholder ? null : (
                            <FlexRender header={header} />
                          )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody className="**:data-[slot=table-cell]:first:w-8">
                {table.getRowModel().rows?.length ? (
                  <SortableContext
                    items={dataIds}
                    strategy={verticalListSortingStrategy}
                  >
                    {table.getRowModel().rows.map((row) => (
                      <DraggableRow key={row.id} row={row} />
                    ))}
                  </SortableContext>
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </DndContext>
        </div>
        <div className="flex items-center justify-between px-4">
          <div className="hidden flex-1 text-sm text-muted-foreground lg:flex">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="flex w-full items-center gap-8 lg:w-fit">
            <div className="hidden items-center gap-2 lg:flex">
              <Label htmlFor="rows-per-page" className="text-sm font-medium">
                Rows per page
              </Label>
              <Select
                value={`${table.state.pagination.pageSize}`}
                onValueChange={(value) => {
                  table.setPageSize(Number(value));
                }}
                items={[10, 20, 30, 40, 50].map((pageSize) => ({
                  label: `${pageSize}`,
                  value: `${pageSize}`,
                }))}
              >
                <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                  <SelectValue placeholder={table.state.pagination.pageSize} />
                </SelectTrigger>
                <SelectContent side="top">
                  <SelectGroup>
                    {[10, 20, 30, 40, 50].map((pageSize) => (
                      <SelectItem key={pageSize} value={`${pageSize}`}>
                        {pageSize}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-fit items-center justify-center text-sm font-medium">
              Page {table.state.pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </div>
            <div className="ml-auto flex items-center gap-2 lg:ml-0">
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to first page</span>
                <ChevronsLeftIcon />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to previous page</span>
                <ChevronLeftIcon />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to next page</span>
                <ChevronRightIcon />
              </Button>
              <Button
                variant="outline"
                className="hidden size-8 lg:flex"
                size="icon"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to last page</span>
                <ChevronsRightIcon />
              </Button>
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent
        value="past-performance"
        className="flex flex-col px-4 lg:px-6"
      >
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
      </TabsContent>
      <TabsContent value="key-personnel" className="flex flex-col px-4 lg:px-6">
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
      </TabsContent>
      <TabsContent
        value="focus-documents"
        className="flex flex-col px-4 lg:px-6"
      >
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
      </TabsContent>
    </Tabs>
  );
}
