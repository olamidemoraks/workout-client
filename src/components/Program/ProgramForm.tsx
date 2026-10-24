"use client";
import {
  ProgramInput,
  createProgram,
  deleteProgram,
  getProgram,
  updateProgram,
} from "@/api/program";
import { cn } from "@/libs/utils";
import { toDayKey } from "@/utils";
import { ArrowDown, ArrowLeft, ArrowUp, Loader2, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "react-query";
import DeleteModal from "../Modal/DeleteModal";
import { PrimaryButton, focusRing, inputClassName } from "../auth/FormControls";

type ProgramFormProps = {
  // Edit an existing program when set; otherwise create a new one.
  id?: string;
};

type ExerciseRow = {
  key: string;
  _id?: string;
  name: string;
  sets: string;
  reps: string;
};

type RowErrors = { name?: string; sets?: string; reps?: string };

const MAX_EXERCISES = 50;
const MAX_SETS = 20;

const iconButtonClassName = cn(
  "group grid h-9 w-9 place-items-center rounded-lg hover:bg-zinc-800 transition-colors disabled:opacity-30 disabled:pointer-events-none",
  focusRing
);
// The global `* { color: white }` rule reaches SVGs, so icons get explicit strokes.
const iconClassName = "stroke-zinc-400 group-hover:stroke-white transition-colors";

// Mirrors the server's rules so problems show on the field before saving.
const validate = (name: string, rows: ExerciseRow[]) => {
  const rowErrors: Record<string, RowErrors> = {};
  let nameError: string | undefined;
  let formError: string | undefined;

  if (!name.trim()) nameError = "Give your program a name";
  else if (name.trim().length > 60) nameError = "Keep the name under 60 characters";

  if (rows.length === 0) formError = "Add at least one exercise";

  rows.forEach((row) => {
    const errors: RowErrors = {};
    const sets = Number(row.sets);
    if (!row.name.trim()) errors.name = "Name the exercise";
    else if (row.name.trim().length > 80) errors.name = "Keep it under 80 characters";
    if (!Number.isInteger(sets) || sets < 1 || sets > MAX_SETS)
      errors.sets = `1–${MAX_SETS}`;
    if (!row.reps.trim()) errors.reps = "Add reps";
    else if (row.reps.trim().length > 20) errors.reps = "Too long";
    if (Object.keys(errors).length) rowErrors[row.key] = errors;
  });

  const hasErrors = !!nameError || !!formError || Object.keys(rowErrors).length > 0;
  return { nameError, formError, rowErrors, hasErrors };
};

const ProgramForm: React.FC<ProgramFormProps> = ({ id }) => {
  const isEditing = !!id;
  const router = useRouter();
  const queryClient = useQueryClient();
  const today = toDayKey(new Date());

  const nextKey = useRef(0);
  const newRow = (): ExerciseRow => ({
    key: `new-${nextKey.current++}`,
    name: "",
    sets: "3",
    reps: "10",
  });

  const [name, setName] = useState("");
  const [rows, setRows] = useState<ExerciseRow[]>(() => (isEditing ? [] : [newRow()]));
  const [submitted, setSubmitted] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [initialised, setInitialised] = useState(!isEditing);
  const lastRowNameRef = useRef<HTMLInputElement | null>(null);
  const focusNewRow = useRef(false);

  const { data, isLoading: loadingProgram, isError } = useQuery({
    queryFn: async () => await getProgram({ id: id!, date: today }),
    queryKey: ["program", id, today],
    enabled: isEditing,
    refetchOnWindowFocus: false,
  });

  // Fill the form once when editing; later refetches mustn't wipe edits.
  useEffect(() => {
    const program: IProgram | undefined = data?.program;
    if (!isEditing || initialised || !program) return;
    setName(program.name);
    setRows(
      program.exercises.map((exercise) => ({
        key: exercise._id,
        _id: exercise._id,
        name: exercise.name,
        sets: String(exercise.sets),
        reps: exercise.reps,
      }))
    );
    setInitialised(true);
  }, [data, isEditing, initialised]);

  // Put the cursor in a newly added exercise.
  useEffect(() => {
    if (focusNewRow.current) {
      lastRowNameRef.current?.focus();
      focusNewRow.current = false;
    }
  }, [rows.length]);

  const onSaved = (response: any, message: string) => {
    const saved: IProgram = response?.program;
    queryClient.invalidateQueries("programs");
    if (saved) queryClient.setQueryData(["program", saved._id, today], response);
    toast.success(message);
    router.push(`/programs/${saved?._id ?? id}`);
  };
  const onSaveError = (error: any) => {
    toast.error(error?.message ?? "Couldn't save your program. Try again.");
  };

  const { mutate: create, isLoading: creating } = useMutation({
    mutationFn: createProgram,
    onSuccess: (response) => onSaved(response, "Program created"),
    onError: onSaveError,
  });
  const { mutate: update, isLoading: updating } = useMutation({
    mutationFn: updateProgram,
    onSuccess: (response) => onSaved(response, "Program saved"),
    onError: onSaveError,
  });
  const { mutate: remove, isLoading: deleting } = useMutation({
    mutationFn: deleteProgram,
    onSuccess: () => {
      queryClient.invalidateQueries("programs");
      queryClient.removeQueries(["program", id]);
      toast.success("Program deleted");
      router.replace("/programs");
    },
    onError: (error: any) => {
      setConfirmDelete(false);
      toast.error(error?.message ?? "Couldn't delete the program.");
    },
  });

  const { nameError, formError, rowErrors, hasErrors } = validate(name, rows);
  const saving = creating || updating;

  const updateRow = (key: string, field: keyof Omit<ExerciseRow, "key" | "_id">, value: string) =>
    setRows((prev) => prev.map((row) => (row.key === key ? { ...row, [field]: value } : row)));
  const removeRow = (key: string) => setRows((prev) => prev.filter((row) => row.key !== key));
  const moveRow = (index: number, direction: -1 | 1) =>
    setRows((prev) => {
      const next = [...prev];
      const target = index + direction;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  const addRow = () => {
    focusNewRow.current = true;
    setRows((prev) => [...prev, newRow()]);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
    if (hasErrors) return;

    const value: ProgramInput = {
      name: name.trim(),
      exercises: rows.map((row) => ({
        ...(row._id && { _id: row._id }),
        name: row.name.trim(),
        sets: Number(row.sets),
        reps: row.reps.trim(),
      })),
    };
    if (isEditing) update({ id: id!, value, date: today });
    else create({ value, date: today });
  };

  if (isEditing && loadingProgram) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (isEditing && (isError || !data?.program)) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <p className="text-lg font-semibold">Program not found</p>
        <button
          type="button"
          onClick={() => router.push("/programs")}
          className="mt-4 font-semibold text-emerald-400 hover:text-emerald-300"
        >
          Back to programs
        </button>
      </div>
    );
  }

  const fieldError = (message?: string) =>
    submitted && message ? <p className="mt-1 text-xs text-primary">{message}</p> : null;

  return (
    <div className="mx-auto mb-24 w-full max-w-2xl px-4">
      <DeleteModal
        open={confirmDelete}
        setClose={() => setConfirmDelete(false)}
        handleAction={() => remove({ id: id! })}
        isLoading={deleting}
      />

      <button
        type="button"
        onClick={() => router.back()}
        aria-label="Go back"
        className={cn(
          "mb-4 bg-zinc-900 rounded-lg h-[40px] w-[40px] flex items-center justify-center hover:bg-emerald-600 transition-colors",
          focusRing
        )}
      >
        <ArrowLeft />
      </button>

      <h1 className="text-2xl font-semibold uppercase">
        {isEditing ? "Edit program" : "New program"}
      </h1>
      <p className="mt-1 text-zinc-400">
        List the exercises in the order you do them, with sets and reps.
      </p>

      <form onSubmit={handleSubmit} noValidate className="mt-6 flex flex-col gap-6">
        <div>
          <label htmlFor="program-name" className="mb-2 block text-sm font-medium text-zinc-300">
            Program name
          </label>
          <input
            id="program-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Push day"
            maxLength={60}
            aria-invalid={submitted && !!nameError}
            className={cn(inputClassName, {
              "border-red-500/70": submitted && nameError,
            })}
          />
          {fieldError(nameError)}
        </div>

        <fieldset className="flex flex-col gap-3">
          <legend className="mb-2 text-sm font-medium text-zinc-300">
            Exercises <span className="text-zinc-500">({rows.length})</span>
          </legend>

          {rows.map((row, index) => {
            const errors = submitted ? rowErrors[row.key] ?? {} : {};
            return (
              <div
                key={row.key}
                className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3 sm:p-4"
              >
                <div className="flex items-center gap-2">
                  <p className="w-7 shrink-0 text-lg font-semibold italic text-zinc-500">
                    #{index + 1}
                  </p>
                  <div className="min-w-0 flex-1">
                    <label htmlFor={`exercise-${row.key}`} className="sr-only">
                      Exercise {index + 1} name
                    </label>
                    <input
                      id={`exercise-${row.key}`}
                      ref={index === rows.length - 1 ? lastRowNameRef : undefined}
                      value={row.name}
                      onChange={(e) => updateRow(row.key, "name", e.target.value)}
                      placeholder="Exercise, e.g. Bench press"
                      maxLength={80}
                      aria-invalid={!!errors.name}
                      className={cn(inputClassName, "h-11", {
                        "border-red-500/70": errors.name,
                      })}
                    />
                  </div>
                  <div className="flex shrink-0 items-center">
                    <button
                      type="button"
                      onClick={() => moveRow(index, -1)}
                      disabled={index === 0}
                      aria-label={`Move exercise ${index + 1} up`}
                      className={iconButtonClassName}
                    >
                      <ArrowUp size={16} aria-hidden className={iconClassName} />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveRow(index, 1)}
                      disabled={index === rows.length - 1}
                      aria-label={`Move exercise ${index + 1} down`}
                      className={iconButtonClassName}
                    >
                      <ArrowDown size={16} aria-hidden className={iconClassName} />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeRow(row.key)}
                      aria-label={`Remove exercise ${index + 1}`}
                      className={cn(iconButtonClassName, "hover:bg-red-500/10")}
                    >
                      <Trash2
                        size={16}
                        aria-hidden
                        className="stroke-zinc-400 group-hover:stroke-red-400 transition-colors"
                      />
                    </button>
                  </div>
                </div>
                {errors.name && <div className="pl-9">{fieldError(errors.name)}</div>}

                <div className="mt-3 grid grid-cols-2 gap-3 pl-9">
                  <div>
                    <label htmlFor={`sets-${row.key}`} className="mb-1 block text-xs text-zinc-400">
                      Sets
                    </label>
                    <input
                      id={`sets-${row.key}`}
                      type="number"
                      inputMode="numeric"
                      min={1}
                      max={MAX_SETS}
                      value={row.sets}
                      onChange={(e) => updateRow(row.key, "sets", e.target.value)}
                      aria-invalid={!!errors.sets}
                      className={cn(inputClassName, "h-11 tabular-nums", {
                        "border-red-500/70": errors.sets,
                      })}
                    />
                    {fieldError(errors.sets)}
                  </div>
                  <div>
                    <label htmlFor={`reps-${row.key}`} className="mb-1 block text-xs text-zinc-400">
                      Reps
                    </label>
                    <input
                      id={`reps-${row.key}`}
                      value={row.reps}
                      onChange={(e) => updateRow(row.key, "reps", e.target.value)}
                      placeholder="10, 8-12, 30s"
                      maxLength={20}
                      aria-invalid={!!errors.reps}
                      className={cn(inputClassName, "h-11", {
                        "border-red-500/70": errors.reps,
                      })}
                    />
                    {fieldError(errors.reps)}
                  </div>
                </div>
              </div>
            );
          })}

          {submitted && formError && <p className="text-sm text-primary">{formError}</p>}

          {rows.length < MAX_EXERCISES && (
            <button
              type="button"
              onClick={addRow}
              className={cn(
                "group flex h-12 items-center justify-center gap-2 rounded-xl border border-dashed border-zinc-700 text-sm font-semibold text-zinc-300 hover:border-emerald-500 hover:text-white transition-colors",
                focusRing
              )}
            >
              <Plus size={18} aria-hidden className="stroke-zinc-300 group-hover:stroke-white transition-colors" />
              Add exercise
            </button>
          )}
        </fieldset>

        {submitted && hasErrors && (
          <p role="alert" className="text-sm text-primary">
            Fix the highlighted fields to save.
          </p>
        )}

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          {isEditing ? (
            <button
              type="button"
              onClick={() => setConfirmDelete(true)}
              className={cn(
                "flex h-12 items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold text-red-400 hover:bg-red-500/10 transition-colors",
                focusRing
              )}
            >
              <Trash2 size={16} aria-hidden className="stroke-red-400" />
              Delete program
            </button>
          ) : (
            <span />
          )}
          <PrimaryButton
            type="submit"
            isLoading={saving}
            loadingText="Saving..."
            className="sm:w-auto sm:px-8"
          >
            {isEditing ? "Save changes" : "Create program"}
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
};

export default ProgramForm;
