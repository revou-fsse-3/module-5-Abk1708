import Link from "next/link";

const Navbar = () => {
    return (
        <nav className="bg-teal-700 bg-opacity-30" suppressHydrationWarning>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    {/* ... other code ... */}
                    <div className="hidden sm:ml-6 sm:block">
                        <div className="flex space-x-4">
                            <Link
                                passHref
                                href="/"
                                className="text-white hover:bg-gray-700 rounded-md px-3 py-2 text-sm font-medium"
                            >
                                {"Home"}
                            </Link>
                            <Link
                                passHref
                                href="/weather"
                                className="text-white hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                            >
                                {"Weather"}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
