import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Dropdown } from "primereact/dropdown";
import flatpickr from "flatpickr";
import { useEffect } from "react";

const Input = ({
  label = "",
  placeholder = "",
  name = "",
  type = "text",
  disabled = false,
  maxLimit,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="w-full">
      <label className="mb-2.5 block font-medium text-black dark:text-bodydark1">
        {label}
      </label>
      <div className="relative">
        <input
          disabled={disabled}
          type={type}
          max={maxLimit}
          placeholder={placeholder}
          className={`w-full ${
            disabled && "opacity-80 cursor-not-allowed"
          } rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-bodydark1 dark:focus:border-primary`}
          {...register(name)}
        />
      </div>
      <span className="text-red-400 font-medium">
        {errors?.[name]?.message}
      </span>
    </div>
  );
};

const Select = ({
  label = "",
  name = "",
  placeholder = "",
  options,
  isDisable = false,
  filter = true,
  getKey = "name",
  value = "id",
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="w-full">
      <label className="mb-2.5 block font-medium text-black dark:text-bodydark1">
        {label}
      </label>
      <div className="relative">
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Dropdown
              disabled={isDisable}
              optionLabel={getKey}
              optionValue={value}
              placeholder={placeholder}
              id={field.name}
              className="w-full rounded-lg border pl-2  border-stroke bg-transparent p-1 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-bodydark1 dark:focus:border-primary"
              filter={filter}
              filterPlaceholder="Search here.."
              value={field.value}
              onChange={(e) => field.onChange(e.value)}
              options={options}
              showClear
            />
          )}
        />
      </div>
      <span className="text-red-400 font-medium ">
        {errors?.[name]?.message}
      </span>
    </div>
  );
};

const DatePicker = ({
  label = "",
  name = "",
  placeholder = "mm/dd/yyyy",
  mode = "single",
  py = "4",
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    flatpickr(".form-datepicker", {
      mode: mode,
      static: true,
      monthSelectorType: "static",
      dateFormat: "M j, Y",
      prevArrow:
        '<svg className="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M5.4 10.8l1.4-1.4-4-4 4-4L5.4 0 0 5.4z" /></svg>',
      nextArrow:
        '<svg className="fill-current" width="7" height="11" viewBox="0 0 7 11"><path d="M1.4 10.8L0 9.4l4-4-4-4L1.4 0l5.4 5.4z" /></svg>',
    });
  }, []);

  return (
    <div className="w-full">
      <label
        className={`${
          label.length > 0 &&
          "mb-3 block font-medium text-black dark:text-white"
        }`}
      >
        {label}
      </label>
      <div className="relative">
        <input
          className={`form-datepicker w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-${py} font-normal outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
          placeholder={placeholder}
          data-class="flatpickr-right"
          {...register(name)}
        />
      </div>
      <span className="text-red-400 font-medium ">
        {errors?.[name]?.message}
      </span>
    </div>
  );
};

const TextArea = ({ label = "", name = "", placeholder = "" }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="w-full">
      <label className="mb-3 block font-medium text-black dark:text-white">
        {label}
      </label>
      <textarea
        placeholder={placeholder}
        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        {...register(name)}
      ></textarea>
      <span className="text-red-400 font-medium">
        {errors?.[name]?.message}
      </span>
    </div>
  );
};

export { Input, Select, DatePicker, TextArea };
