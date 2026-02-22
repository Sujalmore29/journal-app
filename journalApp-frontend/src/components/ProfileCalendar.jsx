import dayjs from "dayjs";

const ProfileCalendar = ({entries}) => {
    const today = dayjs();
    const startOfMonth = today.startOf('month');
    const daysInMonth = today.daysInMonth();

    const activeDays = entries.map(e => dayjs(e.time || e.createdAt).format("YYYY-MM-DD"));
    const blanks = startOfMonth.day();
  return (
    <div className='bg-white rounded-2xl shadow-md p-4'>
        <div className='text-center font-semibold mb-3 text-indigo-700'>
            {today.format("MMMM YYYY")}
        </div>

        {/* WEEK DAYS */}
        <div className='grid grid-cols-7 text-xs text-center text-gray-500 mb-2'>
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
                <div key={d}>{d}</div>
            ))}
        </div>

        {/* DAYS */}
        <div className='grid grid-cols-7 gap-2 text-center'>

            {[...Array(blanks)].map((_,i) => (
                <div key={"b"+i}></div>
            ))}

            {[...Array(daysInMonth)].map((_,i) => {

                const day = startOfMonth.add(i,"day");
                const formatted = day.format("YYYY-MM-DD");

                const isActive = activeDays.includes(formatted);

                return (
                    <div
                    key={i}
                    className={`h-9 w-9 mx-auto flex items-center justify-center rounded-full text-sm ${isActive ? "bg-indigo-600 text-white" : "text-gray-600 hover:bg-gray-100"}`}>
                        {i + 1}
                        </div>
                );
            })}
        </div>
    </div>
  )
}

export default ProfileCalendar