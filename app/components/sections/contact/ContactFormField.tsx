import { FormFieldProps } from "@/types";

export const FormField = ({
  id,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  rows = undefined,
}: FormFieldProps) => {
  const Component = rows ? "textarea" : "input";

  return (
    <Component
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      required
      className="w-full px-4 py-3 text-theme-secondary-text font-semibold bg-white dark:bg-theme-secondary-bg border border-gray-300 dark:border-gray-600  focus:outline-none focus:ring-2 focus:ring-theme-accent"
      placeholder={placeholder}
      rows={rows}
    />
  );
};
