import { InputHTMLAttributes, ReactNode, useState } from "react";
import ArrowDownIcon from "../icons/ArrowDownIcon";

interface SelectorProps<T> extends InputHTMLAttributes<HTMLInputElement> {
  selectTitle: ReactNode;
  selectList: T[];
  dataTitle: (data: T) => ReactNode;
  dataValue: (data: T) => InputHTMLAttributes<HTMLInputElement>["value"];
}

const Selector = <T,>({
  selectTitle,
  selectList,
  dataTitle,
  dataValue,
  value,
  onChange,
  ...props
}: SelectorProps<T>) => {
  const [open, setOpen] = useState(false);

  const selectedData = selectList.find((item) => dataValue(item) === value);

  let classes =
    "flex items-center justify-between w-[272px] md:w-[312px] h-[41px] gap-1 px-4 border cursor-pointer rounded-t-xl border-gray-05 focus:outline-0 ";

  if (!open) {
    classes += "rounded-b-xl";
  }

  const handleToggle = () => {
    setOpen((pre) => !pre);
  };

  const handleSelect = (select: T) => {
    onChange?.({
      target: {
        value: dataValue(select)
      }
    } as React.ChangeEvent<HTMLInputElement>);
    setOpen(false);
  };

  return (
    <>
      <div className="relative">
        <button type="button" onClick={handleToggle} className={classes}>
          <p className="body-med-14 text-gray-01">
            {selectedData ? dataTitle(selectedData) : selectTitle}
          </p>
          <ArrowDownIcon className="text-gray-01" />
        </button>
        {open && (
          <ul className="w-[272px] md:w-[312px] h-[41px] absolute z-10 border border-t-0 shadow-sm border-gray-04 rounded-b-xl">
            {selectList.map((data, idx) => (
              <li key={idx}>
                <button
                  onClick={() => handleSelect(data)}
                  className="w-[272px] md:w-[312px] h-[41px] px-4 text-left bg-white body-med-14 text-gray-01 border-x border-gray-05"
                >
                  {dataTitle(data)}
                </button>
                {selectList.length - 1 !== idx && <hr />}
              </li>
            ))}
          </ul>
        )}
      </div>
      <input className="hidden" value={value ?? ""} readOnly {...props} />
    </>
  );
};

export default Selector;
