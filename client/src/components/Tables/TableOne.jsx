const TableOne = ({ title = "Top Records", data = [], columns = [] }) => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        {title}
      </h4>

      <div className="flex flex-col">
        <div className={`grid grid-cols-6 rounded-sm bg-gray-2 dark:bg-meta-4`}>
          {columns.map((val) => (
            <div key={val.field} className="pl-2 xl:py-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                {val.header}
              </h5>
            </div>
          ))}
        </div>
        {data.map((value, ind) => (
          <div key={ind} className={`grid grid-cols-6 xl:py-5`}>
            {columns.map((val) => (
              <div key={val.field} className="flex items-center gap-3 pl-2">
                <p className="text-black dark:text-white ">
                  {value[val.field]}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableOne;
