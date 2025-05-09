import Input from "@/components/Input";
import { cn } from "@/lib/utils";
import { HTMLAttributes, InputHTMLAttributes, ReactNode } from "react";

interface EditModeProps extends InputHTMLAttributes<HTMLInputElement> {
  value?: HTMLInputElement["value"];
  mode: "edit";
  Button?: ReactNode;
}

interface ViewModeProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  mode: "view";
  Button?: never;
}

type LabelInputProps = { mode: "edit" | "view"; className?: string; labelTitle: ReactNode } & (
  | EditModeProps
  | ViewModeProps
);

const LabelInput = (props: LabelInputProps) => {
  const { labelTitle, mode, className, Button, ...rest } = props;

  return (
    <div className="flex justify-center w-[272px] md:w-[312px]">
      <div className="flex flex-col w-full gap-1">
        <label className="mx-2 caption-med-12 text-gray-03" htmlFor={props.id}>
          {labelTitle}
        </label>

        {mode === "edit" ? (
          <div className="flex flex-row-reverse gap-2">
            {Button}
            <Input className="bg-warm-gray-03" {...rest} id={props.id} />
          </div>
        ) : (
          <div
            className={cn(
              "px-4 py-2 text-gray-01 body-med-14 w-[272px] md:w-[312px] h-[41px]",
              className
            )}
            {...(rest as ViewModeProps)}
          >
            {props.value}
          </div>
        )}
      </div>
    </div>
  );
};

export default LabelInput;
