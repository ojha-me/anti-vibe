const SideBar = () => {
    return (
        <div className="flex flex-col w-1/4 bg-gray-100 p-4">
        <h2 className="text-xl font-bold mb-4">Dashboard</h2>
        <ul className="space-y-2">
            <li>
            <a href="#" className="text-blue-500 hover:underline">
                Overview
            </a>
            </li>
            <li>
            <a href="#" className="text-blue-500 hover:underline">
                Settings
            </a>
            </li>
            <li>
            <a href="#" className="text-blue-500 hover:underline">
                Profile
            </a>
            </li>
        </ul>
        </div>
    );
}