import { useUser } from "@clerk/clerk-react";

export default function UserProfile() {
  const { user } = useUser();
  if (!user) return null;
  return (
    <div
      style={{
        background: "#fff",
        padding: "1rem",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        marginBottom: "1.5rem",
        maxWidth: "350px"
      }}
      data-testid="user-profile"
    >
      <h3 style={{ marginBottom: "0.5rem" }}>Profile</h3>
      <div data-testid="user-fullname">
        <strong>Name:</strong> {user.fullName}
      </div>
      <div data-testid="user-username">
        <strong>Username:</strong> {user.username}
      </div>
      <div data-testid="user-email">
        <strong>Email:</strong> {user.emailAddresses[0]?.emailAddress}
      </div>
    </div>
  );
}