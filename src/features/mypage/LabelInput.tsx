import Input from "@/components/Input";
import { HTMLAttributes, InputHTMLAttributes, ReactNode } from "react";

interface EditModeProps extends InputHTMLAttributes<HTMLInputElement> {
  labelTitle: ReactNode;
  value: HTMLInputElement["value"];
  mode: "edit";
}

interface ViewModeProps extends HTMLAttributes<HTMLDivElement> {
  labelTitle: ReactNode;
  value: ReactNode;
  mode: "view";
}

type LabelInputProps = EditModeProps | ViewModeProps;

const LabelInput = (props: LabelInputProps) => {
  const { labelTitle, mode } = props;

  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-full gap-1">
        <label className="mx-2 caption-med-12 text-gray-03">{labelTitle}</label>

        {mode === "edit" ? (
          <Input {...(props as EditModeProps)} />
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
