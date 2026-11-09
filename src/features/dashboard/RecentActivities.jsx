export const RecentActivity = ({ activities }) => (
  <div className="flex flex-col w-full md:w-[30%] bg-white rounded-lg p-4 shadow">
    <h2 className="text-xl font-bold">Recent Activity</h2>
    <ul className="mt-2">
      {activities.map((activity, index) => (
        <li key={index} className="border-b py-2">
          {activity}
        </li>
      ))}
    </ul>
  </div>
);