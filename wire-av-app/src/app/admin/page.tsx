import CalendarPicker from "./CalendarPicker";

// Placeholder for once the authentication has been set up
// const user = await getServerSession(authOpt);
// const user = await AuthenticatorAssertionResponse;

async function getCurrentUser(): Promise<User> {
  return { name: "Jane", role: "admin" };
}

export default async function AdminPage(role: Role) {
  const user = await getCurrentUser();

  const heading =
    user.role === "admin"
      ? `Welcome, Admin ${user.name}`
      : `Welcome, Technician ${user.name}`;

  return (
    <div>
      <h1>{heading}</h1>
      <CalendarPicker />
    </div>
  );
}
