import CalendarPicker from "./CalendarPicker";
import { Personnel } from "@/src/types/personnel";

// Placeholder for once the authentication has been set up
// const user = await getServerSession(authOpt);
// const user = await AuthenticatorAssertionResponse;

async function getCurrentUser(id: number): Promise<Personnel> {
  const res = await fetch(`http://localhost:3001/personnel/${id}`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Failed to fetch personnel by id");
  }

  return res.json();
}

export default async function UserPage() {
  const user = await getCurrentUser(1);


// export default async function AdminPage(role: Role) {
//   const user = await getCurrentUser();

  const fullName = `${user.firstName} ${user.lastName}`;
  const heading =
    user.role === "admin"
      ? `Welcome, Admin ${fullName}`
      : `Welcome, Technician ${fullName}`;

  return (
    <div>
      <div>
        <ul className="flex space-x-4 p-4 bg-gray-200 rounded-lg">
          <li>
            <a href="/admin" className="text-blue-500 hover:underline">
              Admin Dashboard
            </a>
          </li>
        </ul>
      </div>
      <h1 className="text-3xl p-4">{heading}</h1>
        <div>
          <div className="w-full min-h-screen grid grid-cols-3 bg-gray-100 border-gray-600 rounded-2xl border-2">
            <div className="bg-red-100 col-span-1.75 rounded-2xl">
                <div className="p-4 grid grid-cols-2 grid-rows-2 gap-4 items-center">
                  <div className="text-2xl bg-blue-700 p-5 flex items-center justify-center">100</div>
                  <div className="text-2xl bg-yellow-400 p-5 flex items-center justify-center">200</div>
                  <div className="col-span-2 text-2xl bg-green-400 p-5 mt-7 flex items-center justify-center">04</div>
                </div>
              </div>
            <div className="bg-blue-100 flex items-center justify-center rounded-2xl">
              <CalendarPicker />x
            </div>
          </div>
        </div>
    </div>
  );
}

