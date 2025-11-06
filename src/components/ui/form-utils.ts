import * as React from "react";
import { FieldPath, FieldValues, useFormContext } from "react-hook-form";

export type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

export const FormFieldContext = React.createContext<FormFieldContextValue | null>(null);
export const FormItemContext = React.createContext<{ id: string } | null>(null);

export const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  // Avoid using `any` — cast through `unknown` to satisfy the linter and types.
  const name = fieldContext.name as unknown as FieldPath<FieldValues>;

  const fieldState = getFieldState(name, formState);

  // Always call the hook unconditionally to satisfy the Rules of Hooks.
  const generatedId = React.useId();
  const id = itemContext?.id ?? generatedId;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  } as const;
};
