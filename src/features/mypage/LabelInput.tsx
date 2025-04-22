import Input from "@/components/Input";
import { HTMLAttributes, InputHTMLAttributes, ReactNode } from "react";

interface EditModeProps extends InputHTMLAttributes<HTMLInputElement> {
  labelTitle: ReactNode;
  value: HTMLInputElement["value"];
  mode: "edit";
  Button?: ReactNode;
}

interface ViewModeProps extends HTMLAttributes<HTMLDivElement> {
  labelTitle: ReactNode;
  value: string;
  mode: "view";
}

type LabelInputProps = EditModeProps | ViewModeProps;

const LabelInput = (props: LabelInputProps) => {
  const { labelTitle, mode } = props;

  return (
    <div className="flex justify-center w-[272px] md:w-[312px]">
      <div className="flex flex-col w-full gap-1">
        <label className="mx-2 caption-med-12 text-gray-03" htmlFor={props.value}>
          {labelTitle}
        </label>

        {mode === "edit" ? (
          <div className="flex flex-row-reverse gap-2">
            {props.Button}
            <Input {...(props as EditModeProps)} id={props.value} />
            {}
          </div>
        ) : (
          <div
            className="px-4 py-2 text-gray-01 body-med-14 w-[272px] md:w-[312px] h-[41px]"
            {...(props as ViewModeProps)}
          >
            {props.value}
          </div>
        )}
      </div>
    </div>
  );
};

export default LabelInput;
